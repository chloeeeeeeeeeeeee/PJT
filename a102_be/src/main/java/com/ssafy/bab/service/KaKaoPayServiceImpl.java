package com.ssafy.bab.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.ssafy.bab.dao.ContributionDao;
import com.ssafy.bab.dto.KakaoPayApproval;
import com.ssafy.bab.dto.KakaoPayReady;
import com.ssafy.bab.dto.PaymentInfo;

import lombok.extern.java.Log;

@Service
@Log
public class KaKaoPayServiceImpl implements KakaoPayService {
	
	@Value("${Kakao.APP_ADMIN_KEY}")
	private String APP_ADMIN_KEY;
	
	@Value("${Kakao.RETURN_URL")
	private String RETURN_URL;
	
	@Autowired
	ContributionDao contributionDao;
	
	private final String HOST = "https://kapi.kakao.com";
	private KakaoPayReady kakaoPayReady = new KakaoPayReady();
	private KakaoPayApproval kakaoPayApproval = new KakaoPayApproval();
	private RestTemplate restTemplate = new RestTemplate();

	
	
	@Override
	public HttpHeaders headers() {
		HttpHeaders headers = new HttpHeaders(); 
		headers.add("Authorization", "KakaoAK " + APP_ADMIN_KEY); 
		headers.add("Accept", "application/x-www-form-urlencoded;charset=utf-8"); 
		headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";"+ "charset=UTF-8"); 
		return headers;
	}

	@Override
	public String kakaoPayReady(PaymentInfo paymentInfo) {
		
		// 주문번호 = yyyyMMdd-ContributionId
		java.util.Date now = new java.util.Date();
		SimpleDateFormat vans = new SimpleDateFormat("yyyyMMdd");
		String wdate = vans.format(now);
		kakaoPayReady.setPartner_order_id(wdate + "-" + contributionDao.getPartnerOrderId());
		
		// 상품명 설정
		String item_name = paymentInfo.getItemList().get(0).getItemName();
		if(paymentInfo.getItemList().size() > 1) {
			item_name += " 외 " + (paymentInfo.getTotalCount() - 1);
		}

		// 유저번호 설정
		kakaoPayReady.setPartner_user_id(Integer.toString(paymentInfo.getUserSeq()));
		
		// 서버로 요청할 Body 
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>(); 
		params.add("cid", paymentInfo.getCid());											// 사업장 고유번호 (테스트)
		params.add("partner_order_id", wdate + "-" + contributionDao.getPartnerOrderId());	// 주문번호 
		params.add("partner_user_id", Integer.toString(paymentInfo.getUserSeq()));			// 유저번호 ( 비회원 후원일 경우는 -1 )
		params.add("item_name", item_name); 												// 상품명
		params.add("quantity", Integer.toString(paymentInfo.getTotalCount())); 				// 상품 총 개수
		params.add("total_amount", Integer.toString(paymentInfo.getTotalAmount())); 		// 상품 총 금액
		params.add("tax_free_amount", "0"); 												// 상품 비과세 금액
		params.add("approval_url", RETURN_URL + "/payment/support/kakaopaySucess"); 		// 성공
		params.add("cancel_url", RETURN_URL + "/payment/support/kakaopayCancel"); 			// 취소
		params.add("fail_url", RETURN_URL + "/payment/support/kakaopayFail"); 				// 실패
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers()); 
		try { 
			kakaoPayReady = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReady.class);
			kakaoPayReady.setPaymentInfo(paymentInfo);
			log.info("" + kakaoPayReady); 
			//성공시 
			return kakaoPayReady.getNext_redirect_pc_url(); 
		} catch (RestClientException | URISyntaxException e) { 
			e.printStackTrace(); 
		} 

		//실패시
		return null;
	}

	@Override
	public KakaoPayApproval kakaoPayInfo(String pg_token) {
		 // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", kakaoPayReady.getPaymentInfo().getCid());
        params.add("tid", kakaoPayReady.getTid());
        params.add("partner_order_id", kakaoPayReady.getPartner_order_id());
        params.add("partner_user_id", kakaoPayReady.getPartner_user_id());
        params.add("pg_token", pg_token);
        params.add("total_amount", Integer.toString(kakaoPayReady.getPaymentInfo().getTotalAmount()));
		
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers());
        
        try {
            kakaoPayApproval = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApproval.class);
            log.info("" + kakaoPayApproval);
          
            return kakaoPayApproval;
        
            
        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return null;
	}



}

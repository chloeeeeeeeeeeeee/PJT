package com.ssafy.bab.service;

import org.springframework.http.HttpHeaders;

import com.ssafy.bab.dto.KakaoPayApproval;
import com.ssafy.bab.dto.PaymentInfo;

public interface KakaoPayService {

	public HttpHeaders headers();
	public String kakaoPayReady(PaymentInfo itemsInfo);
	public KakaoPayApproval kakaoPayInfo(String pg_token);
	
}

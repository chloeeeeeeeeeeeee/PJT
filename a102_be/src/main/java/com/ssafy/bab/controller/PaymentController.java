package com.ssafy.bab.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dto.IPaymentInfo;
import com.ssafy.bab.dto.KPaymentInfo;
import com.ssafy.bab.dto.KakaoPaySuccessData;
import com.ssafy.bab.dto.NPaymentInfo;
import com.ssafy.bab.service.JwtService;
import com.ssafy.bab.service.KakaoPayService;
import com.ssafy.bab.service.PaymentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api("PaymentController V1")
@RestController
@RequestMapping("/payment")
public class PaymentController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private KakaoPayService kakaoPayService;
	
	@Autowired
	private PaymentService paymentService;
	
	@Autowired
	private JwtService jwtService;
	
	
	@ApiOperation(value = "카카오페이 결제", notes = "결제할 품목들을 받아와 카카오페이 결제 모듈로 연결해준다", response = String.class)
	@PostMapping("/kakaopay")
	public String kakaoPay(@ApiParam(value = "아이템 목록과 총 개수, 총 가격", required = true) @RequestBody KPaymentInfo paymentInfo, HttpServletRequest req) throws Exception {
		logger.info("kakaoPay_payment - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        // 테스트
//        paymentInfo.setUserSeq(74);
        // 프론트
        paymentInfo.setUserSeq(userSeq);
        paymentInfo.setCid("TC0ONETIME");
        
        return kakaoPayService.kakaoPayReady(paymentInfo);
	}
	
	@GetMapping("/kakaopaySuccess")
	public KakaoPaySuccessData kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
		logger.info("kakaoPaySuccess get............................................");
		logger.info("kakaoPaySuccess pg_token : " + pg_token);
        
        return kakaoPayService.kakaoPayInfo(pg_token);
        
    }
	
	@ApiOperation(value = "네이버페이 결제 처리결과 저장", notes = "결제 내역을 받아와 DB에 저장", response = List.class)
	@PostMapping("/naverpay")
	public ResponseEntity<String> naverPay(@ApiParam(value = "아이템 목록과 총 개수, 처리 결과", required = true) @RequestBody NPaymentInfo paymentInfo, HttpServletRequest req) throws Exception {
		logger.info("naverPay_payment - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        // 테스트
//        paymentInfo.setUserSeq(74);
        // 프론트
        paymentInfo.setUserSeq(userSeq);
        
        return new ResponseEntity<String>(paymentService.checkNaverPayTransaction(paymentInfo), HttpStatus.OK);
    	
	}
	
	@ApiOperation(value = "아임포트 결제 처리결과 저장", notes = "결제 내역을 받아와 DB에 저장", response = List.class)
	@PostMapping("/iamport")
	public ResponseEntity<String> iamport(@ApiParam(value = "아이템 목록과 총 개수, 처리 결과", required = true) @RequestBody IPaymentInfo paymentInfo, HttpServletRequest req) throws Exception {
		logger.info("iamport_payment - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        // 테스트
//        paymentInfo.setUserSeq(74);
        // 프론트
        paymentInfo.setUserSeq(userSeq);
        
        return new ResponseEntity<String>(paymentService.checkIamPortTransaction(paymentInfo), HttpStatus.OK);
    	
	}
	
	
//	@GetMapping("/kakaopayFail")
//	public String kakaoPayFail() {
//		logger.info("kakaoPayFail_payment - 호출");
//		return "fail.html";
//	}
//	
//	@GetMapping("/kakaopayCancel")
//	public String kakaoPayCancel() {
//		logger.info("kakaoPayCancel_payment - 호출");
//		return "cancel.html";
//	}
	
	
	
}
	
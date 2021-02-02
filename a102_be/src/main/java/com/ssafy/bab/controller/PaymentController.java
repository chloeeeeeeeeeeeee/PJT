package com.ssafy.bab.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dto.KakaoPayApproval;
import com.ssafy.bab.dto.PaymentInfo;
import com.ssafy.bab.service.JwtService;
import com.ssafy.bab.service.KakaoPayService;

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
	private JwtService jwtService;
	
	@ApiOperation(value = "카카오페이 결제(후원)", notes = "결제할 품목들을 받아와 카카오페이 결제 모듈로 연결해준다", response = List.class)
	@PostMapping("/support/kakaopay")
	public String kakaoPaySupport(@ApiParam(value = "아이템 목록과 총 개수, 총 가격", required = true) @RequestBody PaymentInfo paymentInfo, HttpServletRequest req) throws Exception {
		logger.info("kakaoPaySupport_payment - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        // 비회원 결제
        paymentInfo.setUserSeq(userSeq);
		
		return "redirect:" + kakaoPayService.kakaoPayReady(paymentInfo);
	}
	
	@GetMapping("/support/kakaopaySucess")
	public KakaoPayApproval kakaoPaySuccess(@RequestParam("pg_token") String pg_token) {
		logger.info("kakaoPaySuccess get............................................");
		logger.info("kakaoPaySuccess pg_token : " + pg_token);
        
        return kakaoPayService.kakaoPayInfo(pg_token);
        
    }
	
	@GetMapping("/support/kakaopayFail")
	public String kakaoPayFail() {
		logger.info("kakaoPayFail_payment - 호출");
		return "fail.html";
	}
	
	@GetMapping("/support/kakaopayCancel")
	public String kakaoPayCancel() {
		logger.info("kakaoPayCancel_payment - 호출");
		return "cancel.html";
	}
	
	
	
}
	
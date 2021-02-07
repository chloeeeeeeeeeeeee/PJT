package com.ssafy.bab.service;

import java.text.ParseException;

import com.ssafy.bab.dto.IPaymentInfo;
import com.ssafy.bab.dto.NPaymentInfo;

public interface PaymentService {
	public String checkNaverPayTransaction(NPaymentInfo paymentInfo) throws ParseException;
	public String checkIamPortTransaction(IPaymentInfo paymentInfo);
}

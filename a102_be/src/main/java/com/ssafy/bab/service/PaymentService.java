package com.ssafy.bab.service;

import java.text.ParseException;

import com.ssafy.bab.dto.CPaymentInfo;
import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.GPaymentInfo;
import com.ssafy.bab.dto.IPaymentInfo;
import com.ssafy.bab.dto.NPaymentInfo;

public interface PaymentService {
	public String checkNaverPayTransaction(NPaymentInfo paymentInfo) throws ParseException;
	public String checkIamPortTransaction(IPaymentInfo paymentInfo);
	public String checkCreditCardTransaction(CPaymentInfo paymentInfo) throws ParseException;
	public String checkGDreamTransaction(GPaymentInfo paymentInfo) throws ParseException;
	public void sendMsg(Contribution contribution, String itemName, String storeName);
}

package com.ssafy.bab.dto;

import java.util.List;

import lombok.Data;

@Data
public class KPaymentInfo {
	
	private String cid = "TC0ONETIME";
	private int userSeq;
	private List<PaymentItem> itemList;
	private int totalCount;
	private int totalAmount;
	private int isUser;	
	private int isKiosk;
	
	private Contributor contributor;
}

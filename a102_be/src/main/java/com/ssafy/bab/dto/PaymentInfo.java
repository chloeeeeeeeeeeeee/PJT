package com.ssafy.bab.dto;

import java.util.List;

import lombok.Data;

@Data
public class PaymentInfo {
	
	private String cid = "TC0ONETIME";
	private int userSeq;
	private List<SupportItem> itemList;
	private int totalCount;
	private int totalAmount;
	
}

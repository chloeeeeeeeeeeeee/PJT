package com.ssafy.bab.dto;

import java.util.List;

import lombok.Data;

@Data
public class PaymentInfo {
	
	private String cid = "TC0ONETIME";
	private int userSeq;
	private List<PaymentItem> itemList;
	private int totalCount;
	private int totalAmount;
	private int anonymous;
	
	private String contributorName;
	private String contributorGender;
	private String contributorBirth;
	private String contributorPhone;
	private String regNum;
}

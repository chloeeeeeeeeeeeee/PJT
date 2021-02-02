package com.ssafy.bab.dto;

import lombok.Data;

@Data
public class PaymentItem {

	private int storeId;
	private int itemId;
	private String itemName;
	private int itemCount;
	
}

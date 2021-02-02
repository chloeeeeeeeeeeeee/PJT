package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Embeddable;

public class ItemId implements Serializable{

	private Store store;	// Item.store 매핑
	private int itemId;		// Item.itemId 매핑
	
	
}

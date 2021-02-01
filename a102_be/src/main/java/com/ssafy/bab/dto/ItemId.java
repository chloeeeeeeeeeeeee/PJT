package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class ItemId implements Serializable{

	private String store;	// Item.store 매핑
	private int itemId;		// Item.itemId 매핑
	
	
}

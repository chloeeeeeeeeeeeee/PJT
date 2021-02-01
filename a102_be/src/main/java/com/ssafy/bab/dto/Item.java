package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@IdClass(ItemId.class)
public class Item implements Serializable{
	@Id
	@OneToOne
	@JoinColumn(name="store_id")
	private Store store;
	
	@Id
	private int itemId;
	
	private String itemName;
	private int itemPrice;
	private int itemAvailable;
	private int itemTotal;
	private String ItemImgUrl;
}

package com.ssafy.bab.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
@IdClass(OrdersPK.class)
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JoinColumn(name="order_id")
	private int orderId;
	
//	@Id
//	@ManyToOne
//	@JoinColumns({
//		@JoinColumn(name="store_id", referencedColumnName = "store_id"),
//		@JoinColumn(name="item_id", referencedColumnName = "item_id")
//	})
//	private Item item;
	
	@Id
	private int itemId;
	
	@Id
	private int storeId;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date orderDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date orderDone;
	
	private int orderCount;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="payment_id")
	private Payment payment;
}

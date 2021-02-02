package com.ssafy.bab.dto;

import java.util.Date;

import javax.persistence.Entity;
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
@IdClass(OrderId.class)
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int orderId;
	
	@Id
	@ManyToOne
	@JoinColumns({
		@JoinColumn(name="store_id", referencedColumnName = "store_id"),
		@JoinColumn(name="item_id", referencedColumnName = "item_id")
	})
	private Item item;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date orderDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date orderDone;
	
	private int orderCount;
	
}

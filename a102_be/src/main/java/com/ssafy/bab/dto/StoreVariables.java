package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class StoreVariables implements Serializable{
	@Id
	private int storeId;
	private int storeItemAvailable;
	private int storeItemTotal;
	private int storeTotalContributionAmount;
	
	//단방향 매핑
	@OneToOne
	@JoinColumn(name = "store_id")
	private Store store;
}

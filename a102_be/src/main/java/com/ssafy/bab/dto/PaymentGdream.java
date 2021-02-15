package com.ssafy.bab.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
public class PaymentGdream {
	@Id
	private String paymentGdreamId;
	
	private int paymentGdreamAmount;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date paymentGdreamDate;
	
	private String paymentGdreamApproval;
	private Integer paymentGdreamStoreId;
}

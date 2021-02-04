package com.ssafy.bab.dto;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Payment {
	@Id
	private String paymentId;
	private String kakaopay_tid;
	private String kakaopay_cid;
}

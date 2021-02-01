package com.ssafy.bab.dto;


import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class User implements Serializable{
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) //AUTO는 default로, IDENTITY는 Auto-increment
	private int userSeq;
	
	private String userId;	
	private String userName;
	private String userPwd;
	private String userEmail;
	private String userPhone;
	
	private int userTotalContributionAmount = 0;
	
	@ManyToOne
	@JoinColumn(name="store_id", nullable = true)
	private Store store;
	

}

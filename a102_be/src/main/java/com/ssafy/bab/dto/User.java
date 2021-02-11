package com.ssafy.bab.dto;


import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.ColumnDefault;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class User implements Serializable{
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) //AUTO는 default로, IDENTITY는 Auto-increment
	private Integer userSeq;
	
	private String userId;	
	private String userName;
	private String userPwd;
	private String userEmail;
	
	@JoinColumn(name="user_phone", nullable = true)
	private String userPhone;
	
	private LocalDateTime userDate = LocalDateTime.now();
	
	@PrePersist
    public void createdAt() {
		this.userDate = LocalDateTime.now();
    }
	
	private int userTotalContributionAmount = 0;

	@ManyToOne
	@JoinColumn(name="store_id", nullable = true)
	private Store store;
	
	
}

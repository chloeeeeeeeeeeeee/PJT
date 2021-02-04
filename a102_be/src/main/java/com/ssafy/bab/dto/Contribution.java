package com.ssafy.bab.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
@IdClass(ContributionPK.class)
@Table(name = "contribution")
public class Contribution implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JoinColumn(name="contribution_id")
	private int contributionId;
	
	@Id
//	@Column(name = "store_id")
	private int storeId;
	
	@Id
//	@Column(name = "item_id")
	private int itemId;
	
//	@ManyToOne
//	@JoinColumns({
//		@JoinColumn(name="store_id", referencedColumnName = "store_id", insertable = false, updatable = false),
//		@JoinColumn(name="item_id", referencedColumnName = "item_id", insertable = false, updatable = false)
//	})
//	private Item item;
	
	@ManyToOne
	@JoinColumn(name="user_seq")
	private User user;
	
	@JoinColumn(name="contribution_message", nullable = true)
	private String contributionMessage;
	
	@JoinColumn(name="contribution_answer", nullable = true)
	private String contributionAnswer;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date contributionDate;
	
	@JoinColumn(name="contribution_date_used", nullable = true)
	@Temporal(TemporalType.TIMESTAMP)
	private Date contributionDateUsed;
	
	private int contributionUse;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="payment_id")
	private Payment payment;
	
}

package com.ssafy.bab.dto;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@IdClass(ContributionId.class)
public class Contribution implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int contributionId;
	
	@Id
	@ManyToOne
	@JoinColumns({
		@JoinColumn(name="store_id", referencedColumnName = "store_id"),
		@JoinColumn(name="item_id", referencedColumnName = "item_id")
	})
	private Item item;
	
	@ManyToOne
	@JoinColumn(name="user_seq")
	private User user;
	
	@JoinColumn(name="contribution_message", nullable = true)
	private String contributionMessage;
	
	@JoinColumn(name="contribution_answer", nullable = true)
	private String contributionAnswer;
	
	private Timestamp contributionDate;
	
	@JoinColumn(name="contribution_date_used", nullable = true)
	private Timestamp contributionDateUsed;
	
	private int contributionUse;
	
}

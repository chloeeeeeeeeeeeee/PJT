package com.ssafy.bab.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Data
@Entity
public class Qna {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int qnaSeq;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_seq")
	private User user;

	@OneToOne 
	@JoinColumn(name = "reply_seq", nullable = true)
	private QnaReply qnaReply;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date qnaDate;
	
	private String qnaTitle;
	private String qnaContent;
	private String qnaPwd;
	
}

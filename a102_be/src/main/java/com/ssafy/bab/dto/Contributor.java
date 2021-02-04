package com.ssafy.bab.dto;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Contributor implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int contributorSeq;
	private String contributorName;
	private String contributorGender;
	private String contributorBirth;
	private String contributorPhone;
}

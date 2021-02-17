package com.ssafy.bab.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.bab.dto.CardRfid;

public interface CardRfidDao extends JpaRepository<CardRfid, Integer> {
	String findByCardNumber(String cardNumber);
}

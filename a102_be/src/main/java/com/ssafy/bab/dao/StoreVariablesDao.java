package com.ssafy.bab.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.bab.dto.StoreVariables;

public interface StoreVariablesDao extends JpaRepository<StoreVariables, Integer> {
	
	StoreVariables findByStoreId(int storeId);
	
	List<StoreVariables> findAllByOrderByStoreTotalContributionAmountDesc();
}

package com.ssafy.bab.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.User;

@Repository
public interface UserRankDao extends JpaRepository<User, Integer> {
	List<User> findByUserTotalContributionAmountGreaterThanOrderByUserTotalContributionAmountDesc(int userTotalContributionAmount);
}

package com.ssafy.bab.dao;

import org.springframework.data.repository.CrudRepository;

import com.ssafy.bab.dto.User;

public interface UserDao extends CrudRepository<User, Integer> {
	User findByUserId(String userId);
	
	User findByUserSeq(int userSeq);
}

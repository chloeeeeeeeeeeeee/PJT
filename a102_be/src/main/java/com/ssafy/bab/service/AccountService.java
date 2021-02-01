package com.ssafy.bab.service;

import com.ssafy.bab.dto.User;


public interface AccountService {
	
	public User signUp(User user) ;
	
	public User signIn(String userId, String userPwd);
	
	public User userInfo(int userSeq);
	
}

package com.ssafy.bab.service;

import java.util.ArrayList;

import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.User;


public interface AccountService {
	
	public User signUp(User user) ;
	
	public User signIn(String userId, String userPwd);
	
	public User userInfo(int userSeq);
	
	public int userWithUs(int userSeq);
	
	public User userInfoById(String userId);
	
	
	//프로필
	public ArrayList<Contribution> userContribution(int userSeq);
	
	public int userContributionCount(int userSeq);
	
}

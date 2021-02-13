package com.ssafy.bab.service;

import java.net.URI;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.ssafy.bab.dao.ContributionDao;
import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.NaverProfile;
import com.ssafy.bab.dto.User;

@Service
public class AccountServiceImpl implements AccountService{

	@Autowired
	UserDao userDao;
	
	@Autowired
	PasswordEncodingService passwordEncoding;
	
	@Autowired
	ContributionDao contributionDao;
	
	public User signUp(User user) {
		
		if(userDao.findByUserId(user.getUserId()) != null)
			return null;
//		if(userDao.findByUserEmail(user.getUserEmail()) != null)
//			return null;
//		if(userDao.findByUserPhone(user.getUserPhone()) != null)
//			return null;
			
		User userResult = user;
		userResult.setUserPwd(passwordEncoding.encode(user.getUserPwd()));
		userDao.save(userResult);
		//userResult.setUserPwd(null);
		return userResult;
	}

	@Override
	public User signIn(String userId, String userPwd) {
		User userTarget = userDao.findByUserId(userId);
		if(passwordEncoding.matches(userPwd,userTarget.getUserPwd())==true) {
			System.out.println("true");
			return userTarget;
		}
		System.out.println("false");
		return null;
	}

	@Override
	public User userInfo(int userSeq) {
		User loginUser = userDao.findByUserSeq(userSeq);
		loginUser.setUserPwd(null);
		return loginUser;
	}

	@Override
	public int userWithUs(int userSeq) {
		User userResult = userDao.findByUserSeq(userSeq);
		LocalDateTime userDate = userResult.getUserDate().toLocalDate().atStartOfDay();
		LocalDateTime nowDate = LocalDate.now().atStartOfDay();

		return (int)Duration.between(userDate, nowDate).toDays();
	}

	@Override
	public ArrayList<Contribution> userContribution(int userSeq) {
		ArrayList<Contribution> userContribution = contributionDao.findByUser_UserSeqOrderByContributionDateDesc(userSeq);
		return userContribution;
	}

	@Override
	public int userContributionCount(int userSeq) {
		Integer userContributionCount = contributionDao.findCountByUserSeq(userSeq);
		if(userContributionCount == null)
			return 0;
		return userContributionCount;
	}

	@Override
	public User userInfoById(String userId) {
		User userInfoById = userDao.findByUserId(userId);
		return userInfoById;
	}

	@Override
	public User signInNaver(String Authorization) {
		
		HttpHeaders headers = new HttpHeaders(); 
		headers.add("Authorization", "Bearer " + Authorization);
		headers.add("Accept", "application/x-www-form-urlencoded"); 
		headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";"+ "charset=UTF-8"); 
		
		RestTemplate restTemplate = new RestTemplate();
		
		HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(null, headers); 
		
		try {
			ResponseEntity<NaverProfile> profile = restTemplate.exchange(new URI("https://openapi.naver.com/v1/nid/me"), HttpMethod.GET, body, NaverProfile.class);
			
			User user = new User();
			
			user.setUserId("naver@"+profile.getBody().getResponse().getId());
			user.setUserName(profile.getBody().getResponse().getNickname());
			user.setUserPwd(profile.getBody().getResponse().getId());
			user.setUserEmail(profile.getBody().getResponse().getEmail());
			user.setUserPhone("temp");
			
			return user;
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public String userPwdChk(User user, String pwd) {
		
		if(passwordEncoding.matches(pwd,user.getUserPwd())) {
			return "SUCCESS";
		}
		
		return "FAIL";
	}


	
	
}

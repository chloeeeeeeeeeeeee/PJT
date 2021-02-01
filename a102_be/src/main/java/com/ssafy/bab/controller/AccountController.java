package com.ssafy.bab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dto.User;
import com.ssafy.bab.service.AccountService;
import com.ssafy.bab.service.AuthService;
import com.ssafy.bab.service.JwtService;

@RestController
@RequestMapping("/account")
public class AccountController {
	
	@Autowired
	private AccountService userService;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private JwtService jwtService;
	
	@GetMapping("/")
	public String mainPage() {	
		return "index.html";
	}

	@PostMapping("/signup")
	public User signUp(User user) {
		User userResult = userService.signUp(user);
		return userResult;
	}
	//로그인(임시)
	@GetMapping("/signin")
	public User signUp(String userId, String userPwd) {
		User userResult = userService.signIn(userId, userPwd);
		return userResult;
	}
	//로그인jwt
	@GetMapping("/signinjwt")
	public ResponseEntity<JwtService.TokenRes> signInJwt(String userId, String userPwd){
		ResponseEntity<JwtService.TokenRes> signInJwt = authService.signIn(userId, userPwd);
		return signInJwt;
	}
	//jwt를 받아와서 유저번호를 돌려준다
	@GetMapping("/signinjwt/{jwt}")
	public ResponseEntity<Integer> getUserSeq(@PathVariable String jwt){
		int userSeq = jwtService.decode(jwt);
		if(userSeq == -1) {
			return new ResponseEntity<Integer>(userSeq, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Integer>(userSeq, HttpStatus.OK);
	}
	//유저번호를 받아와서 유저정보를 돌려준다
	@GetMapping("/userInfo/{userSeq}")
	public ResponseEntity<User> userInfo(@PathVariable int userSeq){
		User userInfo = userService.userInfo(userSeq);
		return new ResponseEntity<User>(userInfo, HttpStatus.OK);
	}
}

package com.ssafy.bab.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.dto.UserContribution;
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
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	
	@GetMapping("/")
	public String mainPage() {	
		return "index.html";
	}

	//회원가입
	@PostMapping("/signup")
	public ResponseEntity<User> signUp(@RequestBody User user) {
		User userResult = userService.signUp(user);
		if(userResult == null)
			return new ResponseEntity<User>(userResult, HttpStatus.BAD_REQUEST);
		return new ResponseEntity<User>(userResult, HttpStatus.OK);
	}
	
//	//회원가입카카오
//	@PostMapping("/signupkakao")
//	public ResponseEntity<JwtService.TokenRes> signUpKakao(@RequestBody User user) {
//		String pwd = user.getUserId();
//		user.setUserPwd(user.getUserId());
//		user.setUserId("Kakao@"+user.getUserId());
//		user.setUserName("Guest");
//		user.setUserEmail(user.getUserId());
//		user.setUserPhone(user.getUserId());
//		
//		User userResult = userService.signUp(user);
//		if(userResult != null) {
//			User userKakao = userService.userInfoById(user.getUserId());
//			if (userKakao != null) {
//				JwtService.TokenRes signInJwt = authService.signIn(user.getUserId(), pwd);
//
//				if(signInJwt == null) {
//					return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
//				}
//				return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
//			}
//			else {
//				JwtService.TokenRes signInJwt = null;
//				return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
//			}
//		}
//		JwtService.TokenRes signInJwt = null;
//		return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
//	}
	

	//로그인(임시)
	@PostMapping("/signin")
	public ResponseEntity<User> signIn(@RequestBody User user) {
		
		User userResult = userService.signIn(user.getUserId(), user.getUserPwd());
		if(userResult == null) {
			return new ResponseEntity<User>(userResult,HttpStatus.BAD_REQUEST);
		}
		userResult.setUserPwd(null);
		return new ResponseEntity<User>(userResult,HttpStatus.OK);
	}
	
	//로그인jwt
	@PostMapping("/signinjwt")
	public ResponseEntity<JwtService.TokenRes> signInJwt(@RequestBody User user, HttpServletResponse res){
		JwtService.TokenRes signInJwt = authService.signIn(user.getUserId(), user.getUserPwd());
		if(signInJwt == null) {
			return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
		}
		res.setHeader("token", signInJwt.getToken());
		return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
	}
	
	//로그인카카오
	@PostMapping("/signinkakao")
	public ResponseEntity<JwtService.TokenRes> signInKakao(@RequestBody User user, HttpServletResponse res){
		String userId = user.getUserId();
		user.setUserPwd(user.getUserId());
		User userKakao = userService.userInfoById("Kakao@"+userId);
		
		if (userKakao != null) {
			JwtService.TokenRes signInJwt = authService.signIn("Kakao@"+userId, user.getUserPwd());

			if(signInJwt == null) {
				signInJwt = new JwtService.TokenRes();
				return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.OK);
			}
			res.setHeader("token", signInJwt.getToken());
			return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
		}
		else {
			String pwd = userId;
			user.setUserPwd(userId);
			user.setUserId("Kakao@"+userId);
			user.setUserName("Guest");
			user.setUserEmail("Kakao@"+userId);
			user.setUserPhone("GuestPhoneNumber");
			
			User userResult = userService.signUp(user);
			if(userResult != null) {
				userKakao = userService.userInfoById(user.getUserId());
				if (userKakao != null) {
					JwtService.TokenRes signInJwt = authService.signIn(user.getUserId(), pwd);

					if(signInJwt == null) {
						return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
					}
					return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
				}
				else {
					JwtService.TokenRes signInJwt = null;
					return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
				}
			}
			JwtService.TokenRes signInJwt = null;
			
			return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/signinnaver")
	public ResponseEntity<JwtService.TokenRes> signInNaver(@RequestBody User user, HttpServletResponse res){
		String userId = user.getUserId();
		String userPwd = user.getUserPwd();
		String userName = user.getUserName();
		String userPhone = user.getUserPhone();
		String userEmail = user.getUserEmail();
		
		User userNaver = userService.userInfoById(userId);
		
		if(userNaver != null) {
			JwtService.TokenRes signInJwt = authService.signIn(userId, userPwd);

			if(signInJwt == null) {
				signInJwt = new JwtService.TokenRes();
				return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.OK);
			}
			res.setHeader("token", signInJwt.getToken());
			return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
		}
		else {
			User userResult = userService.signUp(user);
			if(userResult != null) {
				userNaver = userService.userInfoById(user.getUserId());
				if (userNaver != null) {
					JwtService.TokenRes signInJwt = authService.signIn(userId, userPwd);

					if(signInJwt == null) {
						return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
					}
					return new ResponseEntity<JwtService.TokenRes>(signInJwt,HttpStatus.OK);
				}
				else {
					JwtService.TokenRes signInJwt = null;
					return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
				}
			}
			JwtService.TokenRes signInJwt = null;
			return new ResponseEntity<JwtService.TokenRes>(signInJwt, HttpStatus.BAD_REQUEST);
		}
	}
	
	//중복확인
	@PostMapping("/userdupli")
	public ResponseEntity<User> userDupli(@RequestBody User user, HttpServletRequest req){
		User userNow = userService.userInfoById(user.getUserId());
		
		if(userNow == null) {
			return new ResponseEntity<User>(userNow, HttpStatus.OK);
		}
		else {
			userNow.setUserPwd(null);
			return new ResponseEntity<User>(userNow, HttpStatus.BAD_REQUEST);
		}
	}
	
	//jwt를 받아와서 유저번호를 돌려준다
	@GetMapping("/userseq")
	public ResponseEntity<Integer> getUserSeq(HttpServletRequest req){
		String jwt = req.getHeader("token");
		int userSeq = jwtService.decode(jwt);
		if(userSeq == -1) {
			return new ResponseEntity<Integer>(userSeq, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Integer>(userSeq, HttpStatus.OK);
	}
	
	//jwt를 받아와서 유저정보를 돌려준다
	@GetMapping("/userinfo")
	public ResponseEntity<User> getUserInfo(HttpServletRequest req){
		String jwt = req.getHeader("token");
		int userSeq = jwtService.decode(jwt);
		User userInfo = userService.userInfo(userSeq);
		return new ResponseEntity<User>(userInfo, HttpStatus.OK);
	}
	
	//jwt를 받아와서 후원금액, 후원횟수, 함께한 일수를 돌려준다
	@GetMapping("/userwithus")
	public ResponseEntity<UserContribution> userWithUs(HttpServletRequest req){
		String jwt = req.getHeader("token");
		UserContribution userWithUs = new UserContribution();
		int userSeq = jwtService.decode(jwt);
		
		userWithUs.setUserWithUs(userService.userWithUs(userSeq));
		userWithUs.setContributionTotal(userService.userInfo(userSeq).getUserTotalContributionAmount());
		userWithUs.setContributionCount(userService.userContributionCount(userSeq));
		
		return new ResponseEntity<UserContribution>(userWithUs, HttpStatus.OK);
	}
	
	//jwt를 받아와서 유저의 후원 상세정보를 돌려준다
	@GetMapping("/usercontribution")
	public ResponseEntity<List<Contribution>> userContribution(HttpServletRequest req){
		String jwt = req.getHeader("token");
		int userSeq = jwtService.decode(jwt);
		ArrayList<Contribution> userContribution = userService.userContribution(userSeq);
		return new ResponseEntity<List<Contribution>>(userContribution, HttpStatus.OK);
	}
	
	
	
	
}

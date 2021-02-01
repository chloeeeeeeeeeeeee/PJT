package com.ssafy.bab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.bab.config.PasswordEncoding;
import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.User;

@Service
public class AuthService {
	
	@Autowired
    private UserDao userDao;
	
	@Autowired
    private JwtService jwtService;
    
    PasswordEncoding passwordEncoding = new PasswordEncoding();

//    // 의존성 주입
//    public AuthService(UserDao userDao, JwtService jwtService, PasswordEncoding PasswordEncoding) {
//        this.userDao = userDao;
//        this.jwtService = jwtService;
//        this.PasswordEncoding = PasswordEncoding;
//    }

    // 로그인
    public ResponseEntity<JwtService.TokenRes> signIn(String userId, String userPwd) {
        User user = userDao.findByUserId(userId);
        
        // 회원 정보가 존재하지 않거나, 아이디가 틀렸음
        if (user == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        // 로그인 성공
        if (passwordEncoding.matches(userPwd, user.getUserPwd())) {
            // 토큰 생성
            JwtService.TokenRes token = new JwtService.TokenRes(jwtService.create(user.getUserSeq()));
            return new ResponseEntity<JwtService.TokenRes>(token, HttpStatus.OK);
        }

        // 비밀번호가 틀렸을 때
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}

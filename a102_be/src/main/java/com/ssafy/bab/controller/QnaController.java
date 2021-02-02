package com.ssafy.bab.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.QnaReply;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.service.JwtService;
import com.ssafy.bab.service.PasswordEncodingService;
import com.ssafy.bab.service.QnaService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/qna")
public class QnaController {

	private static final Logger logger = LoggerFactory.getLogger(QnaController.class);
	
	@Autowired
	private QnaService qnaService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	PasswordEncodingService passwordEncoding;
	
	@ApiOperation(value = "QnA 글 쓰기", notes = "글 제목, 내용, 비밀번호(필요시에만, 비밀글이 아닐 경우 qnaPwd = null)", response = List.class)
	@PostMapping("/create")
	public ResponseEntity<String> qnaCreate(@ApiParam(value = "글 제목, 내용, (비밀번호) ", required = true) @RequestBody Qna qna, HttpServletRequest req) throws Exception {
		logger.info("qnaCreate_QnaController - 호출");
		
//		String jwt = req.getHeader("token");
//        int userSeq = jwtService.decode(jwt);
		
		int userSeq = 1;
		User user = new User();
		user.setUserSeq(1);
		qna.setUser(user);
		
        if(userSeq == -1 || qna.getQnaContent() == null || qna.getQnaTitle() == null) return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		if("SUCCESS" == qnaService.qnaCreate(qna))
			return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		else
			return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	@ApiOperation(value = "QnA 답변하기", notes = "원문 qnaSeq, 답변 제목, 답변 내용", response = List.class)
	@PostMapping("/reply/create")
	public ResponseEntity<String> replyCreate(@ApiParam(value = "원문 qnaSeq, 답변 제목, 답변 내용", required = true) @RequestBody QnaReply qnaReply, HttpServletRequest req) throws Exception {
		logger.info("replyCreate_QnaController - 호출");
		
//		String jwt = req.getHeader("token");
//        int userSeq = jwtService.decode(jwt);
		
//		******************************
//		관리자 계정인지 체크하는 부분 필요
//		******************************
		
		int userSeq = 1;
		User user = new User();
		user.setUserSeq(1);
		qnaReply.setUser(user);
		
        if(userSeq == -1 || qnaReply.getReplyContent() == null || qnaReply.getReplyTitle() == null) return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		if("SUCCESS" == qnaService.replyCreate(qnaReply))
			return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		else
			return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}

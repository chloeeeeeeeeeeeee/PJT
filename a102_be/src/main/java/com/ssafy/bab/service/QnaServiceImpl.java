package com.ssafy.bab.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.bab.dao.QnaDao;
import com.ssafy.bab.dao.QnaReplyDao;
import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.QnaReply;

@Service
public class QnaServiceImpl implements QnaService {

	@Autowired
	private PasswordEncodingService passwordEncoding;
	
	@Autowired
	private QnaDao qnaDao;
	
	@Autowired
	private QnaReplyDao qnaReplyDao;
	
	@Override
	public String qnaCreate(Qna qna) {

		String pwd = passwordEncoding.encode(qna.getQnaPwd());
		qna.setQnaPwd(pwd);
		qna.setQnaDate(new Date());
		
		qnaDao.save(qna);
		
		return "SUCCESS";
	}

	@Override
	public String replyCreate(QnaReply qnaReply) {
		
		Qna question = qnaDao.findByQnaSeq(qnaReply.getQnaSeq());

		qnaReply.setReplyDate(new Date());
		qnaReply.setReplyPwd(question.getQnaPwd());
		qnaReply = qnaReplyDao.save(qnaReply);

		question.setQnaReply(qnaReply);
		qnaDao.save(question);
		
		return "SUCCESS";
	}

}

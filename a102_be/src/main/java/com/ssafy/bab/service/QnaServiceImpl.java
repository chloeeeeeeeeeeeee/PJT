package com.ssafy.bab.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ssafy.bab.dao.QnaDao;
import com.ssafy.bab.dao.QnaReplyDao;
import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.QnaReply;
import com.ssafy.bab.dto.User;

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

	@Override
	public Page<Qna> getList(int page) {
//												 페이지, 사이즈, qnaSeq 기준으로 내림차순 정렬
		PageRequest pageRequest = PageRequest.of(page, 5, Sort.by("qnaSeq").descending());
		Page<Qna> result = qnaDao.findAll(pageRequest);
		return result;
	}

	@Override
	public Qna qnaDetail(Qna qna) {
		
		String pwd = qna.getQnaPwd();
		qna = qnaDao.findByQnaSeq(qna.getQnaSeq());
		if(pwd == null || passwordEncoding.matches(pwd, qna.getQnaPwd())) return qna;
		
		return null;
	}

	@Override
	public String qnaUpdate(Qna qna) {
		
		Qna newQna = qnaDao.findByQnaSeq(qna.getQnaSeq());
		if(newQna.getQnaReply() != null) return "FAIL";
		newQna.setQnaContent(qna.getQnaContent());
		newQna.setQnaTitle(qna.getQnaTitle());
		newQna.setQnaDate(new Date());
		qnaDao.save(newQna);
		
		return "SUCCESS";
	}

	@Override
	public String qnaDelete(int qnaSeq) {
		qnaDao.deleteById(qnaSeq);
		return "SUCCESS";
	}

}

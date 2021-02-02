package com.ssafy.bab.service;

import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.QnaReply;

public interface QnaService {
	public String qnaCreate(Qna qna);
	public String replyCreate(QnaReply qnaReply);
}

package com.ssafy.bab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Qna;
import com.ssafy.bab.dto.Store;

@Repository
public interface QnaDao extends JpaRepository<Qna, Integer>{
	Qna findByQnaSeq(int qnaSeq);
}

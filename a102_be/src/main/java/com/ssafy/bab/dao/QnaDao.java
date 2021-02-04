package com.ssafy.bab.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Qna;

@Repository
public interface QnaDao extends JpaRepository<Qna, Integer>{
	Qna findByQnaSeq(int qnaSeq);
	Page<Qna> findByUser_UserSeq(int userSeq, Pageable pagebale);
}

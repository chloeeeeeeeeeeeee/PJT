package com.ssafy.bab.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.ContributionId;

@Repository
public interface ContributionDao extends JpaRepository<Contribution, ContributionId> {

	// 가게의 메뉴별 일정 기간 내 (한달) 후원 횟수
	@Query(value = "SELECT COUNT(item_id) FROM contribution WHERE DATE_FORMAT(contribution_date, '%Y-%m-%d') >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND store_id = :storeId AND item_id = :itemId", nativeQuery = true)
	int getTotalItemContributionCount(@Param("storeId") int storeId,@Param("itemId")  int itemId);
	
	// 가게의 일정 기간 내 (한달) 후원 횟수
	@Query(value = "SELECT COUNT(store_id) FROM contribution WHERE DATE_FORMAT(contribution_date, '%Y-%m-%d') >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) AND store_id = :storeId", nativeQuery = true)
	int getTotalStoreContributionCount(@Param("storeId") int storeId);
	
	@Query(value = "SELECT contribution_id.NEXTVAL partner_order_id FROM contribution", nativeQuery = true)
	int getPartnerOrderId();

	ArrayList<Contribution> findByUser_UserSeqOrderByContributionDateDesc(int userSeq);
	
	//개인 후원횟수
	@Query(value = "select count(user_seq) from contribution group by user_seq having user_seq = :userSeq", nativeQuery = true)
	Integer findCountByUserSeq(@Param("userSeq") int userSeq);
	
}

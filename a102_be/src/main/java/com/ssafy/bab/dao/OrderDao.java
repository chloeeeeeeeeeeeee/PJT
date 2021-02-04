package com.ssafy.bab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.Orders;
import com.ssafy.bab.dto.OrdersPK;

@Repository
public interface OrderDao extends JpaRepository<Orders, OrdersPK>  {
	@Query(value = "SELECT MAX(order_id) + 1 partner_order_id FROM sys.order", nativeQuery = true)
	int getPartnerOrderId();
}

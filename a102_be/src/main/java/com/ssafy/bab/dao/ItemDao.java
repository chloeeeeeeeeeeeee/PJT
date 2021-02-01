package com.ssafy.bab.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.ItemId;

public interface ItemDao extends JpaRepository<Item, ItemId> {

	ArrayList<Item> findByStore_StoreId(int storeId);
	
}

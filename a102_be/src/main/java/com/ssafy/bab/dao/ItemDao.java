package com.ssafy.bab.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.ItemPK;

public interface ItemDao extends JpaRepository<Item, ItemPK> {

	ArrayList<Item> findByStore_StoreId(int storeId);
//	Item findByItemIdAndStore_StoreId(int itemId, int storeId);
//	Item findByStore_StoreIdAndItemId(int itemId, int storeId);
	Item findByItemIdAndStoreId(int itemId, int storeId);

}

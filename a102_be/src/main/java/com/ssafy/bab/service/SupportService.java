package com.ssafy.bab.service;

import java.util.List;

import com.ssafy.bab.dto.Menu;
import com.ssafy.bab.dto.StoreDetail;
import com.ssafy.bab.dto.SupportStoreList;

public interface SupportService {

	public List<SupportStoreList> getSupportStoreList(String Juso) throws Exception;
	public StoreDetail getStoreDetail(int storeId) throws Exception;
	public List<Menu> getMenuList(int storeId) throws Exception;
	
}

package com.ssafy.bab.service;

import java.util.List;

import com.ssafy.bab.dto.StoreList;
import com.ssafy.bab.dto.StoreRank;
import com.ssafy.bab.dto.StoreVariables;
import com.ssafy.bab.dto.User;

public interface MainService {

	public List<StoreList> getStoreList(String Juso) throws Exception;
	
	//전체 랭킹+정보
	public List<StoreRank> storeTotalRank() throws Exception;
	
	//지역별 랭킹+정보
	public List<StoreRank> storeRegionalRank(int locationId) throws Exception;
	
	//유저랭킹
	public List<User> userTotalRank();
}

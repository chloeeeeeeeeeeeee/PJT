package com.ssafy.bab.service;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.bab.dao.ItemDao;
import com.ssafy.bab.dao.LocationDao;
import com.ssafy.bab.dao.StoreDao;
import com.ssafy.bab.dao.StoreVariablesDao;
import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.Location;
import com.ssafy.bab.dto.Menu;
import com.ssafy.bab.dto.Store;
import com.ssafy.bab.dto.StoreDetail;
import com.ssafy.bab.dto.StoreVariables;
import com.ssafy.bab.dto.SupportStoreList;

@Service
public class SupportServiceImpl implements SupportService {

	@Autowired
	private StoreDao storeDao;
	
	@Autowired
	private LocationDao locationDao;
	
	@Autowired
	private StoreVariablesDao storeVariablesDao;
	
	@Autowired
	private ItemDao itemDao;
	
	@Override
	public List<SupportStoreList> getSupportStoreList(String Juso) throws Exception {
		StringTokenizer st = new StringTokenizer(Juso);
		String si = st.nextToken();
		String gu = st.nextToken();
		
		
		// 구를 기준으로 locationId를 받아온뒤 locationId와 후원유무(StoreKiosk)를 기준으로
		// store와 storeVariable을 리스트로 받아와서 StoreList에 결과를 추가 후 반환
		
		Location locationDto = locationDao.findByLocationGu(gu);
		ArrayList<Store> storeList = storeDao.findByLocation_locationIdAndStoreKiosk(locationDto.getLocationId(), 1);
		ArrayList<SupportStoreList> resultList = new ArrayList<SupportStoreList>();
		for (Store store : storeList) {
			SupportStoreList result = new SupportStoreList();
			result.setStoreId(store.getStoreId());
			result.setStoreName(store.getStoreName());
			result.setStoreLocation(store.getStoreLocation());
			result.setStoreCategory(store.getStoreCategory());

			StoreVariables storeVariablesDto = storeVariablesDao.findByStoreId(store.getStoreId());
			result.setStoreItemAvailable(storeVariablesDto.getStoreItemAvailable());
			result.setStoreItemTotal(storeVariablesDto.getStoreItemTotal());

			resultList.add(result);
		}

		return resultList;
	}

	@Override
	public StoreDetail getStoreDetail(int storeId) throws Exception {
		StoreDetail storeDetail = new StoreDetail();
		Store store = storeDao.findByStoreId(storeId);
		storeDetail.setStoreId(storeId);
		storeDetail.setStoreName(store.getStoreName());
		storeDetail.setStoreCategory(store.getStoreCategory());
		storeDetail.setStoreLocation(store.getStoreLocation());
		storeDetail.setStorePhone(store.getStorePhone());
		return storeDetail;
	}

	@Override
	public List<Menu> getMenuList(int storeId) throws Exception {
		ArrayList<Menu> menuList = new ArrayList<Menu>();
		ArrayList<Item> itemList = itemDao.findByStore_StoreId(storeId);
		for (Item item : itemList) {
			Menu menu = new Menu();
			menu.setStoreId(storeId);
			menu.setItemId(item.getItemId());
			menu.setItemName(item.getItemName());
			menu.setItemAvailable(item.getItemAvailable());
//			!!!!!!!!!!!!!!수정 필요!!!!!!!!!!!!!!!!!!
			menu.setItemContributionAmount(0);
			menu.setImgUrl(item.getItemImgUrl());
			
			menuList.add(menu);
		}
		return menuList;
	}

}

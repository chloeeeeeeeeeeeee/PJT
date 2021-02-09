package com.ssafy.bab.service;

import java.util.ArrayList;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.MyStore;

public interface StoreService {

	// 가게 기본 정보 반환
	public MyStore getMyStore(int storeId);
	
	// 메뉴 추가
	public String itemCreate(Item item, MultipartFile uploadFile);

	// 메뉴 리스트
	public ArrayList<Item> getItemList(int storeId);
	
	// 메뉴 수정
	public String itemUpdate(Item item, MultipartFile uploadFile);

	// 메뉴 삭제
	public String itemDelete(int itemId, int storeId);
}
package com.ssafy.bab.service;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.bab.dto.Item;

public interface StoreService {
	
	// 메뉴 추가
	public String itemCreate(Item item, MultipartFile uploadFile);
	
	// 메뉴 수정
	public String itemUpdate(Item item, MultipartFile uploadFile);
}

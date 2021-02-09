package com.ssafy.bab.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.StringTokenizer;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.bab.dao.ItemDao;
import com.ssafy.bab.dao.StoreDao;
import com.ssafy.bab.dao.StoreVariablesDao;
import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.MyStore;
import com.ssafy.bab.dto.Store;
import com.ssafy.bab.dto.StoreVariables;

@Service
public class StoreServiceImpl implements StoreService {

	@Value("${resources.location}")
	private String uploadPath;
	
	private final int SUPPORT_AMOUNT = 6000;
	
	@Autowired
	StoreDao storeDao;

	@Autowired
	StoreVariablesDao storeVariablesDao;
	
	@Autowired
	ItemDao itemDao;
	
	
	@Override
	public MyStore getMyStore(int storeId) {
		
		MyStore result = new MyStore();
		Store store = storeDao.findByStoreId(storeId);
		StoreVariables storeVariables = storeVariablesDao.findByStoreId(storeId);
		
		if(store == null || storeVariables == null) return null;
	
		result.setStoreId(storeId);
		result.setStoreName(store.getStoreName());
		result.setStoreCategory(store.getStoreCategory());
		result.setStoreLocation(store.getStoreLocation());
		result.setStoreRegDate(store.getStoreRegDate());
		result.setStorePhone(store.getStorePhone());
		result.setStoreItemAvailable(storeVariables.getStoreItemAvailable());
		result.setStoreItemTotal(storeVariables.getStoreItemTotal());
		result.setStoreTotalContributionAmount(storeVariables.getStoreTotalContributionAmount());
		result.setStoreSettlementDay(storeVariables.getStoreSettlementDay());
		
		return result;
	}
	
	@Override
	public String itemCreate(Item item, MultipartFile uploadFile) {
		
		try {
			
			String savingFileName = null;
			
			// 업로드한 사진이 있을 경우
			if(uploadFile != null && !uploadFile.isEmpty()) {
				File uploadDir = new File(uploadPath);
				if(!uploadDir.exists()) uploadDir.mkdir();
				
				String fileName = uploadFile.getOriginalFilename();
				
				//Random Fild Id
				UUID uuid = UUID.randomUUID();
				
				//file extension
				String extension = FilenameUtils.getExtension(fileName);
				 
				savingFileName = uuid + "." + extension;
				
				File destFile = new File(uploadPath + savingFileName);
				uploadFile.transferTo(destFile);
			} 
			// 업로드한 사진이 없을 경우
			else {
				savingFileName = "logo.jpg";
			}
			
			// Table Insert
			Integer itemId = itemDao.getMaxItemId(item.getStoreId());
			if(itemId == null) item.setItemId(1);
			else item.setItemId(itemDao.getMaxItemId(item.getStoreId()));
			
			item.setItemImgUrl("menus/" + savingFileName);
			
			int supportPrice = item.getItemPrice() - SUPPORT_AMOUNT;
			if(supportPrice > 0) item.setSupportPrice(supportPrice);
			
			itemDao.save(item);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "FAIL";
		} 
		
		return "SUCCESS";
	}

	
	@Override
	public ArrayList<Item> getItemList(int storeId) {
		return (ArrayList<Item>) itemDao.findByStoreId(storeId);
	}
	
	@Override
	public String itemUpdate(Item item, MultipartFile uploadFile) {
		
		Item updatedItem = itemDao.findByItemIdAndStoreId(item.getItemId(), item.getStoreId());

		try {

			String savingFileName = null;

			// 메뉴사진 삭제
			if(item.getItemImgUrl().equals("noImage")){
				
				// 기존 메뉴사진이 기본 이미지가 아닐 경우 기존 사진 제거
				if(!updatedItem.getItemImgUrl().equals("menus/logo.jpg")) {
					System.out.println(updatedItem.getItemImgUrl());
					StringTokenizer st = new StringTokenizer(updatedItem.getItemImgUrl(), "/");
					st.nextToken();
					File deleteFile = new File(uploadPath + st.nextToken());
					if(deleteFile.exists()) {
						if(!deleteFile.delete()) {
							return "FAIL";
						}
					}
				}
				
				updatedItem.setItemImgUrl("menus/logo.jpg");
			}
			// 새로운 메뉴사진 업로드
			else if(uploadFile != null && !uploadFile.isEmpty()) {
				
				File uploadDir = new File(uploadPath);
				if (!uploadDir.exists())
					uploadDir.mkdir();

				// 기존 메뉴사진이 기본 이미지가 아닐 경우 기존 사진 제거
				if(!item.getItemImgUrl().equals("menus/logo.jpg")) {
					StringTokenizer st = new StringTokenizer(item.getItemImgUrl(), "/");
					st.nextToken();
					File deleteFile = new File(uploadPath + st.nextToken());
					if(deleteFile.exists()) {
						if(!deleteFile.delete()) {
							return "FAIL";
						}
					}
				}
				
				// 새로운 사진 파일로 업데이트
				String fileName = uploadFile.getOriginalFilename();

				// Random Fild Id
				UUID uuid = UUID.randomUUID();

				// file extension
				String extension = FilenameUtils.getExtension(fileName);

				savingFileName = uuid + "." + extension;

				File destFile = new File(uploadPath + savingFileName);
				uploadFile.transferTo(destFile);
				
				updatedItem.setItemImgUrl("menus/" + savingFileName);
				
			}
			// 메뉴 사진 수정이 없는 경우는 itemImgUrl 수정 필요 X

			// Table Update
			updatedItem.setItemName(item.getItemName());
			updatedItem.setItemPrice(item.getItemPrice());
			
			int supportPrice = item.getItemPrice() - SUPPORT_AMOUNT;
			if(supportPrice > 0) updatedItem.setSupportPrice(supportPrice);

			itemDao.save(updatedItem);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "FAIL";
		}

		return "SUCCESS";
	}

	@Override
	public String itemDelete(int itemId, int storeId) {
		
		Item item = itemDao.findByItemIdAndStoreId(itemId, storeId);
		if(item == null) return "INVALID itemId";
		
		// 기존 메뉴사진이 기본 이미지가 아닐 경우 기존 사진 제거
		if(!item.getItemImgUrl().equals("menus/logo.jpg")) {
			StringTokenizer st = new StringTokenizer(item.getItemImgUrl(), "/");
			st.nextToken();
			File deleteFile = new File(uploadPath + st.nextToken());
			if(deleteFile.exists()) {
				if(!deleteFile.delete()) {
					return "FAIL TO DELETE IMAGE";
				}
			}
		}
		
		itemDao.delete(item);
		
		return "SUCCESS";
	}

}

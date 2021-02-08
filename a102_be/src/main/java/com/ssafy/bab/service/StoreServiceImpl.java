package com.ssafy.bab.service;

import java.io.File;
import java.util.StringTokenizer;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.convert.Jsr310Converters.StringToDurationConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.bab.dao.ItemDao;
import com.ssafy.bab.dao.StoreDao;
import com.ssafy.bab.dto.Item;

@Service
public class StoreServiceImpl implements StoreService {

	@Value("${resources.location}")
	private String uploadPath;
	
	@Autowired
	StoreDao storeDao;

	@Autowired
	ItemDao itemDao;
	
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
			item.setItemId(itemDao.getMaxItemId(item.getStoreId()));
			item.setItemImgUrl("menus/" + savingFileName);
			itemDao.save(item);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "FAIL";
		} 
		
		return "SUCCESS";
	}

	@Override
	public String itemUpdate(Item item, MultipartFile uploadFile) {
		
		Item updatedItem = itemDao.findByItemIdAndStoreId(item.getItemId(), item.getStoreId());
		
		try {

			String savingFileName = null;

			// 새로운 메뉴사진 업로드
			if (uploadFile != null && !uploadFile.isEmpty()) {
				
				System.out.println(uploadFile.getName());
				
				File uploadDir = new File(uploadPath);
				if (!uploadDir.exists())
					uploadDir.mkdir();

				System.out.println(item.getItemImgUrl());
				
				
				// 기존 메뉴사진이 기본 이미지가 아닐 경우 기존 사진 제거
				if(!item.getItemImgUrl().equals("noImage")) {
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
			// 메뉴사진 삭제
			else if(item.getItemImgUrl().equals("noImage")){
				
				// 기존 메뉴사진이 기본 이미지가 아닐 경우 기존 사진 제거
				if(!updatedItem.getItemImgUrl().equals("noImage")) {
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
			// 메뉴 사진 수정이 없는 경우는 itemImgUrl 수정 필요 X

			// Table Update
			updatedItem.setItemName(item.getItemName());
			updatedItem.setItemPrice(item.getItemPrice());
			updatedItem.setSupportPrice(item.getSupportPrice());
			itemDao.save(updatedItem);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "FAIL";
		}

		return "SUCCESS";
	}
}

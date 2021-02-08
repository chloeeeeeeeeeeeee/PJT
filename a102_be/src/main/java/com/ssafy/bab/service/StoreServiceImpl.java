package com.ssafy.bab.service;

import java.io.File;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
}

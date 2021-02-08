package com.ssafy.bab.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.User;
import com.ssafy.bab.service.JwtService;
import com.ssafy.bab.service.StoreService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api("StoreController V1")
@RestController
@RequestMapping(value = "/store")
public class StoreController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private StoreService storeService;
	
	@ApiOperation(value = "가게 메뉴 ", notes = "메뉴 이름, 가격, (후원가격, 메뉴 사진)을 입력받아 ", response = String.class)
	@PostMapping("/item/create")
	public ResponseEntity<String> itemCreate(@ApiParam(value = "메뉴 이름, 가격, 후원 가격", required = true) Item item, 
			@ApiParam(value = "메뉴 이름, 메뉴 가격, 후원 가격", required = false) @RequestParam(value="file", required = false) MultipartFile file,
			HttpServletRequest req) throws Exception {
		logger.info("itemCreate_Store - 호출");
		
		String jwt = req.getHeader("token");
        int userSeq = jwtService.decode(jwt);
        User user = userDao.findByUserSeq(3);
        
        // user 정보가 없거나, 가게 사장이 아니거나, 메뉴 이름 또는 가격이 없다면 잘못된 요청임
		if(user == null || user.getStore() == null || item.getItemName() == null || item.getItemPrice() == null) {
			return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
		}
        
        item.setStoreId(user.getStore().getStoreId());
     
        String result = storeService.itemCreate(item, file);
        if(result == "SUCCESS") return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        else return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
	
}

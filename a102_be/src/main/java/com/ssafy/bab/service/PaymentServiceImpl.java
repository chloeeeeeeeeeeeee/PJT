package com.ssafy.bab.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafy.bab.dao.ContributionDao;
import com.ssafy.bab.dao.ContributorDao;
import com.ssafy.bab.dao.ItemDao;
import com.ssafy.bab.dao.OrderDao;
import com.ssafy.bab.dao.PaymentDao;
import com.ssafy.bab.dao.PaymentGdreamDao;
import com.ssafy.bab.dao.StoreDao;
import com.ssafy.bab.dao.StoreVariablesDao;
import com.ssafy.bab.dao.UserDao;
import com.ssafy.bab.dto.CPaymentInfo;
import com.ssafy.bab.dto.Contribution;
import com.ssafy.bab.dto.Contributor;
import com.ssafy.bab.dto.GPaymentInfo;
import com.ssafy.bab.dto.IPaymentInfo;
import com.ssafy.bab.dto.Item;
import com.ssafy.bab.dto.NPaymentInfo;
import com.ssafy.bab.dto.Orders;
import com.ssafy.bab.dto.Payment;
import com.ssafy.bab.dto.PaymentGdream;
import com.ssafy.bab.dto.PaymentItem;
import com.ssafy.bab.dto.StoreVariables;
import com.ssafy.bab.dto.User;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class PaymentServiceImpl implements PaymentService {
	
	@Value("${coolsms.API_KEY}")
	private String API_KEY;
	
	@Value("${coolsms.API_SECRET}")
	private String API_SECRET;
	
	@Autowired
	PaymentDao paymentDao;
	
	@Autowired
	PaymentGdreamDao paymentGDao;
	
	@Autowired
	ContributionDao contributionDao;
	
	@Autowired
	ItemDao itemDao;
	
	@Autowired
	StoreDao storeDao;
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	ContributorDao contributorDao;
	
	@Autowired
	StoreVariablesDao storeVariablesDao;
	
	@Autowired
	OrderDao orderDao;

	@Override
	public String checkNaverPayTransaction(NPaymentInfo paymentInfo) throws ParseException {
		
		// itemCount = 0 일 경우 에러처리
		for (int i = 0; i < paymentInfo.getItemList().size(); i++) {
			if (paymentInfo.getItemList().get(i).getItemCount() <= 0) return "Check ItemCount";
		}
		
		// String -> Date
		SimpleDateFormat transFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		Date tradeConfirmYmdt = transFormat.parse(paymentInfo.getTradeConfirmYmdt());
		
		// 주문번호
		SimpleDateFormat vans = new SimpleDateFormat("yyyyMMdd-HHmmss");
		String wdate = vans.format(tradeConfirmYmdt);
		
		//payment 테이블 업데이트
		Payment payment = new Payment();
		payment.setPaymentId(wdate);
		payment.setPaymentAmount(paymentInfo.getTotalPayAmount());
		payment.setPaymentDate(tradeConfirmYmdt);
		payment.setNaverpayMerchantId(paymentInfo.getMerchantId());
		payment.setNaverpayPaymentId(paymentInfo.getPaymentId());
		paymentDao.save(payment);
		
		// 회원 기부일 경우 user에 해당 회원 정보가 들어감 (그 외의 경우는 null)
		User user = userDao.findByUserSeq(paymentInfo.getUserSeq());
		
		// 비회원 기부일 경우 contributor에 해당 기부자 정보가 들어감 (그 외의 경우는 null)
		Contributor contributor = null;
		if(paymentInfo.getUserSeq() == -1 && paymentInfo.getContributorPhone() != null) {
			contributor = contributorDao.findByContributorPhone(paymentInfo.getContributorPhone());
			if(contributor == null) {
				contributor = new Contributor();
            	contributor.setContributorPhone(paymentInfo.getContributorPhone());
            	contributorDao.save(contributor);
			}
		}
		
		int totalSupportPrice = payment.getPaymentAmount();
		int totalSupportItem = paymentInfo.getItemList().size();
		
		for(PaymentItem paymentItem : paymentInfo.getItemList()) {
			Item item = itemDao.findByItemIdAndStoreId(paymentItem.getItemId(), paymentItem.getStoreId());
			if(item == null) throw new RuntimeException();
			for(int i = 0; i < paymentItem.getItemCount(); i++) {
				// Contribution 테이블 업데이트
				Contribution contribution = new Contribution();
				contribution.setItemId(paymentItem.getItemId());
				contribution.setStoreId(paymentItem.getStoreId());
				if(user != null) contribution.setUser(user);
				else if(contributor != null) contribution.setContributor(contributor);
				contribution.setContributionDate(tradeConfirmYmdt);
				contribution.setContributionUse(0);
				contribution.setPayment(payment);
				contribution.setContributionMessage(paymentItem.getMsg());
				contributionDao.save(contribution);
			
			}
			// item 테이블 업데이트
			item.setItemAvailable(item.getItemAvailable() + paymentItem.getItemCount());
			item.setItemTotal(item.getItemTotal() + paymentItem.getItemCount());
			itemDao.save(item);
		}
		
		// storeVariables, user 테이블 업데이트
        if(totalSupportItem != 0) {
        	StoreVariables storeVariables = storeVariablesDao.findByStoreId(paymentInfo.getItemList().get(0).getStoreId());
        	storeVariables.setStoreItemAvailable(storeVariables.getStoreItemAvailable() + totalSupportItem);
        	storeVariables.setStoreItemTotal(storeVariables.getStoreItemTotal() + totalSupportItem);
        	storeVariables.setStoreTotalContributionAmount(storeVariables.getStoreTotalContributionAmount() + totalSupportPrice);
        	storeVariablesDao.save(storeVariables);
        	
        	if(user != null) {
        		user.setUserTotalContributionAmount(user.getUserTotalContributionAmount() + totalSupportPrice);
        		user.setUserTotalContributionCount(user.getUserTotalContributionCount() + totalSupportItem);
        		userDao.save(user);
        	}
        }

		return "SUCCESS";
	}

	@Override
	public String checkIamPortTransaction(IPaymentInfo paymentInfo) {
		
		// itemCount = 0 일 경우 에러처리
		for (int i = 0; i < paymentInfo.getItemList().size(); i++) {
			if (paymentInfo.getItemList().get(i).getItemCount() <= 0) return "Check ItemCount";
		}
		
		// UNIX timestamp -> Date
		Date date = new java.util.Date(paymentInfo.getPaid_at()*1000L); 

		// 주문번호
		SimpleDateFormat vans = new SimpleDateFormat("yyyyMMdd-HHmmss");
		String wdate = vans.format(date);

		// payment 테이블 업데이트
		Payment payment = new Payment();
		payment.setPaymentId(wdate);
		payment.setPaymentAmount(paymentInfo.getPaid_amount());
		payment.setPaymentDate(date);
		payment.setImpMerchantId(paymentInfo.getMerchant_uid());
		payment.setImpUid(paymentInfo.getImp_uid());
		paymentDao.save(payment);

		// 회원 기부일 경우 user에 해당 회원 정보가 들어감 (그 외의 경우는 null)
		User user = userDao.findByUserSeq(paymentInfo.getUserSeq());

		// 비회원 기부일 경우 contributor에 해당 기부자 정보가 들어감 (그 외의 경우는 null)
		Contributor contributor = null;
		if(paymentInfo.getUserSeq() == -1 && paymentInfo.getContributorPhone() != null) {
			contributor = contributorDao.findByContributorPhone(paymentInfo.getContributorPhone());
			if(contributor == null) {
				contributor = new Contributor();
            	contributor.setContributorPhone(paymentInfo.getContributorPhone());
            	contributorDao.save(contributor);
			}
		}

		int totalSupportPrice = payment.getPaymentAmount();
		int totalSupportItem = paymentInfo.getItemList().size();

		for (PaymentItem paymentItem : paymentInfo.getItemList()) {
			Item item = itemDao.findByItemIdAndStoreId(paymentItem.getItemId(), paymentItem.getStoreId());
			if(item == null) throw new RuntimeException();
			for (int i = 0; i < paymentItem.getItemCount(); i++) {
				// Contribution 테이블 업데이트
				Contribution contribution = new Contribution();
				contribution.setItemId(paymentItem.getItemId());
				contribution.setStoreId(paymentItem.getStoreId());
				if (user != null)
					contribution.setUser(user);
				else if (contributor != null)
					contribution.setContributor(contributor);
				contribution.setContributionDate(date);
				contribution.setContributionUse(0);
				contribution.setPayment(payment);
				contribution.setContributionMessage(paymentItem.getMsg());
				contributionDao.save(contribution);

			}
			// item 테이블 업데이트
			item.setItemAvailable(item.getItemAvailable() + paymentItem.getItemCount());
			item.setItemTotal(item.getItemTotal() + paymentItem.getItemCount());
			itemDao.save(item);
		}

		// storeVariables, user 테이블 업데이트
		if (totalSupportItem != 0) {
			StoreVariables storeVariables = storeVariablesDao
					.findByStoreId(paymentInfo.getItemList().get(0).getStoreId());
			storeVariables.setStoreItemAvailable(storeVariables.getStoreItemAvailable() + totalSupportItem);
			storeVariables.setStoreItemTotal(storeVariables.getStoreItemTotal() + totalSupportItem);
			storeVariables.setStoreTotalContributionAmount(
					storeVariables.getStoreTotalContributionAmount() + totalSupportPrice);
			storeVariablesDao.save(storeVariables);

			if (user != null) {
				user.setUserTotalContributionAmount(user.getUserTotalContributionAmount() + totalSupportPrice);
				user.setUserTotalContributionCount(user.getUserTotalContributionCount() + totalSupportItem);
				userDao.save(user);
			}
		}

		return "SUCCESS";
	}

	@Override
	public String checkCreditCardTransaction(CPaymentInfo paymentInfo) throws ParseException {
		
		// itemCount = 0 일 경우 에러처리
		for (int i = 0; i < paymentInfo.getItemList().size(); i++) {
			if (paymentInfo.getItemList().get(i).getItemCount() <= 0) return "Check ItemCount";
		}
		
		if(storeDao.findByStoreId(paymentInfo.getItemList().get(0).getStoreId()) == null) {
			return "Invalid Store";
		}
		
		// 주문번호
		SimpleDateFormat vans = new SimpleDateFormat("yyyyMMdd-HHmmss");
		String wdate = vans.format(new Date());
		
		// 주문시각
		Date tradeConfirmYmdt = vans.parse(paymentInfo.getPaidAt());
		
		/*
         * ******* DB 테이블 업데이트 *******
         */
		
		// payment 테이블 업데이트
		Payment payment = new Payment();
        payment.setPaymentId(wdate);
        payment.setPaymentDate(tradeConfirmYmdt);
        payment.setPaymentAmount(paymentInfo.getTotalAmount());
        payment.setCreditApprovalNumber(paymentInfo.getApprovalNumber());
        payment.setCreditStoreId(paymentInfo.getItemList().get(0).getStoreId());
        paymentDao.save(payment);
        
        User user = null;
        Contributor contributor = null;
        
        // 받아온 핸드폰 번호가 있을 경우 회원/후원자 정보를 받아오거나 후원자 정보를 추가 함
        if(paymentInfo.getContributorPhone() != null) {
        	user = userDao.findByUserPhone(paymentInfo.getContributorPhone());
        	contributor = contributorDao.findByContributorPhone(paymentInfo.getContributorPhone());
        	if(user == null && contributor == null){
        		contributor = new Contributor();
        		contributor.setContributorPhone(paymentInfo.getContributorPhone());
        		contributorDao.save(contributor);
        	}
        }
        
        int totalSupportPrice = 0;
        int totalSupportItem = 0;
        
     // order, contribution 테이블 업데이트
        for (PaymentItem paymentItem : paymentInfo.getItemList()) {
        	Item item = itemDao.findByItemIdAndStoreId(paymentItem.getItemId(), paymentItem.getStoreId());
        	if(item == null) throw new RuntimeException();
			if(paymentItem.getSupport() == 1) {
				for(int i = 0; i < paymentItem.getItemCount(); i++) {
					// Contribution 테이블 업데이트
					Contribution contribution = new Contribution();
					contribution.setItemId(paymentItem.getItemId());
					contribution.setStoreId(paymentItem.getStoreId());
					if(user != null) contribution.setUser(user);
					else if(contributor != null) contribution.setContributor(contributor);
					contribution.setContributionDate(tradeConfirmYmdt);
					contribution.setContributionUse(0);
					contribution.setPayment(payment);
					contribution.setContributionMessage(paymentItem.getMsg());
					contributionDao.save(contribution);
				
				}
				// item 테이블 업데이트
				item.setItemAvailable(item.getItemAvailable() + paymentItem.getItemCount());
				item.setItemTotal(item.getItemTotal() + paymentItem.getItemCount());
				itemDao.save(item);
				
				// for storeVariables, user 테이블 업데이트  
				totalSupportPrice += paymentItem.getItemPrice() * paymentItem.getItemCount();
				totalSupportItem += paymentItem.getItemCount();
			}else {
				Orders order = new Orders();
				order.setItemId(paymentItem.getItemId());
				order.setStoreId(paymentItem.getStoreId());
				order.setOrderDate(tradeConfirmYmdt);
				order.setOrderCount(paymentItem.getItemCount());
				order.setPayment(payment);
				
//				!!!!!!!!!!!!orderDone 수정필요!!!!!!!!!!!!!!!!
				order.setOrderDone(tradeConfirmYmdt);
				orderDao.save(order);
			}
		}
        
        
     // storeVariables, user 테이블 업데이트
        if(totalSupportItem != 0) {
        	StoreVariables storeVariables = storeVariablesDao.findByStoreId(paymentInfo.getItemList().get(0).getStoreId());
        	storeVariables.setStoreItemAvailable(storeVariables.getStoreItemAvailable() + totalSupportItem);
        	storeVariables.setStoreItemTotal(storeVariables.getStoreItemTotal() + totalSupportItem);
        	storeVariables.setStoreTotalContributionAmount(storeVariables.getStoreTotalContributionAmount() + totalSupportPrice);
        	storeVariablesDao.save(storeVariables);
        	
        	if(user != null) {
        		user.setUserTotalContributionAmount(user.getUserTotalContributionAmount() + totalSupportPrice);
        		user.setUserTotalContributionCount(user.getUserTotalContributionCount() + totalSupportItem);
        		userDao.save(user);
        	}
        }
        
        
		return "SUCCESS";
	}

	@Override
	public String checkGDreamTransaction(GPaymentInfo paymentInfo) throws ParseException {
		
		// itemCount = 0 일 경우 에러처리
		for (int i = 0; i < paymentInfo.getItemList().size(); i++) {
			if (paymentInfo.getItemList().get(i).getItemCount() <= 0) return "Check ItemCount";
		}
		
		if(storeDao.findByStoreId(paymentInfo.getItemList().get(0).getStoreId()) == null) {
			return "Invalid Store";
		}

		// 주문번호
		SimpleDateFormat vans = new SimpleDateFormat("yyyyMMdd-HHmmss");
		String wdate = vans.format(new Date());

		// 주문시각
		Date tradeConfirmYmdt = vans.parse(paymentInfo.getPaidAt());
		
		
		/*
         * ******* DB 테이블 업데이트 *******
         */
		
		// PaymentGdream 테이블 업데이트
		PaymentGdream paymentG = new PaymentGdream();
		paymentG.setPaymentGdreamId(wdate);
		paymentG.setPaymentGdreamDate(tradeConfirmYmdt);
		paymentG.setPaymentGdreamAmount(paymentInfo.getTotalGDreamAmount());
		paymentG.setPaymentGdreamApproval(paymentInfo.getGDreamApproval());
		paymentG.setPaymentGdreamStoreId(paymentInfo.getItemList().get(0).getStoreId());
		paymentGDao.save(paymentG);
		
		// 후원내역 처리
		String storeName = storeDao.findByStoreId(paymentInfo.getItemList().get(0).getStoreId()).getStoreName();
		ArrayList<Contribution> contributionList = null;
		for (PaymentItem paymentItem : paymentInfo.getItemList()) {
        	Item item = itemDao.findByItemIdAndStoreId(paymentItem.getItemId(), paymentItem.getStoreId());
        	if(item == null) throw new RuntimeException();
        	contributionList = null;
        	contributionList = contributionDao.findByStoreIdAndItemIdAndContributionUseOrderByContributionDate(item.getStoreId(), item.getItemId(), 0);
        	if(contributionList != null) {
        		int size = contributionList.size();
        		int i = 0;
	        	for (i = 0; i < paymentItem.getItemCount() && i < size ; i++) {
	
					// Contribution 테이블 업데이트
					Contribution contribution = contributionList.get(i);
					contribution.setContributionDateUsed(tradeConfirmYmdt);
					contribution.setContributionUse(1);
					contribution.setPaymentGdream(paymentG);
					contribution.setContributionAnswer(paymentItem.getMsg());
					contributionDao.save(contribution);
					
					// 회원 후원일 경우 문자 전송
					if(contribution.getUser() != null && contribution.getUser().getUserPhone() != "temp") {
						sendMsg(contribution, item.getItemName(), storeName);
					}
	
				}
	        	
	        	int count = Math.min(paymentItem.getItemCount(), size);
	        	
	        	// item 테이블 업데이트
				item.setItemAvailable(item.getItemAvailable() - count);
				item.setItemTotal(item.getItemTotal() - count);
				itemDao.save(item);
				
				// storeVariables 테이블 업데이트
				StoreVariables storeVariables = storeVariablesDao.findByStoreId(paymentItem.getStoreId());
				storeVariables.setStoreItemAvailable(storeVariables.getStoreItemAvailable() - count);
				storeVariablesDao.save(storeVariables);
        	}

			Orders order = new Orders();
			order.setItemId(paymentItem.getItemId());
			order.setStoreId(paymentItem.getStoreId());
			order.setOrderDate(tradeConfirmYmdt);
			order.setOrderCount(paymentItem.getItemCount());
			order.setPaymentGdream(paymentG);

//				!!!!!!!!!!!!orderDone 수정필요!!!!!!!!!!!!!!!!
			order.setOrderDone(tradeConfirmYmdt);
			orderDao.save(order);
			
		}
		
		return "SUCCESS";
	}

	@Override
	public void sendMsg(Contribution contribution, String itemName, String storeName) {
		String api_key = API_KEY;
        String api_secret = API_SECRET;
        Message coolsms = new Message(api_key, api_secret);

        // 4 params(to, from, type, text) are mandatory. must be filled
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", contribution.getUser().getUserPhone());    // 수신전화번호
        params.put("from", "01011111111");    // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
        params.put("type", "SMS");
        params.put("text", storeName + "에서 후원한 메뉴 '" + itemName + "'이 방금 사용되었습니다.\n 자세한 내용은 우리끼니 홈페이지에서 확인해주세요.");
//        params.put("app_version", "test app 1.2"); // application name and version

        try {
            JSONObject obj = (JSONObject) coolsms.send(params);
            System.out.println(obj.toString());
        } catch (CoolsmsException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getCode());
        }
		
	}

}

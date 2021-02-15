package com.ssafy.bab.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.ssafy.bab.dto.CPaymentInfo;

@Service
public class PaymentServiceImpl implements PaymentService {
	
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
        		userDao.save(user);
        	}
        }

		return "SUCCESS";
	}

	@Override
	public String checkIamPortTransaction(IPaymentInfo paymentInfo) {
		
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
				userDao.save(user);
			}
		}

		return "SUCCESS";
	}

	@Override
	public String checkCreditCardTransaction(CPaymentInfo paymentInfo) throws ParseException {
		
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
        		userDao.save(user);
        	}
        }
        
        
		return "SUCCESS";
	}

	@Override
	public String checkGDreamTransaction(GPaymentInfo paymentInfo) throws ParseException {
		
		if(storeDao.findByStoreId(paymentInfo.getItemList().get(0).getStoreId()) == null) {
			return "Invalid Store";
		}
		
		// 주문번호
		SimpleDateFormat vans = new SimpleDateFormat("yyyyMMdd-HHmmss");
		String wdate = vans.format(new Date());
		
		// 주문시각
		Date tradeConfirmYmdt = vans.parse(paymentInfo.getPaidAt());
		
		PaymentGdream paymentG = new PaymentGdream();
		paymentG.setPaymentGdreamId(wdate);
		paymentG.setPaymentGdreamDate(tradeConfirmYmdt);
		paymentG.setPaymentGdreamAmount(paymentInfo.getTotalGDreamAmount());
		paymentG.setPaymentGdreamApproval(paymentInfo.getGDreamApproval());
		paymentG.setPaymentGdreamStoreId(paymentInfo.getItemList().get(0).getStoreId());
		paymentGDao.save(paymentG);
		
		
		
		return null;
	}

}

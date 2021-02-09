import { Col, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, useEffect } from "react";
import PaymentInfo from "../../components/payment/paymentInfo";

function Payment() {
  function sendDataToParent(price) {
    setTotalPrice(price);
  }

  function paymentSuccess() {
    console.log("DONE!");
  }

  let [totalPrice, setTotalPrice] = useState(
    localStorage.getItem("price")
      ? JSON.parse(localStorage.getItem("price"))
      : 0
  );
  let [cartStorage, setCartStorage] = useState(
    localStorage.getItem("carts")
      ? JSON.parse(localStorage.getItem("carts"))
      : []
  );
  let [trigger, setTrigger] =useState(true)

  useEffect(() => {
    document.querySelector("#kakaoPaySelect").checked = true;
  }, []);

  useEffect(()=>{
    console.log("TRIGGER")
  }, [trigger])

  const axios = require("axios");
  const jwtToken = localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : "";

  function startPayment() {
    if (jwtToken == "") {
      alert("호오 로그인을 안하셨군요ㅋ");
      return;
    }
    let paymentOption = document.querySelector("input[type='radio']:checked")
      .value;
    let paymentMessage = document.querySelector("#paymentMsg").value.trim();
    if (paymentMessage == "") {
      paymentMessage = "든든하게 먹고다녀요";
    }
    // 카카오
    if (paymentOption == "kakaoPay") {
      let data = {
        cid: "TC0ONETIME",
        itemList: [],
        totalAmount: totalPrice,
        totalCount: 0,
        isUser: 1,
      };

      let totalCount = 0;
      cartStorage.forEach((item) => {
        let oneItem = {
          itemCount: item.itemCount,
          itemId: item.itemId,
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          storeId: item.storeId,
          support: 1,
          msg: paymentMessage,
        };
        totalCount += item.itemCount;
        data.itemList.push(oneItem);
      });
      data.totalCount = totalCount;

      console.log(data);

      axios
        .post(`http://i4a102.p.ssafy.io:8080/app/payment/kakaopay`, data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            token: jwtToken,
          },
        })
        .then((res) => {
          console.log(JSON.stringify(res.request.response));
          const popupWidth = window.innerWidth * 0.5;
          const popupHeight = window.innerHeight * 0.5;
          const popupLeft = (window.innerWidth - popupWidth) * 0.5;
          const popupTop = (window.innerHeight - popupHeight) * 0.5;
          window.open(
            res.request.response,
            "PopupWin",
            `width=${popupWidth},height=${popupHeight}, left=${popupLeft}, top=${popupTop}`
          );
        });
    }
    // 네이버 페이
    else if (paymentOption == "naverPay") {
      console.log("네이버페이");

      let data = { "modelVersion": "1",
      "merchantUserKey": "muserkey",
      "merchantPayKey": "mpaykey",
      "productName": "상품명",
      "productCount": 10,
      "totalPayAmount": 1000,
      "deliveryFee": 2500,
      "returnUrl": "{your-returnUrl}",
      "webhookUrl": "{your-webhookUrl}",
      "taxScopeAmount": 1000,
      "taxExScopeAmount": 0,
      "purchaserName": "구매자이름",
      "purchaserBirthday": "20000101"}

      axios.post(`https://dev.apis.naver.com/naverpay-partner/naverpay/payments/v2/reserve`, data, {headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Naver-Client-Id":"",
        "X-Naver-Client-Secret": ""
    }})

    
//    "modelVersion": "2",
//    "merchantUserKey": "muserkey",
//    "merchantPayKey": "mpaykey",
//    "productName": "상품명",
//    "productCount": 10,
//    "totalPayAmount": 1000,
//    "deliveryFee": 2500,
//    "returnUrl": "{your-returnUrl}",
//    "webhookUrl": "{your-webhookUrl}",
//    "taxScopeAmount": 1000,
//    "taxExScopeAmount": 0,
//    "purchaserName": "구매자이름",
//    "purchaserBirthday": "20000101",
//    "productItems": [{
//        "categoryType": "BOOK",
//        "categoryId": "GENERAL",
//        "uid": "107922211",
//        "name": "한국사",
//        "payReferrer": "NAVER_BOOK",
//        "count": 10
//    }, {
//        "categoryType": "MUSIC",
//        "categoryId": "CD",
//        "uid": "299911002",
//        "name": "러블리즈",
//        "payReferrer": "NAVER_BOOK",
//        "count": 1
//    }]
// }
      
    //   naverPayScript.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
    //   let naverPayScript = document.createElement("script");
    //   naverPayScript.append(`var oPay = Naver.Pay.create({
    //         "mode" : "development",
    //         "clientId": "u86j4ripEt8LRfPGzQ8",
    //         "payType" : "normal",
    //         "openType" : "popup"
    //     })`);
    //     let totalCount = 0
    //     let productList = []
    //     cartStorage.forEach((item) => {
    //         let oneItem = {
    //             categoryType:'FOOD',
    //             categoryId: 'DELIVERY',
    //             uid: item.itemId,
    //           count: item.itemCount,
    //           name: item.itemName,
    //         //   itemPrice: item.itemPrice,
    //         //   storeId: item.storeId,
    //         //   support: 1,
    //         //   msg: paymentMessage,
    //         };
    //         totalCount += item.itemCount;
    //         productList.push(oneItem);
    //       });

    //   naverPayScript.append(`oPay.open({
    //     "merchantUserKey": "0000",
    //     "productName": "후원 결제",
    //     "productCount": ${totalCount}
    //     "totalPayAmount": ${totalPrice},
    //     "taxScopeAmount": ${totalPrice},
    //     "taxExScopeAmount": 0,
    //     "returnUrl": "/naverPayCheck",
    //     "productItems":${JSON.stringify(productList)}
    //   });`)
    //   document.body.appendChild(naverPayScript)
    //   setTrigger(!trigger)

      //         <script src="https://nsp.pay.naver.com/sdk/js/naverpay.min.js"
      //     data-client-id="{#_clientId}"
      //     data-mode="{#_mode}"
      //     data-open-type="popup"
      //     data-on-authorize="onNaverPayAuthorize"
      //     data-merchant-user-key="{#_merchantUserKey}"
      //     data-merchant-pay-key="{#_merchantPayKey}"
      //     data-product-name="{#_productName}"
      //     data-total-pay-amount="{#_totalPayAmount}"
      //     data-tax-scope-amount="{#_taxScopeAmount}"
      //     data-tax-ex-scope-amount="{#_taxExScopeAmount}"
      //     data-return-url="{#_returnUrl}">
      // </script>
    }
    // 신용/체크카드
    else if (paymentOption == "cardPay") {
      console.log("아임포트");
    }
  }

  return (
    <Col className="paymentBox row">
      <h2 className="col-12 mb-0">결제하기</h2>
      <PaymentInfo sendDataToParent={sendDataToParent}></PaymentInfo>
      <Col className="paymentDetailBox pt-2 pb-2" md="4" xs="12">
        <Col className="paymentAmount pb-4">
          <h3 className="text-left">총 후원 금액</h3>
          <h2 className="text-right">{totalPrice}원</h2>
          {/* <h2 className="text-right">{localStorage.getItem('price')}원</h2> */}
        </Col>
        <hr />
        <Col className="paymentMessage pt-4 pb-2">
          <h3>후원 메시지</h3>
          <FormGroup tag="fieldset" className="col p-0">
            <FormGroup className="col mt-3 p-0">
              <Input
                className="col m-0"
                placeholder="응원의 메시지를 입력해주세요"
                name="paymentMsg"
                id="paymentMsg"
              />
            </FormGroup>
          </FormGroup>
        </Col>
        <hr />
        <Col className="paymentMethod pt-4 pb-2">
          <h3>후원 방식 선택</h3>
          <FormGroup tag="fieldset" className="col">
            <FormGroup className="col mt-3">
              <Label>
                <Input
                  type="radio"
                  name="selectPayment"
                  value="kakaoPay"
                  id="kakaoPaySelect"
                />{" "}
                <span>카카오페이</span>
              </Label>
            </FormGroup>
            <FormGroup className="col">
              <Label>
                <Input
                  type="radio"
                  name="selectPayment"
                  value="naverPay"
                  id="naverPaySelect"
                />{" "}
                <span>네이버페이</span>
              </Label>
            </FormGroup>
            <FormGroup className="col">
              <Label>
                <Input
                  type="radio"
                  name="selectPayment"
                  value="cardPay"
                  id="cardPaySelect"
                />{" "}
                <span>신용/체크카드</span>
              </Label>
            </FormGroup>
          </FormGroup>
        </Col>
        <hr />
        <Button
          className="paymentButton"
          color="primary"
          size="lg"
          block
          onClick={startPayment}
        >
          후원하기
        </Button>
      </Col>
    </Col>
  );
}

export default Payment;

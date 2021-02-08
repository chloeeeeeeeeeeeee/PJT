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

  useEffect(() => {
    document.querySelector("#kakaoPaySelect").checked = true;
  }, []);

  const axios = require("axios");
  const jwtToken = localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : "";

  function startPayment() {
    let paymentOption = document.querySelector("input[type='radio']:checked")
      .value;
    let data = {
      cid: "TC0ONETIME",
      itemList: [],
      totalAmount: totalPrice,
      totalCount: 0,
      isUser: 1,
    };
    
    let paymentMessage = document.querySelector("#paymentMsg").value.trim();
    if(paymentMessage == ''){
        paymentMessage = '든든하게 먹고다녀요'
    }

    let totalCount = 0;
    cartStorage.forEach((item) => {
      let oneItem = {
        itemCount: item.itemCount,
        itemId: item.itemId,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        storeId: item.storeId,
        support: 1,
        msg:paymentMessage,
      };
      totalCount += item.itemCount;
      data.itemList.push(oneItem);
    });
    data.totalCount = totalCount;

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

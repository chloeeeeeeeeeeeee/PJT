import { Col, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, useEffect } from "react";
import PaymentInfo from "../../components/payment/paymentInfo";

function Payment() {
  function sendDataToParent(price) {
    setTotalPrice(price);
  }

  let [totalPrice, setTotalPrice] = useState(
    localStorage.getItem("price")
      ? JSON.parse(localStorage.getItem("price"))
      : 0
  );

  useEffect(() => {
    document.querySelector("#kakaoPaySelect").checked = true;
  }, []);

  const axios = require("axios");

  function startPayment(){
      let paymentOption = document.querySelector("input[type='radio']:checked").value
      console.log(paymentOption)
      axios.post(`http://i4a102.p.ssafy.io:8080/app/payment/kakaopay`, {
        headers:{
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data:{
          "cid": "TC0ONETIME",
          "itemList": [
            {
              "itemCount": 1,
              "itemId": 11,
              "itemName": "로제정식",
              "itemPrice": 5000,
              "storeId": 1,
              "support": 1
            },
            {
              "itemCount": 1,
              "itemId": 6,
              "itemName": "상하이진한짬뽕",
              "itemPrice": 1500,
              "storeId": 1,
              "support": 1
            }
          ],
          "totalAmount": 6500,
          "totalCount": 2,
          "isUser": 0,
          "contributor": 
          {
            "contributorName": "송지은",
            "contributorGender": "W",
            "contributorBirth": "20210204",
            "contributorPhone": "010-0000-0000"
          }
        }
    }).then((res) => console.log(res))
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
        <Button className="paymentButton" color="primary" size="lg" block onClick={startPayment}>
          후원하기
        </Button>
      </Col>
    </Col>
  );
}

export default Payment;

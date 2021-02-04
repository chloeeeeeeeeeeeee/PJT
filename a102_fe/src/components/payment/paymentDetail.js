import { Col, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, useEffect } from "react";

function PaymentDetail() {

    let [totalPrice, setTotalPrice] = useState(
        localStorage.getItem("price")
          ? JSON.parse(localStorage.getItem("price"))
          : 0
      );

  return (
    <Col className="paymentDetailBox pt-2 pb-2" md="4" xs="12">
        <Col className="paymentAmount pb-4">
            <h3 className="text-left">총 후원 금액</h3>
            <h2 className="text-right">{totalPrice}원</h2>
        </Col>
        <hr/>
        <Col className="paymentMethod pt-4 pb-2">
            <h3>후원 방식 선택</h3>
            <FormGroup tag="fieldset" className="col">
                <FormGroup className="col mt-3">
                    <Label check>
                        <Input type="radio" name="selectPayment" />{' '}
                        카카오페이
                    </Label>
                </FormGroup>
                <FormGroup className="col">
                    <Label check>
                        <Input type="radio" name="selectPayment" />{' '}
                        네이버페이
                    </Label>
                </FormGroup>
                <FormGroup className="col">
                    <Label check>
                        <Input type="radio" name="selectPayment" />{' '}
                        신용/체크카드
                    </Label>
                </FormGroup>
            </FormGroup>            
        </Col>
        <hr />
        <Button className="paymentButton" block>후원하기</Button>
    </Col>
  );
}

export default PaymentDetail;

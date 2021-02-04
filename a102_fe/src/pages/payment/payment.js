import { Col, Table } from "reactstrap";
import { useState, useEffect } from "react";
import PaymentInfo from "../../components/payment/paymentInfo";
import PaymentDetail from "../../components/payment/paymentDetail";

function Payment() {

    useEffect(()=>{
        console.log("돌아라돌아라")
    })

  return (
    <Col className="paymentBox row">
      <h2 className="col-12 mb-0">결제하기</h2>
      <PaymentInfo></PaymentInfo>
      <PaymentDetail></PaymentDetail>
    </Col>
  );
}

export default Payment;

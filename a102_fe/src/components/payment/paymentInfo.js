import { Col, Row, Button } from "reactstrap";
import { useState, useEffect } from "react";

function PaymentInfo() {
  let [cartStorage, setCartStorage] = useState(
    localStorage.getItem("carts")
      ? JSON.parse(localStorage.getItem("carts"))
      : []
  );

  const cartItemList = cartStorage.map((cartItem, index) => {
    let imgurl = `http://i4a102.p.ssafy.io:8080/app/menus/1/${cartItem.itemName}.jpg`;
    return (
      <Row className="mt-2 paymentInfoItem justify-content-between" key={index}>
        <Row className="col-9 paymentMenuInfo">
          <img src={imgurl} className="d-inline-block col-3" />
          <div className="col-9 menuItemInfo pt-4 pb-4 pl-0 pr-0 row justify-content-start">
            <h3 className="col-8">{cartItem.itemName}</h3>
            <p className="col-4 text-right">{cartItem.itemPrice - 6000}원</p>
            <p className="col">
              현재 후원된 그릇 수 : {cartItem.itemAvailable}
            </p>
          </div>
        </Row>
        <Col xs="3" className="paymentMenuButtons row">
          <div className="col-9 row justify-content-around">
            <Button className="paymentCountButton col" color="primary">
              -
            </Button>
            <p className="paymentMenuCount col">{cartItem.itemCount}</p>
            <Button className="paymentCountButton col" color="primary">
              +
            </Button>
          </div>
          <div className="col-3 row justify-content-end">
            <Button className="paymentCountButton" color="danger">
              x
            </Button>
          </div>
        </Col>
      </Row>
    );
  });

  return (
    <Col className="paymentInfoBox pt-2 pb-2" md="8" xs="12">
      {cartItemList}
    </Col>
  );
}

export default PaymentInfo;

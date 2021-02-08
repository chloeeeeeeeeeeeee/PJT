import { Col, Row, Button } from "reactstrap";
import { useState, useEffect } from "react";

function PaymentInfo({sendDataToParent}) {
  let [cartStorage, setCartStorage] = useState(
    localStorage.getItem("carts")
      ? JSON.parse(localStorage.getItem("carts"))
      : []
  );
  let [totalPrice, setTotalPrice] = useState(
    localStorage.getItem("price")
      ? JSON.parse(localStorage.getItem("price"))
      : 0
  );
  let [trigger, setTrigger] = useState(false);

  function calculateTotal() {
    let total = 0;
    cartStorage.forEach((cartItem) => {
        if (cartItem.itemPrice > 6000){
            total += (cartItem.itemPrice - 6000) * cartItem.itemCount;
        }else{
            total += cartItem.itemPrice * cartItem.itemCount;
        }
      
    });
    setTotalPrice(total);
  }

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(cartStorage));
    localStorage.setItem("price", totalPrice);
    sendDataToParent(totalPrice)
  }, [trigger]);

  function minusMenu(menu) {
      if (menu.itemPrice > 6000){
        totalPrice -= (menu.itemPrice - 6000)
      }else{
        totalPrice -= menu.itemPrice
      }
      
      setTotalPrice(totalPrice)
    cartStorage.some((cartItem) => {
        if (cartItem.itemId == menu.itemId) {
          cartItem.itemCount -= 1;
          if (cartItem.itemCount <= 0) {
            cartStorage = cartStorage.filter((ele) => {
              return ele != cartItem;
            });
          }
        }
        return cartItem.itemId == menu.itemId;
      });
      setCartStorage(cartStorage);
      setTrigger(!trigger)
  }

  function plusMenu(menu) {
      if (menu.itemPrice > 6000){
        totalPrice += menu.itemPrice - 6000;
      }else{
          totalPrice += menu.itemPrice
      }
    
    setTotalPrice(totalPrice);
    cartStorage.some((cartItem) => {
      if (cartItem.itemId == menu.itemId) {
        cartItem.itemCount += 1;
      }
      return cartItem.itemId == menu.itemId;
    });
    setCartStorage(cartStorage);
    setTrigger(!trigger);
  }

  function deleteMenu(menu) {
    
    cartStorage = cartStorage.filter((ele) => {
        return ele != menu;
      });
      setCartStorage(cartStorage);
      calculateTotal()
      setTrigger(!trigger);
  }

  const cartItemList = cartStorage.map((cartItem, index) => {
    let imgurl = `http://i4a102.p.ssafy.io:8080/app/menus/1/${cartItem.itemName}.jpg`;
    return (
      <Row className="mt-2 paymentInfoItem justify-content-between" key={index}>
        <Row className="col-9 paymentMenuInfo">
          <img src={imgurl} className="d-inline-block col-3" />
          <div className="col-9 menuItemInfo pt-4 pb-4 pl-0 pr-0 row justify-content-start">
            <h3 className="col-8">{cartItem.itemName}</h3>
            <p className="col-4 text-right">{cartItem.itemPrice > 6000 ? cartItem.itemPrice - 6000 : cartItem.itemPrice}원</p>
            <p className="col">
              현재 후원된 그릇 수 : {cartItem.itemAvailable}
            </p>
          </div>
        </Row>
        <Col xs="3" className="paymentMenuButtons d-flex align-items-center">
          <Button
            className="paymentCountButton col-2"
            color="primary"
            onClick={(e) => minusMenu(cartItem)}
          >
            -
          </Button>
          <p className="paymentMenuCount col-2 m-0 text-center">
            {cartItem.itemCount}
          </p>
          <Button
            className="paymentCountButton col-2"
            color="primary"
            onClick={(e) => plusMenu(cartItem)}
          >
            +
          </Button>
          <Button
            className="paymentCountButton col-2 offset-4"
            color="danger"
            onClick={(e) => deleteMenu(cartItem)}
          >
            x
          </Button>
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

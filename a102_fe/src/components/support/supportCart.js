import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "reactstrap";
import { useParams } from "react-router-dom";
import SupportMenu from "../../components/support/supportMenu";

function SupportCart(storeInfo) {
  const storeId = storeInfo.storeInfo;

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
  let [menuList, setMenuList] = useState([]);
  let [trigger, setTrigger] = useState(false);
  const params = useParams();
  // 후원페이지인지 그냥 상세보기인지 확인용 변수
  let supportCheck = false;
  if (window.location.href.indexOf("storedetailsupport") > -1) {
    supportCheck = true;
  } else {
    supportCheck = false;
  }

  // 메뉴 정보 받아오기
  useEffect(() => {
    fetch(`http://i4a102.p.ssafy.io:8080/app/support/menulist/${storeId}`)
      .then((res) => res.json())
      .then((result) => {
        setMenuList(result);
      });
    // console.log(params.storeId)
  }, []);

  // 장바구니 업데이트
  useEffect(() => {
    console.log("CART CHANGE");
    localStorage.setItem("carts", JSON.stringify(cartStorage));
    localStorage.setItem("price", totalPrice);
  }, [trigger]);

  function calculateTotal() {
    let total = 0;
    cartStorage.forEach((cartItem) => {
      if (cartItem.itemPrice > 6000) {
        total += (cartItem.itemPrice - 6000) * cartItem.itemCount;
      } else {
        total += cartItem.itemPrice * cartItem.itemCount;
      }
    });
    setTotalPrice(total);
  }

  // 메뉴 더하기
  function addmenu(menu) {
    if (
      (cartStorage.length > 0 && cartStorage[0].storeId == storeId) ||
      cartStorage.length == 0
    ) {
      let sameItem = false;
      if (menu.itemPrice > 6000) {
        totalPrice += menu.itemPrice - 6000;
      } else {
        totalPrice += menu.itemPrice;
      }
      setTotalPrice(totalPrice);
      cartStorage.some((cartItem, index) => {
        if (cartItem.itemId == menu.itemId) {
          cartItem.itemCount += 1;
          sameItem = true;
        }
        return cartItem.itemId == menu.itemId;
      });
      if (sameItem) {
        setCartStorage(cartStorage);
      } else {
        menu.itemCount = 1;
        setCartStorage(cartStorage.concat([menu]));
      }
    } else {
      let checkCart = window.confirm(
        "다른 가게의 메뉴가 들어있습니다\n장바구니를 비우고 추가하겠습니까?"
      );
      if (checkCart) {
        menu.itemCount = 1;
        setCartStorage([menu]);
      } // 취소를 누르면 작업 없음
    }
    setTrigger(!trigger);
  }

  function plus(menu) {
    cartStorage.some((cartItem) => {
      if (cartItem.itemId == menu.itemId) {
        cartItem.itemCount += 1;
      }
      return cartItem.itemId == menu.itemId;
    });
    setCartStorage(cartStorage);
    calculateTotal();
    setTrigger(!trigger);
  }

  function minus(menu) {
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
    calculateTotal();
    setTrigger(!trigger);
  }

  function removemenu(menu) {
    cartStorage = cartStorage.filter((ele) => {
      return ele != menu;
    });
    setCartStorage(cartStorage);
    calculateTotal();
    setTrigger(!trigger);
  }

  function clearmenu() {
    setCartStorage([]);
    setTotalPrice(0);
    setTrigger(!trigger);
  }

  function moveToSupportPage() {
    window.location.href = `/storedetailsupport/${storeId}`;
  }

  function moveToPayment() {
    window.location.href = `/payment`;
  }

  let itemContributionTotal = 0;
  const supportCenterSide = menuList.map((menu, index) => {
    itemContributionTotal += menu.itemContributionAmount;
    if (menu.itemPrice > 6000) {
      return (
        <div
          className="storeMenuItem mb-2 row justify-content-between"
          key={index}
        >
          <SupportMenu supportmenu={menu} />
          {supportCheck ? (
            <Button
              color="secondary"
              className="helpButton col-2"
              onClick={(e) => {
                addmenu(menu);
              }}
            >
              메뉴 담기
            </Button>
          ) : (
            ""
          )}
        </div>
      );
    }
  });

  console.log(cartStorage);

  const supportRightSide = !supportCheck ? (
    <Card>
      <CardHeader>
        <h4>매장 후원현황</h4>
      </CardHeader>
      <CardBody className="storeStatusCard">
        <div className="storeStatus">
          <br />
          <h5>매장 누적 후원현황 : 76그릇</h5>
          <br />
          <h5>이번주 후원현황 : {itemContributionTotal}그릇</h5>
        </div>
        <Button
          color="secondary"
          className="helpButton"
          onClick={moveToSupportPage}
          block
        >
          후원하기
        </Button>
      </CardBody>
    </Card>
  ) : (
    <Card>
      <CardHeader>
        <h4>후원 바구니</h4>
      </CardHeader>
      <CardBody className="supportCartCard">
        {cartStorage.map((cart, index) => {
          return (
            <div className="supportCartItem" key={index}>
              <h5>
                {cart.itemName} : {cart.itemCount}개
              </h5>
              <Col xs="12 row justify-content-end m-0 p-0">
                <Button
                  color="secondary"
                  className="helpButton"
                  onClick={() => {
                    plus(cart);
                  }}
                >
                  +
                </Button>
                <Button
                  color="secondary"
                  className="helpButton"
                  onClick={() => {
                    minus(cart);
                  }}
                >
                  -
                </Button>
                <Button
                  color="secondary"
                  className="helpButton"
                  onClick={() => {
                    removemenu(cart);
                  }}
                >
                  X
                </Button>
              </Col>
            </div>
          );
        })}
      </CardBody>
      <CardFooter className="supportCartFooter">
        <h5> 총 후원 금액은 {totalPrice}원 입니다. </h5>
        <Button
          color="secondary"
          className="helpButton"
          block
          onClick={moveToPayment}
        >
          후원하기
        </Button>
        <Button
          color="secondary"
          className="helpButton"
          block
          onClick={(e) => {
            clearmenu();
          }}
        >
          바구니 비우기
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Col md="9" sm="12" className="row justify-content-around storeMenuDetail">
      <Col xs="8" className="storeCenterBox">
        <Card>
          <CardHeader>
            <h4>메뉴 목록</h4>
          </CardHeader>
          <CardBody className="storeMenuItemList">{supportCenterSide}</CardBody>
        </Card>
      </Col>
      <Col xs="4" className="storeRightBox">
        {supportRightSide}
      </Col>
    </Col>
  );
}

export default SupportCart;

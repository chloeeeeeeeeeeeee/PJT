import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "reactstrap";
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
  let [temp, setTemp] = useState(0);
  // 후원페이지인지 그냥 상세보기인지 확인용 변수
  let supportCheck = false;

  console.log(
    "자리자리자리" + window.location.href.indexOf("storedetailsupport")
  );
  if (window.location.href.indexOf("storedetailsupport") > -1) {
    supportCheck = true;
  } else {
    supportCheck = false;
  }

  useEffect(() => {
    fetch(`http://i4a102.p.ssafy.io:8080/app/support/menulist/${storeId}`)
      .then((res) => res.json())
      .then((result) => {
        setMenuList(result);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(cartStorage));
    localStorage.setItem("price", totalPrice);
    console.log(cartStorage);
    console.log(localStorage);
  });

  function addmenu(menu) {
    let flag = true;
    cartStorage.map((cart, index) => {
      if (cart["itemId"] === menu["itemId"]) {
        cart["itemCnt"]++;
        setCartStorage(cartStorage);
        flag = false;
        return;
      }
    });
    if (flag) {
      menu.itemCnt = 1;
      setCartStorage(cartStorage.concat([menu]));
    }
    setTemp(temp + 1);
    setTotalPrice(totalPrice + menu.itemPrice);
  }

  function plus(index) {
    console.log("plus");
    cartStorage[index]["itemCnt"]++;
    setCartStorage(cartStorage);
    setTotalPrice(totalPrice + cartStorage[index]["itemPrice"]);
    setTemp(temp + 1);
  }

  function minus(index) {
    console.log("minus");
    cartStorage[index]["itemCnt"]--;
    if (cartStorage[index]["itemCnt"] <= 0) {
      console.log("lets remove");
      setCartStorage(cartStorage.filter((element, idx) => idx !== index));
    } else {
      setCartStorage(cartStorage);
    }
    setTotalPrice(totalPrice - cartStorage[index]["itemPrice"]);
    setTemp(temp + 1);
  }

  function removemenu(index) {
    setCartStorage(cartStorage.filter((element, idx) => idx !== index));
    setTotalPrice(
      totalPrice -
        cartStorage[index]["itemPrice"] * cartStorage[index]["menu_cnt"]
    );
    setTemp(temp + 1);
  }

  function clearmenu() {
    setCartStorage([]);
    setTotalPrice(0);
  }

  function moveToSupportPage() {
    window.location.href = `/storedetailsupport/${storeId}`;
  }

  let itemContributionTotal = 0
  const supportCenterSide = menuList.map((menu, index) => {
    itemContributionTotal += menu.itemContributionAmount;
    if (supportCheck) {
      return (
        <div
          className="storeMenuItem mb-2 row justify-content-between"
          key={index}
        >
          <SupportMenu supportmenu={menu} />
          <Button
            color="secondary"
            className="helpButton col-2"
            onClick={(e) => {
              addmenu(menu);
            }}
          >
            메뉴 담기
          </Button>
        </div>
      );
    } else {
      return (
        <div
          className="storeMenuItem mb-2 row justify-content-between"
          key={index}
        >
          <SupportMenu supportmenu={menu} />
        </div>
      );
    }
  });

  console.log(supportCenterSide);

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
        <div className="supportCart">
          {cartStorage.map((cart, index) => (
            <div className="supportCartItem">
              <h5>
                {cart.itemName} : {cart.itemCnt}개
              </h5>
              <Button
                color="secondary"
                className="helpButton"
                onClick={() => {
                  plus(index);
                }}
              >
                +
              </Button>
              <Button
                color="secondary"
                className="helpButton"
                onClick={() => {
                  minus(index);
                }}
              >
                -
              </Button>
              <Button
                color="secondary"
                className="helpButton"
                onClick={() => {
                  removemenu(index);
                }}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter className="supportCartFooter">
        <h5> 총 금액은 {totalPrice} 입니다. </h5>
        <Button color="secondary" className="helpButton" block>
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
      <Col xs="4" className="storeRightBox">{supportRightSide}</Col>
    </Col>
  );
}

export default SupportCart;

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
  // let supportCheck = false;
  // if (window.location.href.indexOf("storedetailsupport") > -1) {
  //   supportCheck = true;
  // } else {
  //   supportCheck = false;
  // }

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
            <Button
              className="cartbutton col-2 mt-3 mb-3"
              onClick={(e) => {
                addmenu(menu);
              }}
            >
              담기
            </Button>
        </div>
      );
    }
  });

  return (
    <Col md="8" sm="12" className="row justify-content-around storeMenuDetail p-0 m-0">
      <Col md="7" xs="8" className="storeCenterBox">
        <Card>
          <CardHeader className="cardHeader">
            <h5 className="font-weight-bold mt-1">메뉴 목록</h5>
          </CardHeader>
          <CardBody className="storeMenuItemList">{supportCenterSide}</CardBody>
        </Card>
      </Col>
      <Col md="5" xs="4" className="storeRightBox">
        <Card>
        <CardHeader className="cardHeader">
          <h5 className="font-weight-bold mt-1">후원 바구니</h5>
        </CardHeader>
        <CardBody className="supportCartCard">
          {cartStorage.map((cart, index) => {
            return (
              <div className="supportCartItem" key={index}>
                <Col sm="7">
                  <p>{cart.itemName} : {cart.itemCount}개</p>
                </Col>
                <Col sm="5" className="controlbuttons row justify-content-end m-0 p-0">
                  {/* 왜 나오는거죠 얘네 왜 탈출..? */}
                  <Button
                    className="controlbutton"
                    onClick={() => {
                      plus(cart);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    className="controlbutton"
                    onClick={() => {
                      minus(cart);
                    }}
                  >
                    -
                  </Button>
                  <Button
                    className="controlbutton"
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
          <p> 총 후원 금액은 {totalPrice}원 입니다. </p>
          <Button
            className="footerbutton"
            block
            onClick={moveToPayment}
          >
            후원하기
          </Button>
          <Button
            className="footerbutton"
            block
            onClick={(e) => {
              clearmenu();
            }}
          >
            바구니 비우기
          </Button>
        </CardFooter>
      </Card>
    </Col>
  </Col>
  );
}

export default SupportCart;
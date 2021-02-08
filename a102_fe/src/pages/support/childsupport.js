import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { FcLike } from "react-icons/fc";

function ChildSupport() {
  // 네이버 API 통신을 위해 필요한 HEADER 세팅
  const axios = require("axios");
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-NCP-APIGW-API-KEY-ID": "e5vp42977m",
      "X-NCP-APIGW-API-KEY": "PpdYPMVeyXPnhSW33x2XKzw9tYGpsGhjKvdhIlMy",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // 카테고리
  const categoryList = [
    "한식",
    "양식",
    "제과점/카페",
    "기타",
    "중식",
    "마트/편의점",
    "패스트푸드",
    "일식",
    "치킨/피자",
  ];
  
  // 선택된 카테고리, 지도, 주소, 가게리스트 변수
  let [selectedCategory, setSelectedCategory] = useState(0);
  let [reloadMap, setReloadMap] = useState(true);
  let [address, setAddress] = useState("");
  let [storeList, setStoreList] = useState([]);

  // 카테고리 리스트 : (+색칠)
  const categoryListComponents = categoryList.map((category, index) => {
    if (index === 0) {
      return (
        <Col
          className="categoryListItem selectedCategoryListItem"
          key={index}
          onClick={(e) => {
            setSelectedCategory(index);
            if (!e.target.classList.contains("selectedCategoryListItem")) {
              document
                .getElementsByClassName("selectedCategoryListItem")[0]
                .classList.remove("selectedCategoryListItem");
              e.target.classList.add("selectedCategoryListItem");
            }
          }}
        >
          {category}
        </Col>
      );
    }
    return (
      <Col
        className="categoryListItem"
        key={index}
        onClick={(e) => {
          setSelectedCategory(index);
          if (!e.target.classList.contains("selectedCategoryListItem")) {
            document
              .getElementsByClassName("selectedCategoryListItem")[0]
              .classList.remove("selectedCategoryListItem");
            e.target.classList.add("selectedCategoryListItem");
          }
        }}
      >
        {category}
      </Col>
    );
  });

  // 전체 매장 리스트
  function setStoreListComponent() {
    if (address !== "") {
      fetch(
        `http://i4a102.p.ssafy.io:8080/app/main/mapview/storelist/${encodeURIComponent(
          address
        )}`
      )
      .then((res) => res.json())
      .then((result) => {
        storeList = result;
        setStoreList(storeList);
      });
    }
  }

  let mapScript = document.createElement("script");
  mapScript.type = "text/javascript";

  function successPosition(pos) {
    mapScript.append(
      `var mapOptions = {center: new naver.maps.LatLng(${pos.coords.latitude}, ${pos.coords.longitude}),zoom: 15,};var map = new naver.maps.Map('naverMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(${pos.coords.latitude}, ${pos.coords.longitude}),map: map,});`
    );
    axios
      .get(
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${pos.coords.longitude},${pos.coords.latitude}&orders=roadaddr&output=json`,
        config
      )
      .then((response) => {
        if (
          response.data.results[0] !== undefined &&
          response.data.results.length > 0
        ) {
          let tempData = response.data.results[0].region;
          address = `${tempData.area1.name} ${tempData.area2.name} ${tempData.area3.name} ${tempData.area4.name}`;
          setAddress(
            `${tempData.area1.name} ${tempData.area2.name} ${tempData.area3.name} ${tempData.area4.name}`
          );
        }
      })
      .catch((error) => console.log(error));
  }

  function failPosition(err) {
    setAddress("서울 강남구 역삼동");
    mapScript.append(
      `var mapOptions = {center: new naver.maps.LatLng(37.571075, 127.013588),zoom: 15,};var map = new naver.maps.Map('naverMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(37.571075, 127.013588),map: map,});`
    );
  }

  // 장소찾기
  function searchLocation() {
    address = document.getElementById("addressInput").value;
    setAddress(address);
  }

  // Enter키
  function enterkeyPress(event) {
    if (event.keyCode == 13) {
      searchLocation();
    }
  }

  useEffect(() => {
    if (address !== "") {
      // 입력 받은 주소 검색
      axios
        .get(
          `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`,
          config
        )
        .then((response) => {
          if (response.data.addresses[0] !== undefined) {
            mapScript.append(
              `var mapOptions = {center: new naver.maps.LatLng(${response.data.addresses[0].y}, ${response.data.addresses[0].x}),zoom: 15,};var map = new naver.maps.Map('naverMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(${response.data.addresses[0].y}, ${response.data.addresses[0].x}),map: map,});`
            );
            setReloadMap(!reloadMap);
          }
        })
        .catch((err) => console.log(err));

      document.body.appendChild(mapScript);
      setStoreListComponent();

      return () => {
        document.body.removeChild(mapScript);
      };
    } else {
      // 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition(successPosition, failPosition);
      document.body.appendChild(mapScript);
      setStoreListComponent();
      return () => {
        document.body.removeChild(mapScript);
      };
    }
  }, [address]);

  // 카테고리 변경
  let [storeListComponents, setStoreListComponents] = useState([]);
  
  useEffect(() => {
    if (storeList[selectedCategory + 1] !== undefined) {
      if (storeList[selectedCategory + 1].length > 0) {
        storeListComponents = storeList[selectedCategory + 1].map(
          (storeInfo, index) => {
            return <SupportMapItem storeInfo={storeInfo} key={index} />;
          }
        );
      } else{
          storeListComponents = (
            <Col className="nothingToShow">주변에 가게가 없습니다.</Col> );
        }
    }
    setStoreListComponents(storeListComponents);
  }, [selectedCategory, storeList]);

  // 후원된 음식 변수
  let [menuList, setMenuList] = useState([]);

  // 가게의 메뉴 리스트
  function SupportMapItem(storeInfo) {
    function getMenu(){
      fetch(`http://i4a102.p.ssafy.io:8080/app/support/menulist/${storeInfo.storeInfo.storeId}`)
        .then((res) => res.json())
        .then((result) => {
          setMenuList(result);
        });
    }
  
    return (
      <Row className="mapListItem m-1 p-1" onClick={getMenu}>
        <Col xs="7">{storeInfo.storeInfo.storeName}</Col>
        <Col xs="5">{storeInfo.storeInfo.storeCategory}</Col>
        <Col xs="12">{storeInfo.storeInfo.storeLocation}</Col>
      </Row>
    );
  }

  // 후원된 음식 반환
  const supportMenuList = menuList.map((menu, index) => {
    if (menu.itemAvailable > 0) {
      return (
        <Col xs="12">{menu.itemName} : {menu.itemAvailable} * <FcLike /></Col>
      );
    }
  });

  return (
    <Col className="mainSupport">
      {/* 지도 영역 타이틀 */}
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} className="supportTitle">
        <h2>가게 검색하기</h2>
        </Col>
      </Row>
      <Row className="supportContent">
        <Col sm="12" md={{ size: 4, offset: 1 }} className="supportContentLeft">
          {/* 검색 */}
          <InputGroup>
            <Input
              name="addressInput"
              id="addressInput"
              placeholder="동 단위까지 입력해주세요"
              onKeyUp={enterkeyPress}
            />
            <InputGroupAddon addonType="append">
              <Button
                id="addressButton"
                onClick={searchLocation}
              >
                검색
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {/* 지도 영역 */}
          <Col id="naverMap" className="mt-2 col-12"></Col>
        </Col>
        {/* 카테고리 리스트 */}
        <Col sm="6" md="2" className="categoryListBox">
          {categoryListComponents}
        </Col>
        <Col sm="6" md="4" className="supportBox">
          {/* 매장 리스트 */}
          <h5>가게 목록</h5>
          <Row className="storeListBox">
            {storeListComponents}
          </Row>
          {/* 후원 음식 리스트 */}
          <h5>음식 목록</h5>
          <Row className="storeSupportBox">
            <Row className="storeMenuItem mb-2 row justify-content-between">
              {supportMenuList}
            </Row>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default ChildSupport;

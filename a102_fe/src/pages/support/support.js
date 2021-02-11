import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import SupportMapItem from "../../components/support/supportMapItem";

function Support() {

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

  // 카테고리 리스트
  const categoryList = [
    "한식",
    "양식",
    "제과점\n카페",
    "기타",
    "중식",
    "마트\n편의점",
    "패스트푸드",
    "일식",
    "치킨\n피자",
  ];

  // 변수
  let [selectedCategory, setSelectedCategory] = useState(0);
  let [reloadMap, setReloadMap] = useState(true);
  let [address, setAddress] = useState("");
  let [storeList, setStoreList] = useState([]);

  // 카테고리 리스트 컴포넌트
  const categoryListComponents = categoryList.map((category, index) => {
    console.log(category)
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

  // 매장 리스트 가져와서 컴포넌트화
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

  // 장소 찾기
  function searchLocation() {
    address = document.getElementById("addressInput").value;
    setAddress(address);
  }

  //Input 박스 안에서 엔터키 입력
  function enterkeyPress(event) {
    // 엔터키
    if (event.keyCode == 13) {
      searchLocation();
    }
  }

  useEffect(() => {
    if (address !== "") {
      // 새로 받은 주소로 검색
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

  // 카테고리 변경시
  let [storeListComponents, setStoreListComponents] = useState([]);
  useEffect(() => {
    console.log("categoryChange");
    console.log(storeList[selectedCategory + 1]);
    if (storeList[selectedCategory + 1] !== undefined) {
      console.log(storeList[selectedCategory + 1].length);
      if (storeList[selectedCategory + 1].length > 0) {
        storeListComponents = storeList[selectedCategory + 1].map(
          (storeInfo, index) => {
              // storeInfo.supportCheck = supportCheck
            return <SupportMapItem storeInfo={storeInfo} key={index} />;
          }          
        );
      } else{
          storeListComponents = (
            <Col className="nothingToShow"><br/>주변 가게가 없습니다...</Col> )
        }
    }
    setStoreListComponents(storeListComponents)
    
  }, [selectedCategory, storeList]);

  return (
    <Col className="mainSupport">
    {/* 지도 영역 타이틀 */}
      <Row>
        <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
          <h3>후원하기</h3>
        </Col>
      </Row>
      <Row className="supportCategory">
        <Col sm="12" md={{ size:  3, offset: 1 }}>
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
              color="secondary"
              id="addressButton"
              onClick={searchLocation}
            >
              검색
            </Button>
          </InputGroupAddon>
        </InputGroup>
        </Col>
        {/* 카테고리 리스트 */}
        <Col sm="12" md="7" className="categoryListBox">
          {categoryListComponents}
        </Col>
      </Row>
      <Row className="supportContent">
        <Col sm="12" md={{ size: 4, offset: 1 }} className="supportContentLeft">
          {/* 지도 영역 */}
          <Col id="naverMap" className="mt-2 col-12"></Col>
        </Col>
        <Col sm="12" md="6" className="supportBox">
          {/* 매장 리스트 */}
          <h5>가게 목록</h5>
          <Row className="storeListBox">
            {storeListComponents}
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

export default Support;

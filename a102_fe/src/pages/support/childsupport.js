import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import greenPin from "../../assets/images/greenpin.png"
import { FcLike } from "react-icons/fc";

function ChildSupport() {
  // 네이버 API 통신을 위해 필요한 HEADER 세팅
  const axios = require("axios");

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
  
  // 선택된 카테고리 정보
  let [selectedCategory, setSelectedCategory] = useState(0);
  let [address, setAddress] = useState("");
  let [storeList, setStoreList] = useState([]);
  let naverMap = null;

  // 카테고리 리스트 : (+색칠)
  const categoryListComponents = categoryList.map((category, index) => {
    if (index === 0) {
      return (
        <Col
          className="categoryListItem selectedChildCategoryListItem"
          key={index}
          onClick={(e) => {
            setSelectedCategory(index);
            // selectedCategory = category;
            if (!e.target.classList.contains("selectedChildCategoryListItem")) {
              document
                .getElementsByClassName("selectedChildCategoryListItem")[0]
                .classList.remove("selectedChildCategoryListItem");
              e.target.classList.add("selectedChildCategoryListItem");
              //   changeComponents();
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
          // selectedCategory = category;
          if (!e.target.classList.contains("selectedChildCategoryListItem")) {
            document
              .getElementsByClassName("selectedChildCategoryListItem")[0]
              .classList.remove("selectedChildCategoryListItem");
            e.target.classList.add("selectedChildCategoryListItem");
            // changeComponents();
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
          `${
            process.env.REACT_APP_API_URL
          }/main/mapview/storelist/${encodeURIComponent(address)}`
        )
          .then((res) => res.json())
          .then((result) => {
            storeList = result;
            setStoreList(storeList);
            if (storeList.length > 0 && storeList[0].length > 0) {
              // 네이버 지도 객체 받아오기
              const { naver } = window;
              // 카카오 지도 객체 받아오기
              const { kakao } = window;
              // 주소-좌표 변환 객체를 생성합니다
              const geocoder = new kakao.maps.services.Geocoder();
  
              storeList[0].forEach((item) => {
                geocoder.addressSearch(
                  item.storeLocation,
                  function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                      let newMarker = new naver.maps.Marker({
                        map: naverMap,
                        position: new naver.maps.LatLng(result[0].y, result[0].x),
                        icon: greenPin,
                        zIndex: 100
                      });
                      var infoWindow = new naver.maps.InfoWindow({
                          content: '<div style="width:150px;text-align:center;padding:10px;"><b>'+ item.storeName +'</b>.</div>'
                      });
                      naver.maps.Event.addListener(newMarker, 'mouseover', ()=>{infoWindow.open(naverMap, newMarker)})
                      naver.maps.Event.addListener(newMarker, 'mouseout', ()=>{infoWindow.close()})
                      naver.maps.Event.addListener(newMarker, 'click', ()=>{fetch(`${process.env.REACT_APP_API_URL}/support/menulist/${item.storeId}`)
                      .then((res) => res.json())
                      .then((result) => {
                        setMenuList(result);
                      });})
                    }
                   
                  }
                );
              });
            }
          });
      }
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
      // 네이버 지도 객체 받아오기
    const { naver } = window;
    // 카카오 지도 객체 받아오기
    const { kakao } = window;

    // 네이버 지도 초기화
    function initMap(latitude, longitude) {
      naverMap = new naver.maps.Map("naverMap", {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 15,
      });
      let centerMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(latitude, longitude),
        map: naverMap,
      });
    }

    if (address !== "") {
      setStoreListComponent();
      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();
      // 현재 세팅돼있는 주소 -> 좌표 = 지도의 센터
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          initMap(result[0].y, result[0].x);
        } else {
          initMap(37.571075, 127.013588);
        }
      });
    } else {
      // 주소검색 안해서 현재 위치 기반 검색
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          //   initMap(pos.coords.latitude, pos.coords.longitude);
          // 주소-좌표 변환 객체를 생성합니다
          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.coord2RegionCode(
            pos.coords.longitude,
            pos.coords.latitude,
            function (result, status) {
              if (status == kakao.maps.services.Status.OK) {
                setAddress(result[0].address_name);
              }
            }
          );
          //   setMarkers(pos.coords.latitude, pos.coords.longitude);
        },
        function () {
          // 현재 위치 가져오기 실패시 기본 위치
          setAddress("서울시 종로구 창신동");
        }
      );
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
      fetch(`${process.env.REACT_APP_API_URL}/support/menulist/${storeInfo.storeInfo.storeId}`)
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
    let lst = []
    
    for (let idx=0; idx<menu.itemAvailable; idx++){
      lst.push(<FcLike key={idx}/>)
    }

    if (menu.itemAvailable > 0) {
      return (
        <Col xs="12" key={index}>{menu.itemName} : {lst} </Col>
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
        <Col sm="12" md={{ size: 4, offset: 1 }} className="supportChildContentLeft">
          {/* 검색 */}
          <InputGroup>
            <Input
              name="addressInput"
              id="addressInput"
              placeholder="'서울시 OO구 OO동'으로 입력해주세요"
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
          <Row className="storeChildListBox">
            {storeListComponents}
          </Row>
          {/* 후원 음식 리스트 */}
          <h5>음식 목록</h5>
          <Row className="storeChildSupportBox">
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

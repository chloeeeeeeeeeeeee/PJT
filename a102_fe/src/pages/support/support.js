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

  // 카테고리 리스트 일단 넣어두기
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
  let [markerList, setMarkerList] = useState([]);
  let naverMap = null;

  // 카테고리 리스트 컴포넌트
  const categoryListComponents = categoryList.map((category, index) => {
    if (index === 0) {
      return (
        <Col
          className="categoryListItem selectedCategoryListItem"
          key={index}
          onClick={(e) => {
            setSelectedCategory(index);
            // selectedCategory = category;
            if (!e.target.classList.contains("selectedCategoryListItem")) {
              document
                .getElementsByClassName("selectedCategoryListItem")[0]
                .classList.remove("selectedCategoryListItem");
              e.target.classList.add("selectedCategoryListItem");
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
          if (!e.target.classList.contains("selectedCategoryListItem")) {
            document
              .getElementsByClassName("selectedCategoryListItem")[0]
              .classList.remove("selectedCategoryListItem");
            e.target.classList.add("selectedCategoryListItem");
            // changeComponents();
          }
        }}
      >
        {category}
      </Col>
    );
  });

  // 매장 리스트 가져와서 컴포넌트화 + 마커 찍기
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
                    naver.maps.Event.addListener(newMarker, 'click', ()=>{window.location.href=`storedetailsupport/${item.storeId}`})
                  }
                 
                }
              );
            });
          }
        });
    }
  }

  // // 페이지 별로 다른 타이틀 부여
  // let supportCheck = false;
  // if (window.location.href.indexOf("support") > -1) {
  //   supportCheck = true;
  // } else if (window.location.href.indexOf("map") > -1) {
  //   supportCheck = false;
  // }

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
    // 마커 세팅
    function setMarkers(markerArr) {
      markerArr.forEach((location) => {});
      //   for (let i = 0; i < 5; i++) {
      //     let newMarker = new naver.maps.Marker({
      //       map: naverMap,
      //       position: new naver.maps.LatLng(
      //         latitude - i / 10000,
      //         longitude - i / 10000
      //       ),
      //     });
      //   }
    }

    // 주소 검색으로 새롭게 설정됨
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

      // 마커를 찍기위한 리스트
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

  //   let mapScript = document.createElement("script");
  //   mapScript.type = "text/javascript";

  //   function successPosition(pos) {
  //     mapScript.append(
  //       `var mapOptions = {center: new naver.maps.LatLng(${pos.coords.latitude}, ${pos.coords.longitude}),zoom: 15,};var map = new naver.maps.Map('naverMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(${pos.coords.latitude}, ${pos.coords.longitude}),map: map,});`
  //     );
  //     axios
  //       .get(
  //         `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${pos.coords.longitude},${pos.coords.latitude}&orders=roadaddr&output=json`,
  //         config
  //       )
  //       .then((response) => {
  //         if (
  //           response.data.results[0] !== undefined &&
  //           response.data.results.length > 0
  //         ) {
  //           let tempData = response.data.results[0].region;
  //           address = `${tempData.area1.name} ${tempData.area2.name} ${tempData.area3.name} ${tempData.area4.name}`;
  //           setAddress(
  //             `${tempData.area1.name} ${tempData.area2.name} ${tempData.area3.name} ${tempData.area4.name}`
  //           );
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   }

  //   function failPosition(err) {
  //     setAddress("서울 강남구 역삼동");
  //     mapScript.append(
  //       `var mapOptions = {center: new naver.maps.LatLng(37.571075, 127.013588),zoom: 15,};var map = new naver.maps.Map('naverMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(37.571075, 127.013588),map: map,});`
  //     );
  //   }

  //   useEffect(() => {
  //     if (address !== "") {
  //       // 새로 받은 주소로 검색
  //       axios
  //         .get(
  //           `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${address}`,
  //           config
  //         )
  //         .then((response) => {
  //           if (response.data.addresses[0] !== undefined) {
  //             mapScript.append(
  //               `var mapOptions = {center: new naver.maps.LatLng(${response.data.addresses[0].y}, ${response.data.addresses[0].x}),zoom: 15,};var map = new naver.maps.Map('naverMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(${response.data.addresses[0].y}, ${response.data.addresses[0].x}),map: map,});`
  //             );
  //             setReloadMap(!reloadMap);
  //           }
  //         })
  //         .catch((err) => console.log(err));

  //       document.body.appendChild(mapScript);
  //       setStoreListComponent();

  //       return () => {
  //         document.body.removeChild(mapScript);
  //       };
  //     } else {
  //       // 현재 위치 가져오기
  //       navigator.geolocation.getCurrentPosition(successPosition, failPosition);
  //       document.body.appendChild(mapScript);
  //       setStoreListComponent();
  //       return () => {
  //         document.body.removeChild(mapScript);
  //       };
  //     }
  //   }, [address]);

  // 카테고리 변경시
  let [storeListComponents, setStoreListComponents] = useState([]);
  useEffect(() => {
    if (storeList[selectedCategory + 1] !== undefined) {
      if (storeList[selectedCategory + 1].length > 0) {
        storeListComponents = storeList[selectedCategory + 1].map(
          (storeInfo, index) => {
            // storeInfo.supportCheck = supportCheck
            return <SupportMapItem storeInfo={storeInfo} key={index} />;
          }
        );
      } else {
        storeListComponents = (
          <Col className="nothingToShow">주변 가게가 없습니다...</Col>
        );
      }
    }
    setStoreListComponents(storeListComponents);
  }, [selectedCategory, storeList]);

  return (
    <Col className="mainSupport">
      {/* 지도 영역 타이틀 */}
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} className="supportTitle">
          <h2>후원하기</h2>
        </Col>
      </Row>
      <Row className="supportContent">
        <Col sm="12" md={{ size: 4, offset: 1 }} className="supportContentLeft">
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
                color="secondary"
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
          <Row className="storeListBox">{storeListComponents}</Row>
        </Col>
      </Row>
    </Col>
  );
}

export default Support;

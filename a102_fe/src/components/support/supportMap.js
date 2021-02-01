import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, NavbarToggler } from "reactstrap";

function SupportMap(locationInfoList, currentLocationInfo) {
  console.log("LOCATION!!!");
  console.log(locationInfoList);
  // <script>
  //   // 지도 관련 Script
  //   var mapOptions = {
  //       center: new naver.maps.LatLng(37.3595704, 127.105399),
  //       zoom: 15
  //   };

  //   var map = new naver.maps.Map('naverMap', mapOptions);
  //   </script>

  // 네이버 지도 스크립트 추가
  const script = document.createElement("script");

  script.src =
    "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=e5vp42977m";
  script.async = true;

  document.body.appendChild(script);

  let [start_lat, setLatitude] = useState(37.501451477019536);
  let [start_long, setLongitude] = useState(127.03967042677424);

  console.log(start_lat);

  const axios = require("axios");
  var config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-NCP-APIGW-API-KEY-ID": "e5vp42977m",
      "X-NCP-APIGW-API-KEY": "PpdYPMVeyXPnhSW33x2XKzw9tYGpsGhjKvdhIlMy",
      "Access-Control-Allow-Origin": "*",
    },
  };

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.type = "text/javascript";
    mapScript.async = true;

    mapScript.append(
      `var mapOptions = {center: new naver.maps.LatLng(${start_lat}, ${start_long}),zoom: 15,};var map = new naver.maps.Map('naverMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(${start_lat},
            ${start_long}
          ),
          map: map,
        });`
    );

    locationInfoList.locationInfoList.forEach((location, index) => {
      console.log("가게");
      console.log(location.storeLocation);
      axios
        .get(
          `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${location.storeLocation}`,
          config
        )
        .then((response) => {
          if (response.data.addresses[0] !== undefined) {
            mapScript.append(`var marker${index} = new naver.maps.Marker({position: new naver.maps.LatLng(${response.data.addresses[0].y},
                    ${response.data.addresses[0].x}
                  ),
                  map: map,
                });`);
          }
        })
        .then(() => {
          if (index + 1 == locationInfoList.locationInfoList.length) {
            document.getElementById("naverMap").appendChild(mapScript);
          }
        });
    });

    console.log(mapScript);
  });

  // fetch(
  //   `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=서울특별시 종로구 창신동 23-76`,
  //   {
  //     headers: geoHeaders,
  //   }
  // ).then(function (response) {
  //   console.log(response);
  // });

  return (
    <Row>
      <Input
        type="text"
        name="addressInput"
        id="addressInput"
        placeholder="주소 찾기"
        className="col-9"
      ></Input>
      <Button color="secondary" className="col-3" id="addressButton">
        검색
      </Button>
      {/* 지도 영역 */}
      <Col id="naverMap" className="mt-3"></Col>
    </Row>
  );
}

export default SupportMap;

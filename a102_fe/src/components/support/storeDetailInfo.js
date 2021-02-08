import { useEffect, useState } from "react";
import { Col, Card, CardHeader, CardBody, Button } from "reactstrap";

function StoreDetailInfo(storeInfo) {
  const axios = require("axios");
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-NCP-APIGW-API-KEY-ID": "e5vp42977m",
      "X-NCP-APIGW-API-KEY": "PpdYPMVeyXPnhSW33x2XKzw9tYGpsGhjKvdhIlMy",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // 앞에서 더 잘 보내게끔 수정 필요
  const storeId = storeInfo.storeInfo;

  // 일단 현재 위치로 세팅하지만 매장 위치로 변경 필요
  const mapScript = document.createElement("script");
  mapScript.type = "text/javascript";
  mapScript.async = true;

  let [storeInformation, setStoreInformation] = useState({});

  useEffect(() => {
    fetch(`http://i4a102.p.ssafy.io:8080/app/support/storedetail/${storeId}`)
      .then((res) => res.json())
      .then((result) => {
        setStoreInformation(result);
        axios
          .get(
            `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${result.storeLocation}`,
            config
          )
          .then((response) => {
            console.log(response);
            if (response.data.addresses[0] !== undefined) {
              mapScript.append(
                `var mapOptions = {center: new naver.maps.LatLng(${response.data.addresses[0].y}, ${response.data.addresses[0].x}),zoom: 15,};var map = new naver.maps.Map('storeMiniMap', mapOptions);var markers = new naver.maps.Marker({position: new naver.maps.LatLng(${response.data.addresses[0].y},
                          ${response.data.addresses[0].x}
                        ),
                        map: map,
                      });`
              );
              document.body.appendChild(mapScript);

              return (()=>{
                  document.body.removeChild(mapScript)
              })
            }
          });
      });
  }, []);

  return (
    <Col md="3" sm="12" className="storeInfo">
      <Card className="storeInfoCard">
        <CardHeader>
          <h2 className="font-weight-bold">{storeInformation.storeName}</h2>

          <h5 className="font-weight-normal mt-3">
            #{storeInformation.storeCategory}
          </h5>
        </CardHeader>
        <CardBody>
          <h5 className="font-weight-normal mt-4">
            {storeInformation.storeLocation}
          </h5>
          <h5 className="font-weight-normal mt-4">
            {storeInformation.storePhone}
          </h5>
          <p>아동급식카드의 1회 지원금은 6000원입니다.<br/>아동이 메뉴를 먹을 수 있게 차액을 후원해주세요.<br/>6000원 이하의 메뉴는 보여지지 않습니다.<br/>* 가게의 실 메뉴와 차이가 있을 수 있습니다</p>
          <div className="storeMiniMap mt-4" id="storeMiniMap"></div>
          <Button className="findWayButton" color="primary" block>
            길찾기
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
}

export default StoreDetailInfo;

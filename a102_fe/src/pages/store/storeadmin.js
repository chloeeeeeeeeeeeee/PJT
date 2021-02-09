// 여기에 메뉴 리스트 등등이 들어가겠지? 나는 여기에다가 delete를 만들 생각이야 그래서 푸쉬를 해보았어.
// 경로 설정은 안했고, 그냥 파일만 만들어봤어...! 본혁과의 충돌 원하지 않아!

import { useState, useEffect } from "react";
import { Col } from "reactstrap";
import StoreDetailInfo from "../../components/support/storeDetailInfo";
import StoreMenuList from "../../components/store/storeMenuList";

function StoreAdmin() {
  let [trigger, setTrigger] = useState(true);

  function sendTriggerToParent() {
    setTrigger(!trigger);
  }

  const jwtToken = localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : "";
  if (jwtToken === "") {
    window.location.href = "/auth";
  }

  let [storeDetailComponent, setStoreDetailComponent] = useState("");

  const axios = require("axios");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      token: jwtToken,
    },
  };

  useEffect(() => {
    axios
      .get(`http://i4a102.p.ssafy.io:8080/app/store/basicinfo`, config)
      .then((res) => {
        if (res.data !== undefined) {
          setStoreDetailComponent(
            <StoreDetailInfo storeInfo={res.data.storeId}></StoreDetailInfo>
          );
        }
      });
  }, [trigger]);

  return (
    <Col className="storeAdminContainer row">
      {storeDetailComponent}
      <StoreMenuList sendTriggerToParent={sendTriggerToParent}></StoreMenuList>
    </Col>
  );
}

export default StoreAdmin;

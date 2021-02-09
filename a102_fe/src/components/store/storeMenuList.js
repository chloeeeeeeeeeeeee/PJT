// 여기에 메뉴 리스트 등등이 들어가겠지? 나는 여기에다가 delete를 만들 생각이야 그래서 푸쉬를 해보았어.
// 경로 설정은 안했고, 그냥 파일만 만들어봤어...! 본혁과의 충돌 원하지 않아!

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import StoreMenuItem from "../store/storeMenuItem";

function StoreMenuList({ sendTriggerToParent }) {
  function moveToCreatePage() {
    window.location.href = "/menucreate";
  }
  const jwtToken = localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : "";
  if (jwtToken === "") {
    window.location.href = "/auth";
  }

  let [storeMenuItem, setStoreMenuItem] = useState("");

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
      .get(`http://i4a102.p.ssafy.io:8080/app/store/itemlist`, config)
      .then((res) => {
        console.log(res);
        if (res.data !== undefined) {
          console.log(res.data);
          setStoreMenuItem(
            res.data.map((item, index) => {
              return (
                <StoreMenuItem
                  storeMenu={item}
                  key={index}
                  sendTriggerToParent={sendTriggerToParent}
                ></StoreMenuItem>
              );
            })
          );
        }
      });
  }, []);

  return (
    <Card className="storeMenuList col-7 p-0">
      <CardHeader>
        <h4>메뉴 리스트</h4>
        <Button onClick={moveToCreatePage}>메뉴 추가</Button>
      </CardHeader>
      <CardBody>{storeMenuItem}</CardBody>
    </Card>
  );
}

export default StoreMenuList;

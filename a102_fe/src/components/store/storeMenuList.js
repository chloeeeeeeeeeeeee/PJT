import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import StoreMenuItem from "../store/storeMenuItem";

function StoreMenuList({ sendTriggerToParent }) {
  console.log("trigger is what?", sendTriggerToParent);

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
              if (index > 53){
              return (
                <StoreMenuItem
                  storeMenu={item}
                  key={index}
                  sendTriggerToParent={sendTriggerToParent}
                ></StoreMenuItem>
              );
              }
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
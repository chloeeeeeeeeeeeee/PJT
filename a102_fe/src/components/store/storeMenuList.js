import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Button } from "reactstrap";
import StoreMenuItem from "../store/storeMenuItem";

function StoreMenuList() {
  let [trigger, setTrigger] = useState(true);

  function sendTriggerToParent() {
    //   console.log("TRIGGER!!!!")
    setTrigger(!trigger);
  }

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
      .get(`${process.env.REACT_APP_API_URL}/store/itemlist`, config)
      .then((res) => {
        // console.log(res);
        if (res.data !== undefined) {
        //   console.log(res.data);
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
  }, [trigger]);

  return (
    <Card className="storeMenuList col-6 p-0">
      <CardHeader>
        <h4>메뉴 리스트</h4>
        <Button onClick={moveToCreatePage}>메뉴 추가</Button>
      </CardHeader>
      <CardBody>{storeMenuItem}</CardBody>
    </Card>
  );
}

export default StoreMenuList;

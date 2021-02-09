import { useEffect } from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";

function StoreSupportList() {
  const jwtToken = localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : "";
  if (jwtToken === "") {
    window.location.href = "/auth";
  }

  const axios = require("axios");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      token: jwtToken,
    }
  };

  useEffect(()=>{

  })

  return (
    <Card className="storeSupportListContainer">
      <CardHeader>
        <h4>실시간 후원현황</h4>
        <Button>후원 내역</Button>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}

export default StoreSupportList;

//http://localhost:3000/paymentCheck?pg_token=5fbcea82d900e48fb120

import { useEffect } from "react";

function KakaoPaymentCheck(props) {
  const pgToken = new URLSearchParams(props.location.search).get("pg_token");
  console.log(pgToken);

  const axios = require("axios");
  axios
    .get(
      `http://i4a102.p.ssafy.io:8080/app/payment/kakaopaySuccess?pg_token=${pgToken}`
    )
    .then((res) => {
      console.log(res);
      console.log(res.status);
      if (res.status == 200) {
        localStorage.setItem("carts", []);
        localStorage.setItem("price", 0);
        window.opener.location.href = "/paymentSuccess";
        window.close();
      }
    });

  return <div className="paymentCheckContainer">결제 진행 중...</div>;
}

export default KakaoPaymentCheck;

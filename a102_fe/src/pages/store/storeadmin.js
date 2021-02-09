// 여기에 메뉴 리스트 등등이 들어가겠지? 나는 여기에다가 delete를 만들 생각이야 그래서 푸쉬를 해보았어.
// 경로 설정은 안했고, 그냥 파일만 만들어봤어...! 본혁과의 충돌 원하지 않아!

import { useState, useEffect } from "react";
import { Col } from "reactstrap";
import StoreDetailInfo from "../../components/support/storeDetailInfo";

function StoreAdmin() {
  const jwtToken = localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : "";
  if (jwtToken === "") {
    window.location.href = "/auth";
  }

  let [storeDetailComponent, setStoreDetailComponent] = useState("");

  const axios = require("axios");
  const config = {};

  useEffect(() => {
    axios
      .get(`http://i4a102.p.ssafy.io:8080/app/store/basicinfo`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          token: jwtToken,
        },
      })
      .then((res) => {
        if (res.data !== undefined) {
          setStoreDetailComponent(
            <StoreDetailInfo storeInfo={res.data.storeId}></StoreDetailInfo>
          );
        }
      });
  });

  return <Col className="storeAdminContainer">{storeDetailComponent}</Col>;
}

export default StoreAdmin;

// update버튼 이렇게 만들어주세욜~!
// 주소에 id값이 같이 안와서 이렇게 해야... 내가 id를 빼다 쓸 수가 있어 흑흑
const Update = (event) => {
  event.preventDefault();
  window.history.pushState(menuitem, "아무 이름이나~!", "/menuupdate"); // menuitem : item객체명 바꿔주세욜!
  window.location.href = "/menuupdate";
};

// 되겠지... 될거얌 아마! ㅇㅅㅇ!
// post라 확인을 해볼수가 읎따..! ㅋㅋㅋㅋㅋㅋㅋㅋㅋ안되면 합쳐서 푸쉬해서 청구하세욜~!
const Delete = (event) => {
  event.preventDefault();
  if (
    window.confirm(
      "정말로 상품을 삭제하시겠습니까? \n삭제된 상품을 복구 할 수 없습니다."
    )
  ) {
    fetch(`http://i4a102.p.ssafy.io:8080/app/qna/delete/${menuitem.itemId}`, {
      // menuitem : item객체명 바꿔주세욜!
      method: "POST",
      headers: {
        token: localStorage.getItem("access-token"),
      },
    }).then((res) => {
      if (res.status === 200) {
        alert("삭제 성공");
      } else {
        alert("실패! 바보 메롱~!~!");
      }
    });
  }
};

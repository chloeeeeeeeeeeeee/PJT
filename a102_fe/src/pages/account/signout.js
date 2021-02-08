import React from "react";
import {
  Container,
  Row,
} from "reactstrap";
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect,
} from "react-router-dom";


function Signout() {
  return (
    // Signout 버튼을 클릭하면 우선 로컬스토리지에서 access-token을 해제합니다.
    localStorage.removeItem('access-token'),

    // 로그아웃되었다고 알려주고,
    alert("로그아웃되었습니다"),

    // 성공적으로 로그아웃되었습니다 대신 URL을 리다이렉트 해주고 싶다!
    window.location.href = '/'
  );
}

export default Signout;
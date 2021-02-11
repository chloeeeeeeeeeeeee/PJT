import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const { naver } = window; 


function NaverAuthCallback() {
  useEffect(() => {
    myFunction();
    getNaverToken();
    UserProfile();
  });
  // const myToken = window.location.href
  // alert("여기서는?", myToken)

  // const myLocation = useLocation();
  // alert("리액트를 믿어보자:", myLocation)
  
  function myFunction() {
    const myToken = window.location.href
    const location = window.location.href.split('=')[1];
    const token = location.split('&')[0];    
    alert("제발 돼라:", myToken)
    alert("이거라도:", window.location.href)
    alert("제발 제발 보여주세요:", token)
  }
  

  const location = useLocation();  

  const getNaverToken = () => { 
    alert("겟네이버토큰 실행")
    if (!location.hash) return;
    const Navertoken = location.hash.split('=')[1].split('&')[0];
    alert("네이버 로그인 접근 토큰:", Navertoken);
  };

  const UserProfile = () => {
    console.info("유저프로파일 받아오기")
    window.location.href.includes('access_token') && GetUser();
    function GetUser() {
      const location = window.location.href.split('=')[1];
      const token = location.split('&')[0];
      alert("네이버token: ", token);
    }
  };

  return (
    <div id="naverIdLogin"
    ></div>
  );
}

export default NaverAuthCallback;

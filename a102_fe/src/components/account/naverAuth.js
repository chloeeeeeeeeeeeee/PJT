import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const { naver } = window; 


function NaverAuth() {
  useEffect((event) => {
    NaverLogin();
    // myFunction();
    // UserProfile();
    // getNaverToken();
  });

  function NaverLogin() {
    const naverLogin = new naver.LoginWithNaverId(
      {
        clientId: "xndTfTxd5lBs6cntAlPE",
        callbackUrl: "http://localhost:3000/naver",
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        loginButton: {color: "green", type: 3, height: 36}, /* 로그인 버튼의 타입을 지정 */
        callbackHandle: false
      }
      );
      
      /* 설정정보를 초기화하고 연동을 준비 */
      naverLogin.init();  
  };

  // function NaverAuthCallback() {
  //   useEffect(() => {
  //     console.info("찍어볼게요");
  //     myFunction();
  //   });
    
  //   function myFunction() {
  //     const location = window.location.href.split('=')[1];
  //     const token = location.split('&')[0];    
  //     console.log("예린의 예언:", token)
  //     fetch(`${process.env.REACT_APP_API_URL}/account/signinnaver`, {
  //       method: "POST",
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(token)
  //     })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.info("loginWithNaver 함수 성공한 경우 자동 로그인:", res)
  //       console.info("loginWithNaver 함수 성공한 경우 자동 로그인:", res.token)
  //       localStorage.setItem('access-token', res.token)
  //       window.location.href = '/profile'
  //     })
  
  
  //   }  
  // }          

  return (
    <div id="naverIdLogin"
      // onClick={(event) => NaverAuthCallback(event)}
    ></div>
  );
}

export default NaverAuth;

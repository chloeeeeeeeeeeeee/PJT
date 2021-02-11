import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const { naver } = window; 


function NaverAuth() {
  useEffect((event) => {
    NaverLogin();
    // UserProfile();
    // getNaverToken();
  });

  function NaverLogin() {
    const naverLogin = new naver.LoginWithNaverId(
      {
        clientId: "xndTfTxd5lBs6cntAlPE",
        callbackUrl: "http://localhost:3000/naver",
        isPopup: true, /* 팝업을 통한 연동처리 여부 */
        loginButton: {color: "green", type: 3, height: 36}, /* 로그인 버튼의 타입을 지정 */
        callbackHandle: false
      }
      );
      
      /* 설정정보를 초기화하고 연동을 준비 */
      naverLogin.init();
      
  };

  
  const LoginWithNaver =() => {
    // const UserProfile = () => {
  
    //   // window.location.href.includes('access_token') && GetUser();
    //   function GetUser() {
    //     const location = window.location.href.split('=')[1];
    //     const token = location.split('&')[0];
    //     alert("네이버token: ", token);
    //   }
    // };
    
    // 네아로 연동 결과 받아지는 콜백 URL은:
    // https://nid.naver.com/oauth2.0/authorize?response_type=token&state=95bbb114-ef7f-48bb-ab68-16bf8ec292c3&redirect_uri=http%3A%2F%2Flocalhost%3A3000&client_id=xndTfTxd5lBs6cntAlPE&oauth_os=&inapp_view=&locale=ko_KR&oauth_token=0l2WISf5oE5Yr1Usab
    // 위 주소로 보내진 다음 다시 가져온 URL인 이게 맞는거같아 : 
    // http://localhost:3000/#access_token=AAAAOUfWfgcUdaj2UtmvQKlXyQlzgYkQ2YYYP4goXqCmpKhvHl_AE1BxOeMu5zHbFTHQaFm5Nuf3cqK2Tuci9a6W4kk&state=95bbb114-ef7f-48bb-ab68-16bf8ec292c3&token_type=bearer&expires_in=3600
    
    // 그럼 저 URL에서 액세스 토큰만 받아보면?
    // AAAAOUfWfgcUdaj2UtmvQKlXyQlzgYkQ2YYYP4goXqCmpKhvHl_AE1BxOeMu5zHbFTHQaFm5Nuf3cqK2Tuci9a6W4kk
    // 해당 액세스 토큰을 다시 네이버 API에 요청하여 사용자 프로파일을 받아올 수 있따!

    const NaverToken = localStorage.getItem('com.naver.nid.oauth.state_token')
    
    alert(NaverToken)
    
    fetch(`http://i4a102.p.ssafy.io:8080/app/account/signinnaver`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: "naver@"+NaverToken,
        userName: NaverToken,
        userPhone: NaverToken,
        userEmail: NaverToken,
        userPwd: NaverToken
      })
    })
    .then(res => res.json())
    .then(res => {
      console.info("loginWithNaver 함수 성공한 경우 자동 로그인:", res)
      console.info("loginWithNaver 함수 성공한 경우 자동 로그인:", res.token)
      localStorage.setItem('access-token', res.token)
      window.location.href = '/profile'
    })
  }
          

  return (
    <div id="naverIdLogin"
      onClick={(event) => LoginWithNaver(event)}
    ></div>
  );
}

export default NaverAuth;

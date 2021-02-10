// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
//     <title>Login Demo - Kakao JavaScript SDK</title>
//     <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>

// </head>
// <body>
//     <a id="kakao-login-btn"></a>
//     <a href="http://developers.kakao.com/logout"></a>
//     <script type='text/javascript'>
//         //<![CDATA[
//         // 사용할 앱의 JavaScript 키를 설정해 주세요.
//         Kakao.init('dc6a2c589be6aae4a0e060ff22247ebf');
//         // 카카오 로그인 버튼을 생성합니다.
        
//         Kakao.Auth.createLoginButton({
//             container: '#kakao-login-btn',
//             success: function (authObj) {
//                 //alert(JSON.stringify(authObj));
//                 //alert(JSON.stringify(authObj));
//                 Kakao.API.request({
//                     url: '/v2/user/me',
//                     success: function (response) {
//                         console.log(response.id);
//                         const id = response.id;
//                         console.log("kakao@"+id);
                        
//                         fetch(`/account/signinkakao`, {
//                             method: "POST",
//                                headers: {
//                                  'Content-Type': 'application/json'
//                                },
//                                body: JSON.stringify({
//                                    userId: id
//                                })
//                            })
//                            .then(res => res.json())
//                         .then(res => {
//                           console.info("Signup 함수 성공한 경우 자동 로그인:", res)
//                           //localStorage.setItem('access-token', res.token)
//                         })
//                         //alert(JSON.stringify(response));
//                     },
//                     fail: function (err) {
//                         console.log(err);
//                         //alert(JSON.stringify(err));
//                     }
//                 });
//             },
//             fail: function (err) {
//                 alert(JSON.stringify(err));
//             }
//         });
        
//       //]]>
//     </script>
// </body>
// </html>

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

// import Kakao from "kakaojs";
const { Kakao } = window; 

function KakaoAuth() {
  function loginWithKakao() {
    Kakao.Auth.login({
      success: function(authObj) {
        // alert(JSON.stringify(authObj))
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
            console.log(response.id);
            fetch(`http://i4a102.p.ssafy.io:8080/app/account/signinkakao`, {
              method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: response.id,
                  // userName: "kakao@"+response.id,
                  // userPhone: "kakao@"+response.id,
                  // userEmail: "kakao@"+response.id
                })
              })
            .then(res => res.json())
            .then(res => {
              console.info("loginWithKakao 함수 성공한 경우 자동 로그인:", res)
              localStorage.setItem('access-token', res.token)
            })
          },
        })
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      },
    })
  }
  return (
    // <a id="custom-login-btn" href="javascript:loginWithKakao()">
    // 원래는 위와 같은 형태였는데, onclick으로 바꿔보겠습니다. 
    <a id="custom-login-btn"
      onClick={() => loginWithKakao()}
      >
      <img
        src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
        height="36px"
      />
    </a>
  //   Kakao.Auth.createLoginButton({
  //     container: '#kakao-login-btn',
  //     success: function (authObj) {
  //         //alert(JSON.stringify(authObj));
  //         //alert(JSON.stringify(authObj));
  //         Kakao.API.request({
  //             url: '/v2/user/me',
  //             success: function (response) {
  //                 console.log(response.id);
  //                 const id = response.id;
  //                 console.log("kakao@"+id);
                  
  //                 fetch(`/account/signinkakao`, {
  //                     method: "POST",
  //                        headers: {
  //                          'Content-Type': 'application/json'
  //                        },
  //                        body: JSON.stringify({
  //                            userId: id
  //                        })
  //                    })
  //                    .then(res => res.json())
  //                 .then(res => {
  //                   console.info("Signup 함수 성공한 경우 자동 로그인:", res)
  //                   //localStorage.setItem('access-token', res.token)
  //                 })
  //                 //alert(JSON.stringify(response));
  //             },
  //             fail: function (err) {
  //                 console.log(err);
  //                 //alert(JSON.stringify(err));
  //             }
  //         });
  //     },
  //     fail: function (err) {
  //         alert(JSON.stringify(err));
  //     }
  // })
  );
}

export default KakaoAuth;
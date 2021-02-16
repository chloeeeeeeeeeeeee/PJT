import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import {
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import axios from 'axios';

// Register 대신 Auth로 rename 하고 Register와 Signin으로 분리해보겠습니다!
// 분리할 수 없었습니다! 왜인지 이유를 알아볼 것! 
import KakaoAuth from "../../components/account/kakaoAuth";
import NaverAuth from "../../components/account/naverAuth";
import NaverAuthButton from "../../assets/images/naverAuth/NaverLoginButton.png";

function Auth(props) {
  const toggleform = () => {
    document.querySelector(".cont").classList.toggle("s--signup");
    // NaverLogin();
  };

  const NaverAuthClick = (event) => {
    event.preventDefault();
    alert("제발");
    document.getElementById("naverIdLogin_loginButton").click();
    }; 
  
  // 로그인 파트, 마찬가지로 useState를 이용하여 자료로 받았습니다.
  // 마찬가지로 user_id, user_pwd로 잡아줍시다!
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const Signin = (event) => {
    event.preventDefault();
    // console.log("로그인 아이디:", loginId);
    // console.log("로그인 비밀번호:", loginPassword);
    // fetch(`${process.env.PUBLIC_URL}/account/signinjwt`, {
    fetch(`${process.env.REACT_APP_API_URL}/account/signinjwt`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: loginId,
        userPwd: loginPassword
      })
    })
    .then(res => res.json())
    .then(res => {
    //   console.info("Signin 함수에서 받아온 JWT 응답:", res)
    //   console.info("Signin 함수에서 받아온 JWT 응답:", res.token)
      // 여기도 분기 걸어서 로그인 에러 처리 
      localStorage.setItem('access-token', res["token"])
      // <Redirect to="http://localhost:3000/#/"/>
    //   console.log("결과적으로는: ", localStorage.getItem('access-token'))
      fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
        headers: {
          token: localStorage.getItem('access-token')
        }
      })
      .then(res => res.json())
      .then(res =>{
        ( res.store ) ? ( window.location.href = '/storeadmin' ) : ( window.location.href = '/profile' )
      } 
      )  
    })
    .catch(error =>
      alert("아이디와 비밀번호를 확인해주세요!")
    )
  };

  // 회원가입 파트
  // useState를 이용하여 입력된 form 안의 내용물들을 각각의 자료로 받는다. 
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkid, setCheckid] = useState(false);
  
  // 이제 이걸 user_id, user_name 등으로 연결해줘야해요!
  const Signup = (event) => {
    event.preventDefault();
    if (checkid === false) {
      alert("중복 확인을 해주세요!")
    // } else if ( name !== "" && phone !== "" && email !== "") {
    } else if (Boolean(name) === false || Boolean(phone) === false || Boolean(email) === false) {
      alert("정보를 빠짐없이 채워주세요!")
    } else { 
      // fetch(`${process.env.PUBLIC_URL}/account/signup`, {
      fetch(`${process.env.REACT_APP_API_URL}/account/signup`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: id,
          userName: name,
          userPhone: phone,
          userEmail: email,
          userPwd: password
          // DATE를 자동으로 넣어줄게요! 
          // userDate: "2021-11-11",
        })
      })
      // .then(res => res.json())
      .then(res => {
        // 받아진 응답을 확인합시다! 이 응답은 httpOK이거나 아닐 예정입니다. 이 안에서 if로 분기를 나눠볼게요! 
        // console.log("Signup의 응답은:", res)
        // res가 NULL이거나 badrequest 인 경우 에러메시지 출력 대비
        // 정상적으로 OK 받는다면 : 방금 입력받은 유저 정보를 다시 보내서 JWT를 받아오자! 자동 로그인 파트
        if (res.status === 200 || res.status === 201) {
          // fetch(`${process.env.PUBLIC_URL}/account/signinjwt`), {
          fetch(`${process.env.REACT_APP_API_URL}/account/signinjwt`, {
            method: "POST",
            headers:{
              'Content-Type': 'application/json'
            },   
            body: JSON.stringify({
              userId: id,
              userPwd: password,
            })
          })
          .then(res => res.json())
          .then(res => {
            // console.info("Signup 함수 성공한 경우 자동 로그인:", res)
            localStorage.setItem('access-token', res.token)
          })
        } else {
          // 회원가입이 실패한 경우인데, 어떤 경우가 있을까요? 같이 에러처리 합시다
        //   console.error("회원가입이 실패한 경우:", res)
        }
      })
    }
    // 회원가입 후 바로 로그인을 실행했다면? 
    if (Boolean(localStorage.getItem('access-token')) == true && localStorage.getItem('access-token') != "undefined") {

      //storeId일 경우에는?
      fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
        headers: {
          token: localStorage.getItem('access-token')
        }
      })
      .then(res => res.json())
      .then(res =>
        ( res.store ) ? ( window.location.href = '/storeadmin' ) : ( window.location.href = '/profile' )        
      )  
    }
  };

  const Checkid = () => {
    // (id == "") ? alert("아이디를 입력해주세요") : Checkid()}
    fetch(`${process.env.REACT_APP_API_URL}/account/userdupli`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id,
      })
    })
    .then(res => {
      if (res.status === 200) {
        // console.log("중복확인:", res),
        alert("사용 가능한 아이디입니다")
        setCheckid(true)
      } else {
        // console.log("중복확인 에러:", res),
        alert("이미 존재하는 아이디입니다")
      }
    })
  };

  return (
    <div className="mainAuth">
    <div className="page-wrapper">
      <Container fluid={true} className="authentication-wrapper p-0">
        {/* <!-- login page start--> */}
        <div className="authentication-main">
          <Row className="authentication-body">
            <Col md="12">
              <div className="auth-innerright">
                <div className="authentication-box">
                  <CardBody>
                    <div className="cont text-center !s--signup">
                      <div>
                        <Form className="theme-form">
                          <h4>로그인</h4>
                          {/* <h6>아이디와 비밀번호를 입력해 주세요</h6> */}
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              아이디
                            </Label>
                            <Input
                              className="form-control"
                              type="text"
                              name="loginid"
                              value={loginId}
                              onChange={(e) => setLoginId(e.target.value)}
                              placeholder="아이디를 입력하세요"
                              // 필수인자 받아볼것!
                              required
                              // className="btn-pill"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">비밀번호</Label>
                            <Input
                              className="form-control"
                              type="password"
                              name="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="비밀번호를 입력하세요"
                              required
                              // className="btn-pill"
                            />
                          </FormGroup>
                          <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label for="checkbox1">정보 기억하기</Label>
                          </div>
                          <FormGroup className="form-row mt-3 mb-0">
                            <Button 
                              color="warning btn-block"
                              onClick={(event) => Signin(event)}
                            >
                              로그인
                            </Button>
                          </FormGroup>
                          <div className="login-divider"></div>
                          <div className="social mt-3">
                            <Row form className="btn-showcase">
                              <Col md="6" sm="6">
                                <KakaoAuth />
                                {/* <Button
                                  color="social-btn btn-kakao"
                                  // social-btn은 _forms.scss에서 찾을 수 있다!
                                  // onClick={facebookAuth}
                                >
                                  카카오로 로그인하기
                                </Button> */}
                              </Col>
                              <Col md="6" sm="6">
                                <NaverAuth />
                                {/* <div id="naverIdLogin">
                                </div> */}
                              </Col>
                            </Row>
                          </div>
                        </Form>
                      </div>
                      <div className="sub-cont">
                        <div className="img">
                          <div className="img__text m--up">
                            <h4>회원가입을 하시고</h4>
                            <p> </p>
                            <p>
                              아이들에게
                            </p>
                            <p>
                              따뜻한 한 끼를 나눠주세요
                            </p>
                          </div>
                          <div className="img__text m--in">
                            <h4>이미 회원이시라면</h4>
                            <p> </p>
                            <p>
                              로그인 하시고
                            </p>
                            <p>
                              내 후원 내역을 확인하세요
                            </p>
                          </div>
                          <div className="img__btn" onClick={toggleform}>
                            <span className="m--up">회원가입</span>
                            <span className="m--in">로그인</span>
                          </div>
                        </div>
                        <div>
                          <Form className="theme-form">
                            <h4 className="text-center">회원가입</h4>
                            {/* <h6 className="text-center">
                              회원가입해주세요
                            </h6> */}
                            <Row form>
                              <Col md="9">
                                <FormGroup>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    name="id"
                                    value={id}
                                    onChange={(e) => {setId(e.target.value); setCheckid(false);}
                                    }
                                    placeholder="아이디를 입력하세요"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <Button
                                  // setId가 되지 않아서 id의 상태가 ""일 경우에는 클릭해도 오류가 뜨도록 분기를 생성해보자
                                  onClick={() => 
                                    (id == "") ? alert("아이디를 입력해주세요") : Checkid()}
                                >
                                  중복확인
                                </Button>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="이름을 입력하세요"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="form-control"
                                    type="text"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="전화번호를 숫자로만 입력하세요(01012341234)"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Input
                                className="form-control"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요"
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Input
                                className="form-control"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                                required
                              />
                            </FormGroup>
                            <FormGroup className="form-row mt-3 mb-0">
                              <Button color="primary btn-block"
                                color="warning btn-block"
                                onClick={(event) => {Signup(event)}}                              
                              > 
                              회원가입
                              </Button>
                            </FormGroup>
                            {/* <Row form>
                              <Col sm="8">
                                <div className="text-left mt-2 m-l-20">
                                  Are you already user? 
                                  <a
                                    className="btn-link text-capitalize"
                                    href="login.html"
                                  >
                                    Login
                                  </a>
                                </div>
                              </Col>
                            </Row> */}
                            <div className="form-divider"></div>
                            <div className="social mt-3">
                            <Row form className="btn-showcase">
                              <Col md="6" sm="6">
                                <KakaoAuth />
                                {/* <Button
                                  color="social-btn btn-kakao"
                                  // social-btn은 _forms.scss에서 찾을 수 있다!
                                  // onClick={facebookAuth}
                                >
                                  카카오로 가입하기
                                </Button> */}
                              </Col>
                              <Col md="6" sm="6">
                                <div id="naverIdLogin">
                                  <img
                                    // id="naverIdLogin"
                                    src={ NaverAuthButton } 
                                    className="naverAuthBtn"
                                    onClick={(event) => NaverAuthClick(event)}
                                  />                                  
                                </div>
                              </Col>
                            </Row>
                          </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <!-- login page end--> */}
      </Container>
    </div>
    </div>
  );
};

export default Auth;

import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Timeline from "../../components/account/timeline";
import MemberWithUs from "../../components/account/memberWithUs";
// import MemberInfo from "../../components/account/memberInfo";
import MemberQnA from "../../components/account/memberQnA";

function Profile() {
  // if JWT가 존재하지 않을 경우 auth로 리다이렉트 하면서 return을 띄우지 않음
  // 존재 할 경우에만 return으로 넘겨주는 방식
  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserInfo(res);
      // console.log(res.store)
      // console.log("지금 받아올 내용은:", res)
      // console.log("실제로 받은 내용은:", userInfo) 
    })
  }, [])

  return (
    <Col className="mainProfile">
    {/* 프로필 영역 타이틀 */}
      <Row>
        <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
          <h3 className="col-8 d-inline"> { userInfo.userName }님의 따뜻한 마음</h3>
          <div className="col-4 d-inline">
            <Button 
              className="profileHeaderButton"
              onClick={() => (alert("실명 인증을 준비중입니다"))}
            >
              기부영수증 발급
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="profileHeader">
        <Col sm="12" md={{ size:  10, offset: 1 }}>
          <MemberWithUs />
        </Col>
      </Row>
      <Row sm="12" md={{ size: 10, offset: 1 }} className="profileContent">
        <Col sm="12" md={{ size: 3, offset: 1 }} className="profileInfo">
        </Col>
        <Col sm="12" md={{ size: 7 }} className="profileTimeline">
          <Timeline />
        </Col>
      </Row>
    </Col>
  );

  // return (
  //     <Container fluid={true} className="division">
  //         <Row className="division-wrapper">
  //           <Col sm="3" className="left-division">
  //             <Row className="left-upper-division">
  //               <MemberWithUs/> 
  //             </Row>
  //             <Row className="left-lower-division">
  //               <MemberQnA/>
  //             </Row>
  //           </Col>
  //           <Col sm="9" className="central-division">
  //             <div className="card central-division-title">
  //               나의 따뜻한 마음
  //             </div>
  //             <div className="central-division-content">  
  //              <Timeline/>
  //             </div>
  //           </Col>
  //           {/* <Col sm="3" className="right-division">
  //             오른쪽 영역
  //             <Row>
                
  //             </Row>
  //           </Col> */}
  //         </Row>
  //     </Container>
  // );
}

export default Profile;
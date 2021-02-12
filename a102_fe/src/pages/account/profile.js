import React from "react";
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


  return (
    <Col className="mainProfile">
    {/* 프로필 영역 타이틀 */}
      <Row>
        <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
          <h3>내 후원 정보</h3>
        </Col>
      </Row>
      {/* <Row className="supportCategory"> */}
      <Row className="profileHeader">
        <Col sm="12" md={{ size:  3, offset: 1 }}>
        {/* 검색 */}
        <InputGroup>
          <Input
            // name="addressInput"
            // id="addressInput"
            // placeholder="동 단위까지 입력해주세요"
            // onKeyUp={enterkeyPress}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="secondary"
              id="addressButton"
              // onClick={searchLocation}
            >
              검색
            </Button>
          </InputGroupAddon>
        </InputGroup>
        </Col>
        {/* 카테고리 리스트 */}
        <Col sm="12" md="7" className="categoryListBox">
          {/* {categoryListComponents} */}
        </Col>
      </Row>
      <Row className="profileContent">
        <Col sm="12" md={{ size: 4, offset: 1 }} className="profileContentLeft">
          {/* 지도 영역 */}
          <Col id="naverMap" className="mt-2 col-12"></Col>
        </Col>
        <Col sm="12" md="6" className="supportBox">
          {/* 매장 리스트 */}
          <h5>가게 목록</h5>
          <Row className="storeListBox">
          </Row>
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
import React from "react";
import {
  Container,
  Row,
  Col,
  // Card,
  // CardBody,
  // Form,
  // FormGroup,
  // Input,
  // Label,
  // Button,
} from "reactstrap";
import Timeline from "../../components/account/timeline";
import MemberWithUs from "../../components/account/memberWithUs";
// import MemberInfo from "../../components/account/memberInfo";
import MemberQnA from "../../components/account/memberQnA";

function Profile() {
  // if JWT가 존재하지 않을 경우 auth로 리다이렉트 하면서 return을 띄우지 않음
  // 존재 할 경우에만 return으로 넘겨주는 방식

  return (
      <Container fluid={true} className="division">
          <Row className="division-wrapper">
            <Col sm="3" className="left-division">
              <Row className="left-upper-division">
                <MemberWithUs/> 
              </Row>
              <Row className="left-lower-division">
                <MemberQnA/>
              </Row>
            </Col>
            <Col sm="9" className="central-division">
              <div className="card central-division-title">
                나의 따뜻한 마음
              </div>
              <div className="central-division-content">  
               <Timeline/>
              </div>
            </Col>
            {/* <Col sm="3" className="right-division">
              오른쪽 영역
              <Row>
                
              </Row>
            </Col> */}
          </Row>
      </Container>
  );
}

export default Profile;
import React from "react";
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

function Division() {
  return (
      <Container fluid={true} className="division">
          <Row className="division-wrapper">
            <Col sm="3" className="left-division">
              <Row className="left-upper-division">
                왼쪽 윗부분 : 주로 프로필 들어갈 곳
              </Row>
              <Row className="left-lower-division">
                왼쪽 아래부분 : 지도 및 기타등등
              </Row>
            </Col>
            <Col sm="6" className="central-division">
              <div className="central-division-title">
                제목이고요
              </div>
              <div className="central-division-content">
                내용입니다
              </div>
            </Col>
            <Col sm="3" className="right-division">
              오른쪽 영역
              <Row>
                
              </Row>
            </Col>
          </Row>
      </Container>
  );
}

export default Division;
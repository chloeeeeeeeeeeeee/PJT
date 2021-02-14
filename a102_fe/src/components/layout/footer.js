import { Container, Row, Col } from "reactstrap";


function Footer() {

  let childcheck = false;
  if (window.location.href.slice(-9) === "childmain" || window.location.href.slice(-8) === "childmap"){
    childcheck = true;
  }

  return (
    <Row className="mainFooter p-2 pl-4" id={childcheck?"childColor":""}>
      <Col md="8" className="footer-copyright">
        <p className="mb-0">
          Copyright © ssafy:a102. 후원문의·상담 02-8282-7979.
        </p>
      </Col>
      <Col md="4">
        <p className="text-right mb-0">
          <i className="fa fa-heart">
            <a href="http://www.naver.com"> 후원사 바로가기 </a>
          </i>
        </p>
      </Col>
    </Row>
  );
}

export default Footer;

import { Container, Row, Col } from "reactstrap";

function Footer() {
  return (
    <Row className="mainFooter p-2">
      <Col md="8" className="footer-copyright">
        <p className="mb-0">
          Copyright © a102. All Rights Reserved. 후원문의·상담 0000-0000
        </p>
      </Col>
      <Col md="4">
        <p className="text-right mb-0">
          <i className="fa fa-heart">
            <a href="http://www.naver.com"> Let's Go 후원사</a>
          </i>
        </p>
      </Col>
    </Row>
  );
}

export default Footer;

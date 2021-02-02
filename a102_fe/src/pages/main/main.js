import Billboard from "../../components/main/billboard.js";
import Aboutus from "../../components/main/aboutus.js";
import { Container, Row, Col } from "reactstrap";

function Main() {
  return (
    <Row className="main">
        <Billboard />
      <Col className="aboutus">
        <Aboutus />
      </Col>
    </Row>
  );
}

export default Main;

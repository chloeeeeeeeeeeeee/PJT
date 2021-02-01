import Billboard from "../../components/main/billboard.js"
import Aboutus from "../../components/main/aboutus.js";
import {Container, Row, Col} from "reactstrap";

function Main() {
    return (
        <Container fluid={true} className="main">
            <Row>
            <Col className="billboard">
                <Billboard />
            </Col>
            <Col className="aboutus">
                <Aboutus />
            </Col>
            </Row>
        </Container>
    )
}

export default Main;
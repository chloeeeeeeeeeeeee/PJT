import React, { Fragment } from "react";
import { 
    Container,
    Row,
    Col, 
    Card,
    CardBody,} from "reactstrap";
import Whattoeat from "../../components/main/whattoeat.js";
import oori from "../../assets/images/oori.png"

function ChildMain() {
    return (
        <Fragment>
            <Container fluid={true}>
                <Row  className="whattoeat">
                    <Col sm="6" md={{ size: 5, offset: 1 }}>
                        <Card>
                            <CardBody sm="12" className="childimg">
                                <img src={oori} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6" md={{ size: 5 }}>
                        <Whattoeat />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ChildMain;
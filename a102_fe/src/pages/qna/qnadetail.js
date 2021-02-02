import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import FaceIcon from '@material-ui/icons/Face';

const qnaDetail = () => {
    return (
        <Fragment>
            <Container fluid={true} className="detailPost">
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Card>
                            <CardHeader className="detailPostQHeader">
                                <h5>제목</h5>
                                < FaceIcon /> 믓쨍이후원자
                                <span>2020. 02. 02</span>
                            </CardHeader>
                            <CardBody className="detailPostQBody">
                                <p>
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                    제가 후원을 했는데 문제가~~!!제가 후원을 했는데 문제가~~!!
                                </p>
                            </CardBody>
                            <CardHeader className="detailPostAHeader">
                                <h5>답변</h5>
                            </CardHeader>
                            <CardBody className="detailPostABody">
                                <p>
                                    ~방법으로 해결 도와드리겠습니다.~방법으로 해결 도와드리겠습니다.
                                    ~방법으로 해결 도와드리겠습니다.~방법으로 해결 도와드리겠습니다.
                                    ~방법으로 해결 도와드리겠습니다.~방법으로 해결 도와드리겠습니다.
                                    ~방법으로 해결 도와드리겠습니다.~방법으로 해결 도와드리겠습니다.
                                    ~방법으로 해결 도와드리겠습니다.~방법으로 해결 도와드리겠습니다.
                                    ~방법으로 해결 도와드리겠습니다.~방법으로 해결 도와드리겠습니다.
                                    ~방법으로 해결 도와드리겠습니다.~방법으로 해결 도와드리겠습니다.
                                    ~방법으로 해결 도와드리겠습니다.~방법으로 해결 도와드리겠습니다.
                                </p>
                            </CardBody>
                            <CardFooter className="detailPostButton">
                                <Button className="detailPostUpdateButton">수정하기</Button>
                                <Button className="detailPostDeleteButton">삭제하기</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );

};

export default qnaDetail;

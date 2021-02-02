import React, { Fragment } from "react";
import { Container, Row, Col, Card, CardHeader, Table, Button } from "reactstrap";


function qnaList(props) {
    return (
        <Fragment>
            <Container fluid={true} className="listPost">
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Card>
                        <CardHeader className="listPostHeader">
                            <h5>문의 내역</h5>
                            <Button className="listPostHeaderButton">문의하기</Button>
                        </CardHeader>
                        <div className="listPostBody">
                            <Table hover>
                            <thead>
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">제목</th>
                                <th scope="col">닉네임</th>
                                <th scope="col">작성일</th>
                                <th scope="col">답변여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>후원 결제 문제</td>
                                <td>믓쨍이후원자</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>후원 결제 문제2</td>
                                <td>믓쨍이후원자2</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>후원 결제 문제3</td>
                                <td>믓쨍이후원자3</td>
                                <td>2021.02.02</td>
                                <td>X</td>
                                </tr>
                                <tr>
                                <th scope="row">1</th>
                                <td>후원 결제 문제</td>
                                <td>믓쨍이후원자</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>후원 결제 문제2</td>
                                <td>믓쨍이후원자2</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>후원 결제 문제3</td>
                                <td>믓쨍이후원자3</td>
                                <td>2021.02.02</td>
                                <td>X</td>
                                </tr>
                                <tr>
                                <th scope="row">1</th>
                                <td>후원 결제 문제</td>
                                <td>믓쨍이후원자</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>후원 결제 문제2</td>
                                <td>믓쨍이후원자2</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>후원 결제 문제3</td>
                                <td>믓쨍이후원자3</td>
                                <td>2021.02.02</td>
                                <td>X</td>
                                </tr>
                                <tr>
                                <th scope="row">1</th>
                                <td>후원 결제 문제</td>
                                <td>믓쨍이후원자</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>후원 결제 문제2</td>
                                <td>믓쨍이후원자2</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>후원 결제 문제3</td>
                                <td>믓쨍이후원자3</td>
                                <td>2021.02.02</td>
                                <td>X</td>
                                </tr>
                                <tr>
                                <th scope="row">1</th>
                                <td>후원 결제 문제</td>
                                <td>믓쨍이후원자</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>후원 결제 문제2</td>
                                <td>믓쨍이후원자2</td>
                                <td>2021.02.02</td>
                                <td>O</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>후원 결제 문제3</td>
                                <td>믓쨍이후원자3</td>
                                <td>2021.02.02</td>
                                <td>X</td>
                                </tr>
                            </tbody>
                            </Table>
                        </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default qnaList;
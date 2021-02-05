import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, Table, Button } from "reactstrap";
import { FcLock } from "react-icons/fc";


function QnaList() {
    let [qnaList, setQnaList] = useState([]);
    let [userStatus, setUserStatus] = useState([]);
    let [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://i4a102.p.ssafy.io:8080/app/account/userinfo`, {
            headers: {
                token: localStorage.getItem('access-token')
            }
        })
        .then(res => res.json())
        .then(res => {
            setUser(res);
            console.log(user);
        })
    }, [])

    useEffect(() => {
        fetch(`http://i4a102.p.ssafy.io:8080/app/account/userinfo`, {
            headers: {
                token: localStorage.getItem('access-token')
            }
        })
        .then(res => res.json())
        .then(res => {
            setUserStatus(Boolean(res.userSeq));
            // console.log(Boolean(res.userSeq));
        })
    }, [])

    useEffect(() => {
        fetch(`http://i4a102.p.ssafy.io:8080/app/qna/0`)
        .then((res) => res.json())
        .then((res) => {
            setQnaList(res.content);
        })
    }, [])

    const Detail = (qna) => {
        // console.log(qna);
        fetch(`http://i4a102.p.ssafy.io:8080/app/qna/read`, {
            method: "POST",
            headers: {
                token: localStorage.getItem('access-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                qnaSeq: qna.qnaSeq,
                qnaSecret: qna.qnaSecret,
            })
        })
        .then((res) => {
            if(res.headers.get('content-type') === null){
                alert("타인이 작성한 비밀글은 볼 수 없어요ㅜ.ㅜ");
            }
            else{
                res.json()
                .then((res) => {
                    alert("공개글이니까 혹은 내가 쓴 거니까 볼 수 있지");
                    window.history.pushState(res, 'please', '/qnadetail');
                    window.location.href = '/qnadetail';
                })
            }
        })
    }
    
    return (
        <Fragment>
            <Container fluid={true} className="listPost">
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Card>
                        <CardHeader className="listPostHeader">
                            <h5>문의 내역</h5>
                            {userStatus?
                                <a href="/qnacreate"><Button className="listPostHeaderButton">문의하기</Button></a>
                                :
                                <div className="listPostHeaderCaution">회원만 문의가 가능합니다</div>
                            }
                        </CardHeader>
                        <div className="listPostBody">
                            <Table hover>
                            <thead>
                                <tr>
                                <th scope="col">No.</th>
                                <th scope="col">제목</th>
                                <th scope="col">이름</th>
                                <th scope="col">작성일</th>
                                <th scope="col">답변여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                {qnaList.map((qna, index) => (
                                    <tr className={user.userId === qna.user.userId? "myQna" : ""}>
                                    <th scope="row">{qna.qnaSeq} {qna.qnaSecret? <FcLock />: ""}</th>
                                    <td onClick={(e) => Detail(qna)} style={{cursor:'pointer'}} >{qna.qnaTitle}</td>
                                    <td>{qna.user.userName}</td>
                                    <td>{qna.qnaDate.slice(0, 10)}</td>
                                    <td>{qna.qnaReply==null? 'X' : 'O'}</td>
                                    </tr>
                                ))}
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

export default QnaList;
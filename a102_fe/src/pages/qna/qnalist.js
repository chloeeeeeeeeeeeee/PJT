import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardFooter, Table, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FcLock } from "react-icons/fc";


function QnaList() {
    let [qnaList, setQnaList] = useState([]);
    let [userStatus, setUserStatus] = useState([]);
    let [user, setUser] = useState([]);
    let [totalPages, setTotalPages] = useState(0);
    let [nowPage, setNowPage] = useState(0);

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
        // fetch(`http://i4a102.p.ssafy.io:8080/app/qna/0`)
        fetch(`http://i4a102.p.ssafy.io/app/qna/0`)
        .then((res) => res.json())
        .then((res) => {
            setQnaList(res.content);
            setTotalPages(res.totalPages);
        })
    }, [])

    const Detail = (qna) => {
        // console.log(qna);
        // fetch(`http://i4a102.p.ssafy.io:8080/app/qna/read`, {
        fetch(`https://i4a102.p.ssafy.io/app/qna/read`, {
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

    const paginations = []

    for (let idx=1; idx<=totalPages; idx++) {
        paginations.push(
            <PaginationItem>
                <PaginationLink className={nowPage === idx-1? "active" : ""} href="#javascript" onClick={(e) => Page(idx-1)}>{idx}</PaginationLink>
            </PaginationItem>
        )
    }

    const Page = (idx) => {
        // fetch(`http://i4a102.p.ssafy.io:8080/app/qna/${idx}`)
        fetch(`http://i4a102.p.ssafy.io/app/qna/${idx}`)
        .then((res) => res.json())
        .then((res) => {
        setQnaList(res.content);
        setNowPage(idx);
    })}

    
    return (
        <Fragment>
            <Container fluid={true} className="listPost">
                <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
                        <h3 className="col-8 d-inline">문의 내역</h3>
                        <div className="col-4 d-inline">
                            {userStatus?
                                <a href="/qnacreate"><Button className="listPostHeaderButton">문의하기</Button></a>
                                :
                                <div className="listPostHeaderCaution">회원만 문의가 가능합니다</div>
                            }
                        </div>
                    </Col>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                        <Card className="listPostContent">
                        {/* <CardHeader className="listPostHeader">
                            <h5>문의 내역</h5>
                            {userStatus?
                                <a href="/qnacreate"><Button className="listPostHeaderButton">문의하기</Button></a>
                                :
                                <div className="listPostHeaderCaution">회원만 문의가 가능합니다</div>
                            }
                        </CardHeader> */}
                            <div className="listPostBody">
                                <Table hover>
                                <thead className="listPostBodyThead">
                                    <tr>
                                    <th scope="col" width="100">번호</th>
                                    <th scope="col">제목</th>
                                    <th scope="col" width="200">이름</th>
                                    <th scope="col" width="200">작성일</th>
                                    <th scope="col" width="100">답변</th>
                                    </tr>
                                </thead>
                                <tbody className="listPostBodyTbody">
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
                            <CardFooter className="listPostFooter row">
                                <Pagination size="sm" className="col">
                                    <ul className="pagination">
                                        {paginations}
                                    </ul>
                                </Pagination>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default QnaList;
import React, { Fragment, useState, useEffect } from "react";
import CKEditor from 'ckeditor4-react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";


function QnaUpdate() {
  let [qna, setQna] = useState([]);
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [secret, setSecret] = useState(0);
  let [temp, setTemp] = useState(0);

  useEffect(() => {
    setQna(window.history.state);
    console.log(qna);
  }, [])

  useEffect(() => {
    console.log(qna);
    setTitle(qna.qnaTitle);
    setContent(qna.qnaContent);
    setTemp(temp + 1);
    console.log(temp);
  }, [])

  useEffect(() => {
    console.log(title);
    console.log("content", content);
  })
  
  const Update = (event) => {
    event.preventDefault();
    console.log(title);
    console.log(content);
    console.log(secret);
    fetch(`http://i4a102.p.ssafy.io:8080/app/qna/update`, {
      method: "POST",
      headers: {
        token: localStorage.getItem('access-token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qnaSeq: qna.qnaSeq,
        qnaTitle: title,
        qnaContent: content,
        qnaSecret: secret,
      })
    })
    .then(res => {
      if (res.status === 200){
        alert("200떳당");
        window.location.href = '/qna';
      }
      else{
        alert("오류오류오류오류");
      }
    })
  }

  const onTitleChange = event => {
    setTitle(event.target.value);
    console.log("제목제목", title);
  }

  const onContentChange = (event) => {
    const data = event.editor.getData();
    setContent(data);
    console.log("너 왜 안나오니 등장해죠", content);
  }

  const onSecretChange = (event) => {
    if(secret === 0){
      setSecret(1);
    }
    else{
      setSecret(0);
    }
    console.log('비밀', secret);
  }

  return (
    <Fragment>
      <Container fluid={true} className="createPost">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader className="createPostHeader">
                <h5>문의하기</h5>
              </CardHeader>
              <CardBody className="createPostBody">
                <Form className="row">
                  <Col sm="12">
                    <FormGroup>
                      <Label for="qnaTitle">제목</Label>
                      <Input
                        className="createTitle"
                        type="text"
                        name="title"
                        value={title}
                        placeholder="제목을 입력해주세요 :)"
                        required=""
                        onChange={onTitleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>내용</Label>
                      <CKEditor
                        activeclassName="p10"
                        name="content"
                        id="content"
                        value={content}
                        data={qna.qnaContent}
                        required=""
                        onChange={onContentChange}
                      />
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="secret"
                          value={secret}
                          onChange={onSecretChange}
                        />
                        비밀글
                      </Label>
                    </FormGroup>
                  </Col>
                </Form>
                <Button className="createButton" type="submit" onClick={Update}>
                  수정하기
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default QnaUpdate;
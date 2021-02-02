import React, { Fragment } from "react";
import Ckeditor from "react-ckeditor-component";
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


const qnaCreate = (props) => {
//   const data = [{ name: "Lifestyle" }, { name: "Travel" }];
//   const getUploadParams = ({ meta }) => {
//     return { url: "https://httpbin.org/post" };
//   };
//   const handleChangeStatus = ({ meta, file }, status) => {};

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
                        id="qnaTitle"
                        type="text"
                        placeholder="제목을 입력해주세요 :)"
                        required=""
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>내용</Label>
                      <Ckeditor activeclassName="p10" />
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />
                        비밀글
                      </Label>
                    </FormGroup>
                  </Col>
                </Form>
                <Button className="createButton" type="submit">
                  등록
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default qnaCreate;
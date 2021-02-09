import React, { Fragment, useState } from "react";
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

function MenuUpdate() {
  let [menu, setMenu] = useState(window.history.state);
  let [name, setName] = useState(window.history.state.itemName);
  let [price, setPrice] = useState(window.history.state.itemPrice);
  let [img, setImage] = useState(null);
  let [imgUrl, setImgUrl] = useState(window.history.state.itemImgUrl);

  // 이미지 수정 관련
  // list생기면 추후 수정할게요! 금방할 것 같아서!
  // 새로운 메뉴사진 업로드 : itemImgUrl = 원래 itemImgUrl 그대로, 파일첨부 o
  // 메뉴사진 삭제 : itemImgUrl = "noImage", 파일첨부x
  // 메뉴사진 수정x : itemImgUrl = 원래 itemImgUrl 그대로, 파일첨부x

  const Update = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('itemId', menu.itemId);
    formData.append('itemName', name);
    formData.append('itemPrice', price);
    formData.append('file', img);
    formData.append('itemImgUrl', imgUrl);

    for (let key of formData.keys()) {
      console.log(key);
    }
    for (let value of formData.values()) {
      console.log(value);
    }

    fetch(`http://i4a102.p.ssafy.io:8080/app/store/item/create`, {
        method: "POST",
        headers: {
            token: localStorage.getItem('access-token'),
        },
        body: formData,
    })
    .then(res => {
      console.log(res);
      if (res.status === 200){
        alert("9ㅜㄷ 9ril~ 관리자 뷰로 보내줘 나를!!");
        // window.location.href = '관리자 뷰로 가야겠죠~!';
      }
      else{
        alert("오류");
      }
    })
  }

  const onNameChange = event => {
    setName(event.target.value);
    console.log(event.target.value);
  }

  const onPriceChange = (event) => {
    setPrice(event.target.value);
    console.log(event.target.value);
  }

  const onImgChange = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  return (
    <Fragment>
      <Container fluid={true} className="createPost">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Card>
              <CardHeader className="createPostHeader">
                <h5>메뉴 수정하기</h5>
              </CardHeader>
              <CardBody className="createPostBody">
                <Form className="row">
                  <Col sm="12">
                    <FormGroup>
                      <Label for="menuName">상품명</Label>
                      <Input
                        className="createTitle"
                        type="text"
                        name="name"
                        value={name}
                        onChange={onNameChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="menuPrice">가격</Label>
                      <Input
                        className="createTitle"
                        type="number"
                        name="price"
                        value={price}
                        onChange={onPriceChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="menuImg">사진</Label>
                      <Input
                        className="createTitle"
                        type="file"
                        accept='image/jpg,impge/png,image/jpeg,image/gif' 
                        name="file"
                        onChange={onImgChange} />
                    </FormGroup>
                  </Col>
                </Form>
                <Button className="createButton" type="submit" onClick={Update}>
                  수정
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
  
export default MenuUpdate;
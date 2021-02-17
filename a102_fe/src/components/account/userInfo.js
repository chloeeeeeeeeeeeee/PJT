import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
} from "reactstrap";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";


function UserInfo() {
  const [userInfo, setuserInfo] = useState({});
  // let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [button, setButtton] = useState(true);  
  const [checkphone, setCheckphone] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserInfo(res);
      // setName(res.userName);
      setEmail(res.userEmail);
      setPhone(res.userPhone);
    })
  }, [])

  const userUpdate  = (event) => {
    event.preventDefault();
    const regex = /^[0-9\b -]{10,11}$/;
    (regex.test(phone) && phone.trim() !== "" ?
      fetch(`${process.env.REACT_APP_API_URL}/account/update`, {
        method: "POST",
        headers: {
          token: localStorage.getItem("access-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPhone: phone,
          userEmail: email,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setButtton(!button)
          // window.location.href = "/profile";
        } else {
          alert("회원정보 수정에 실패하셨습니다. 다시 시도해주세요.");
        }
      })
    :
      alert("연락처는 10-11자리 번호만 입력해주세요!")
    )
  };

  const userButton = (event) => {
    setButtton(!button);
  }

  const onPhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  if (button){
    return (
      <Fragment>
        <Col xl="12" className="userInfo mt-2 p-0 m-0">
          <Card>
            <CardHeader className="userInfoHeader">
              <h5 className="mb-0">
                회원정보 <Button onClick={userButton}>수정</Button>
              </h5>
            </CardHeader>
            <CardBody className="userInfoBody">
                <p><AiFillPhone />  { phone==="temp"? "번호를 입력해주세요." : phone } </p>
                <p className="mb-0"><AiOutlineMail />  { email==="temp"? "이메일을 입력해주세요." : email} </p>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
  else{
    return(
      <Fragment>
        <Col xl="12" className="userInfo mt-2 p-0 m-0">
          <Card>
            <CardHeader className="userInfoHeader">
              <h5 className="mb-0">
                회원정보 <Button onClick={userUpdate}>완료</Button>
              </h5>
            </CardHeader>
            <CardBody className="userInfoBody">
                <p>
                  <AiFillPhone />
                  <Input
                    className="d-inline userInfoInput"
                    type="text"
                    name="userPhone"
                    required=""
                    value={phone}
                    onChange={onPhoneChange}
                  />
                </p>
                <p className="mb-0">
                  <AiOutlineMail />
                  <Input
                    className="d-inline userInfoInput"
                    type="text"
                    name="userEmail"
                    required=""
                    value={email}
                    onChange={onEmailChange}
                  />
                </p>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
};

export default UserInfo;

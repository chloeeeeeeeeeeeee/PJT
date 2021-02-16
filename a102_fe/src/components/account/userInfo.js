import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "reactstrap";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";


function UserInfo() {
  const [withus, setwithus] = useState(true);
  const [userInfo, setuserInfo] = useState({});
  const [userWithus, setuserWithus] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/account/userinfo`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserInfo(res);

    })
    fetch(`${process.env.REACT_APP_API_URL}/account/userwithus`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserWithus(res);
    })
  }, [])


  return (
    <Fragment>
      <Col xl="12" className="userInfo mt-2 p-0 m-0">
        <Card>
          <CardHeader className="userInfoHeader">
            <h5 className="mb-0">
              회원정보
            </h5>
          </CardHeader>
            <CardBody className="userInfoBody">
                <p><AiFillPhone /> { userInfo.userPhone } <Button>수정</Button></p>
                <p className="mb-0"><AiOutlineMail /> { userInfo.userEmail } <Button>수정</Button></p>
            </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default UserInfo;

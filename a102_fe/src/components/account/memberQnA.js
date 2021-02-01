import React, { Fragment, useState } from "react";
import {
  Col,
  // Card,
  CardHeader,
  CardBody,
  // Button,
  // Media,
  // Form,
  // FormGroup,
  // Input,
  Collapse,
  // UncontrolledTooltip,
} from "reactstrap";
// import one from "../../assets/images/user/2.jpg";
// import three from "../../assets/images/user/3.jpg";
// import five from "../../assets/images/user/5.jpg";
// import two from "../../assets/images/user/2.png";
// import eight from "../../assets/images/user/8.jpg";
// import eleven from "../../assets/images/user/11.png";
// import timeline3 from "../../assets/images/social-app/timeline-3.png";
// import ten from "../../assets/images/user/10.jpg";
// import six from "../../assets/images/user/6.jpg";
// import fourteen from "../../assets/images/user/14.jpg";
// import four from "../../assets/images/user/4.jpg";

function MemberQnA() {
  const [isProfile, setisProfile] = useState(true);
  // const [isMutual, setisMutual] = useState(true);
  // const [isActivity, setisActivity] = useState(true);
  return (
    <Fragment>
      <Col xl="12" className="memberInfo">
        <div className="card">
          <CardHeader className="memberInfo-header">
            <h5 className="mb-0">
              <div className="memberInfo-title"
                // color="link pl-0"
                onClick={() => setisProfile(!isProfile)}
                data-toggle="collapse"
                data-target="#collapseicon5"
                aria-expanded={isProfile}
                aria-controls="collapseicon5"
              >
                문의 내역
              </div>
            </h5>
          </CardHeader>
          <Collapse isOpen={!isProfile}>
            <CardBody className="memberInfo-body">
              {/* 얘도 그리드 짜서 auto로 배열해 넣어버려요! */}
              <ul>
                <li>기부영수증 관련 문의 드립니다</li>
                {/* <li>로제돈까스에 대해서... </li> */}
              </ul>
            </CardBody>
          </Collapse>
        </div>
      </Col>
    </Fragment>
  );
};

export default MemberQnA;

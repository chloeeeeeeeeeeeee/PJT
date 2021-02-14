import React, { Fragment, useState, useEffect } from "react";
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

function MemberInfo() {
  // 이하 내역을 보여주기 위해 withus 영역을 정의하고 토글할 계획입니다.
  // 우선 useState로 해당 영역과 관련된 함수를 정의해줍시다!
  const [withus, setwithus] = useState(true);

  const [userInfo, setuserInfo] = useState({});
  const [userWithus, setuserWithus] = useState({});

  // const [isMutual, setisMutual] = useState(true);
  // const [isActivity, setisActivity] = useState(true);

  useEffect(() => {
    fetch(`http://i4a102.p.ssafy.io:8080/app/account/userinfo`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserInfo(res);
      console.log("지금 받아올 내용은:", res)
      console.log("실제로 받은 내용은:", userInfo)
      
    })
    fetch(`http://i4a102.p.ssafy.io:8080/app/account/userwithus`, {
      headers: {
        token: localStorage.getItem('access-token')
      }
    })
    .then(res => res.json())
    .then(res => {
      setuserWithus(res);
      console.log("지금 받아올 내용은:", res)
      console.log("실제로 받은 내용은:", userWithus)
    })
  }, [])

  // fetch로 userWithus도 받아와야해요!

  // const userInfo = {
  //   "userSeq": 1,
  //   "userId": "1",
  //   "userName": "qwe",
  //   "userPwd": null,
  //   "userEmail": "test@test.com",
  //   "userPhone": "010-0000-0000",
  //   "userDate": "2021-01-26T04:17:27",
  //   "userTotalContributionAmount": 20,
  //   "store": null
  // };

  // const userWithus = {
  //   "userWithUs": 1,
  //   "contributionCount": 6,
  //   "contributionTotal": 20
  // }

  return (
    <Fragment>
      <Col xl="12" className="memberInfo">
        <div className="card">
          <CardHeader className="memberInfo-header">
            <h5 className="mb-0">
              <div className="memberInfo-title"
                // color="link pl-0"
                // 기본값은 withus가 true인 상태입니다. 즉 내용이 열려있어요! => isOpen값으로 받아서 그래요
                // 그러나 온클릭시 setwithus를 이용해 이를 뒤집어(!) 줍니다. 
                onClick={() => setwithus(!withus)}
                data-toggle="collapse"
                data-target="#collapseicon5"
                // withus가 true인 경우 aria가 expanded 된 상태라는 뜻이에요. 
                // 그런데 이 줄이 빠지더라도 작동하고 있어요! 왜인지 살펴보고 싶어요. 
                // aria-expanded={withus}
                aria-controls="collapseicon5"
              >
                { userInfo.userName }님
              </div>
            </h5>
          </CardHeader>
          {/* 마찬가지로 withus가 true인 기본값일 때 isOpen 됩니다. 
          짐작해보는데, aria-expand와 Collapse는 쌍으로 묶이는 것 같아요. => 아닌거같아요
          isOpen은 말 그대로 보여주냐 마느냐입니다. boolean을 받아요! 헐! 
          만약 withus라는 변수를 쓰지 않고 T/F를 매긴다면, 늘 고정된 상태가 돼요.*/}
          <Collapse isOpen={withus}>
            <CardBody className="memberInfo-body">
              <p>{ userWithus.userWithUs }일째 함께하고 있어요</p>
              <p>{ userWithus.contributionCount }그릇을 함께 했어요</p>
              ----
              <p>{ userWithus.contributionTotal }원</p>
              <span>
                <button type="button">기부 영수증 발급</button>
              </span>
              {/* <Media>
                <Media
                  className="img-50 img-fluid m-r-20 rounded-circle"
                  src={one}
                  alt=""
                />
                <Media body>
                  <h6 className="font-primary f-w-600">My Page</h6>
                  <span className="d-block">
                    <span>
                      <i className="fa fa-comments-o"> </i>
                      <span className="px-2">
                        Messages
                        <span className="badge badge-pill badge-light">9</span>
                      </span>
                    </span>
                  </span>
                  <span className="d-block">
                    <span>
                      <i className="fa fa-bell-o"></i>
                      <span className="px-2">
                        Notification
                        <span className="badge badge-pill badge-light">9</span>
                      </span>
                    </span>
                  </span>
                </Media>
              </Media>
              <div className="social-btngroup d-flex">
                <Button color="primary text-center btn-pill" type="button">
                  Likes
                </Button>
                <Button color="light text-center btn-pill" type="button">
                  View
                </Button>
              </div>
              <div className="likes-profile text-center">
                <h5>
                  <span>
                    <i className="fa fa-heart font-danger"></i> 884
                  </span>
                </h5>
              </div>
              <div className="text-center">35 New Likes This Week</div>
              <div className="customers text-center social-group">
                <ul>
                  <li className="d-inline-block">
                    <Media
                      className="img-40 rounded-circle"
                      src={three}
                      alt="ThirdImg"
                      id="UncontrolledTooltipExample"
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="UncontrolledTooltipExample"
                    >
                      Johny Waston
                    </UncontrolledTooltip>
                  </li>
                  <li className="d-inline-block">
                    <Media
                      className="img-40 rounded-circle"
                      src={five}
                      alt="FifthImg"
                      id="UncontrolledTooltipExample1"
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="UncontrolledTooltipExample1"
                    >
                      Andew Jon
                    </UncontrolledTooltip>
                  </li>
                  <li className="d-inline-block">
                    <Media
                      className="img-40 rounded-circle"
                      src={one}
                      alt="FirstImg"
                      id="UncontrolledTooltipExample2"
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="UncontrolledTooltipExample2"
                    >
                      Comeren Diaz
                    </UncontrolledTooltip>
                  </li>
                  <li className="d-inline-block">
                    <Media
                      className="img-40 rounded-circle"
                      src={two}
                      alt="secondImg"
                      id="UncontrolledTooltipExample3"
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="UncontrolledTooltipExample3"
                    >
                      Bucky Barnes
                    </UncontrolledTooltip>
                  </li>
                  <li className="d-inline-block">
                    <Media
                      className="img-40 rounded-circle"
                      src={eight}
                      alt="eightImg"
                      id="UncontrolledTooltipExample4"
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="UncontrolledTooltipExample4"
                    >
                      Jason Borne
                    </UncontrolledTooltip>
                  </li>
                  <li className="d-inline-block">
                    <Media
                      className="img-40 rounded-circle"
                      src={eleven}
                      alt="elevenImg"
                      id="UncontrolledTooltipExample5"
                    />
                    <UncontrolledTooltip
                      placement="top"
                      target="UncontrolledTooltipExample5"
                    >
                      Comeren Diaz
                    </UncontrolledTooltip>
                  </li>
                </ul>
              </div> */}
            </CardBody>
          </Collapse>
        </div>
      </Col>
      {/* <Col xl="12">
        <Card>
          <Media className="img-fluid" alt="" src={timeline3} />
        </Card>
      </Col>
      <Col xl="12">
        <Card>
          <CardHeader>
            <h5 className="mb-0">
              <Button
                color="link pl-0"
                onClick={() => setisMutual(!isMutual)}
                data-toggle="collapse"
                data-target="#collapseicon6"
                aria-expanded={isMutual}
                aria-controls="collapseicon6"
              >
                Mutual Friends
              </Button>
            </h5>
          </CardHeader>
          <Collapse isOpen={isMutual}>
            <CardBody className="social-status filter-cards-view">
              <Form>
                <FormGroup className="m-0">
                  <Input
                    className="form-control-plaintext"
                    type="search"
                    placeholder="Search Contacts.."
                  />
                </FormGroup>
              </Form>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={two}
                  alt="twoImg"
                />
                <div className="social-status social-online"></div>
                <Media body>
                  <span className="f-w-600 d-block">Bucky Barnes</span>
                  <span className="d-block">winter@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={ten}
                  alt="TenImg"
                />
                <div className="social-status social-busy"></div>
                <Media body>
                  <span className="f-w-600 d-block">Sarah Loren</span>
                  <span className="d-block">barnes@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={six}
                  alt="sixImg"
                />
                <div className="social-status social-offline"></div>
                <Media body>
                  <span className="f-w-600 d-block">Jason Borne</span>
                  <span className="d-block">jasonb@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={eight}
                  alt="eightImg"
                />
                <div className="social-status social-offline"></div>
                <Media body>
                  <span className="f-w-600 d-block">Comeren Diaz</span>
                  <span className="d-block">comere@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={fourteen}
                  alt="fourteenImg"
                />
                <div className="social-status social-online"></div>
                <Media body>
                  <span className="f-w-600 d-block">Andew Jon</span>
                  <span className="d-block">andrewj@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={four}
                  alt="fourImg"
                />
                <div className="social-status social-busy"></div>
                <Media body>
                  <span className="f-w-600 d-block">Johny Waston</span>
                  <span className="d-block">johny@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={three}
                  alt="threeImg"
                />
                <div className="social-status social-offline"></div>
                <Media body>
                  <span className="f-w-600 d-block">Johny William</span>
                  <span className="d-block">johnyw@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={two}
                  alt="twoImg"
                />
                <div className="social-status social-online"></div>
                <Media body>
                  <span className="f-w-600 d-block">Bucky Barnes</span>
                  <span className="d-block">winter@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={ten}
                  alt=""
                />
                <div className="social-status social-busy"></div>
                <Media body>
                  <span className="f-w-600 d-block">Sarah Loren</span>
                  <span className="d-block">barnes@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={six}
                  alt="sixImg"
                />
                <div className="social-status social-offline"></div>
                <Media body>
                  <span className="f-w-600 d-block">Jason Borne</span>
                  <span className="d-block">jasonb@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={eight}
                  alt="eightImg"
                />
                <div className="social-status social-offline"></div>
                <Media body>
                  <span className="f-w-600 d-block">Comeren Diaz</span>
                  <span className="d-block">comere@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={fourteen}
                  alt="fourteenImg"
                />
                <div className="social-status social-online"></div>
                <Media body>
                  <span className="f-w-600 d-block">Andew Jon</span>
                  <span className="d-block">andrewj@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={four}
                  alt="fourImg"
                />
                <div className="social-status social-busy"></div>
                <Media body>
                  <span className="f-w-600 d-block">Johny Waston</span>
                  <span className="d-block">johny@gmail.com</span>
                </Media>
              </Media>
              <Media>
                <img
                  className="img-50 rounded-circle m-r-15"
                  src={three}
                  alt="threeImg"
                />
                <div className="social-status social-offline"></div>
                <Media body>
                  <span className="f-w-600 d-block">Johny William</span>
                  <span className="d-block">johnyw@gmail.com</span>
                </Media>
              </Media>
            </CardBody>
          </Collapse>
        </Card>
      </Col>
      <Col xl="12">
        <Card>
          <CardHeader>
            <h5 className="mb-0">
              <Button
                color="link pl-0"
                onClick={() => setisActivity(!isActivity)}
                data-toggle="collapse"
                data-target="#collapseicon14"
                aria-expanded={isActivity}
                aria-controls="collapseicon14"
              >
                Activity Feed
              </Button>
            </h5>
          </CardHeader>
          <Collapse isOpen={isActivity}>
            <CardBody className="social-status filter-cards-view">
              <Media>
                <Media
                  className="img-50 rounded-circle m-r-15"
                  src={ten}
                  alt="tenImg"
                />
                <Media body>
                  <span className="f-w-600 d-block">Andew Jon</span>
                  <p>
                    Commented on Shaun Park's <a href="#javascript">Photo</a>
                  </p>
                  <span className="light-span">20 min Ago</span>
                </Media>
              </Media>
              <Media>
                <Media
                  className="img-50 rounded-circle m-r-15"
                  src={three}
                  alt="threeImg"
                />
                <Media body>
                  <span className="f-w-600 d-block">Johny Waston</span>
                  <p>
                    Commented on Shaun Park's <a href="#javascript">Photo</a>
                  </p>
                  <span className="light-span">1 hour Ago</span>
                </Media>
              </Media>
              <Media>
                <Media
                  className="img-50 rounded-circle m-r-15"
                  src={five}
                  alt="fiveImg"
                />
                <Media body>
                  <span className="f-w-600 d-block">Comeren Diaz</span>
                  <p>
                    Commented on Shaun Park's <a href="#javascript">Photo</a>
                  </p>
                  <span className="light-span">1 days Ago</span>
                </Media>
              </Media>
              <Media>
                <Media
                  className="img-50 rounded-circle m-r-15"
                  src={four}
                  alt="fourImg"
                />
                <Media body>
                  <span className="f-w-600 d-block">Sarah Loren</span>
                  <p>
                    Commented on Shaun Park's <a href="#javascript">Photo</a>
                  </p>
                  <span className="light-span">2 days Ago</span>
                </Media>
              </Media>
              <Media>
                <Media
                  className="img-50 rounded-circle m-r-15"
                  src={three}
                  alt="threeImg"
                />
                <Media body>
                  <span className="f-w-600 d-block">Johny Waston</span>
                  <p>
                    Commented on Shaun Park's <a href="#javascript">Photo</a>
                  </p>
                  <span className="light-span">5 days Ago</span>
                </Media>
              </Media>
              <Media>
                <Media
                  className="img-50 rounded-circle m-r-15"
                  src={five}
                  alt="fiveImg"
                />
                <Media body>
                  <span className="f-w-600 d-block">Comeren Diaz</span>
                  <p>
                    Commented on Shaun Park's <a href="#javascript">Photo</a>
                  </p>
                  <span className="light-span">6 days Ago</span>
                </Media>
              </Media>
            </CardBody>
          </Collapse>
        </Card>
      </Col> */}
    </Fragment>
  );
};

export default MemberInfo;

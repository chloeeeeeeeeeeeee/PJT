import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

function StoreSupportList() {
  const jwtToken = localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : "";
  if (jwtToken === "") {
    window.location.href = "/auth";
  }

  const monthArray = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let dateObject = new Date();
  let todayDate =
    dateObject.getFullYear() + "-" + monthArray[dateObject.getMonth()] + "-";
  if (dateObject.getDate() < 10) {
    todayDate += "0" + dateObject.getDate();
  } else {
    todayDate += dateObject.getDate();
  }

  let todayTime = "";
  if (dateObject.getHours() < 10) {
    todayTime += "0" + dateObject.getHours() + ":";
  } else {
    todayTime += dateObject.getHours() + ":";
  }
  if (dateObject.getMinutes() < 10) {
    todayTime += "0" + dateObject.getMinutes() + ":";
  } else {
    todayTime += dateObject.getMinutes() + ":";
  }
  if (dateObject.getSeconds() < 10) {
    todayTime += "0" + dateObject.getSeconds();
  } else {
    todayTime += dateObject.getSeconds();
  }

  // 문자열 형식으로 세팅
  let [startDate, setStartDate] = useState(todayDate);
  let [endDate, setEndDate] = useState(todayDate);
  let [currentTime, setCurrentTime] = useState(todayTime);
  // 해당 기간 내 받은 후원 내역
  let [contributions, setContributions] = useState([]);

  // 시간 변경
  function changeCurrentTime() {
    let dateObject = new Date();
    let todayTime = "";
    if (dateObject.getHours() < 10) {
      todayTime += "0" + dateObject.getHours() + ":";
    } else {
      todayTime += dateObject.getHours() + ":";
    }
    if (dateObject.getMinutes() < 10) {
      todayTime += "0" + dateObject.getMinutes() + ":";
    } else {
      todayTime += dateObject.getMinutes() + ":";
    }
    if (dateObject.getSeconds() < 10) {
      todayTime += "0" + dateObject.getSeconds();
    } else {
      todayTime += dateObject.getSeconds();
    }
    setCurrentTime(todayTime);
  }
  // 시작 날짜 변경
  function changeStartDate() {
    setStartDate(document.getElementById("startDate").value);
    changeCurrentTime();
  }

  // 종료 날짜 변경
  function changeEndDate() {
    setEndDate(document.getElementById("endDate").value);
    changeCurrentTime();
  }

  function changeDateRange(dateCount) {
    let baseDate = new Date(endDate + " " + currentTime);
    let newStart = new Date(startDate + " " + currentTime);
    if (dateCount === 0) {
      newStart = new Date(baseDate.getTime() - 1000 * 60 * 60 * 24 * 7);
    } else {
      let newDate = new Date(endDate + " " + currentTime);
      newDate.setMonth(newDate.getMonth() - dateCount);
      newStart = new Date(newDate.getTime());
    }

    let newStartDate =
      newStart.getFullYear() + "-" + monthArray[newStart.getMonth()] + "-";
    if (newStart.getDate() < 10) {
      newStartDate += "0" + newStart.getDate();
    } else {
      newStartDate += newStart.getDate();
    }
    setStartDate(newStartDate);
    console.log(newStartDate);
  }

  const axios = require("axios");
  useEffect(() => {
    axios({
      method: "POST",
      url: `http://i4a102.p.ssafy.io:8080/app/store/contributionlist?endDate=${endDate} ${currentTime}&startDate=${startDate} ${currentTime}`,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: jwtToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        setContributions(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [startDate, endDate]);

  return (
    <Card className="storeSupportListContainer col p-0">
      <CardHeader>
        <Row className="justify-content-between pl-3">
          <h4>후원현황</h4>
          <ButtonGroup>
            <Button onClick={(e) => changeDateRange(0)}>1주</Button>
            <Button onClick={(e) => changeDateRange(1)}>1달</Button>
            <Button onClick={(e) => changeDateRange(3)}>3달</Button>
            <Button onClick={(e) => changeDateRange(6)}>6달</Button>
          </ButtonGroup>
          <div id="naverIdLogin"></div>
        </Row>
        <Form className="row mt-4 justify-content-around">
          <FormGroup>
            <Label for="startDate">시작 날짜</Label>
            <Input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="date placeholder"
              onChange={changeStartDate}
              value={startDate}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">종료 날짜</Label>
            <Input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="date placeholder"
              onChange={changeEndDate}
              value={endDate}
            />
          </FormGroup>
        </Form>
      </CardHeader>
      <CardBody>
        {contributions.map((item, index) => {
          return (
            <Col xs="12" className="row" key={index}>
              <p>{item.itemName}</p>
              <p> {item.itemAvailable}</p>
            </Col>
          );
        })}
      </CardBody>
    </Card>
  );
}

export default StoreSupportList;

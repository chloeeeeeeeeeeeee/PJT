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
} from "reactstrap";

function StoreSupportList() {
  const jwtToken = localStorage.getItem("access-token")
    ? localStorage.getItem("access-token")
    : "";
  if (jwtToken === "") {
    window.location.href = "/auth";
  }

  // 문자열 형식으로 세팅
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  // 해당 기간 내 받은 후원 내역
  let [contributions, setContributions] = useState([])

  const axios = require("axios");
  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      token: jwtToken,
    },
  };
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://i4a102.p.ssafy.io:8080/app/store/contributionlist?endDate=2021-02-10 00:00:00&startDate=2021-02-09 00:00:00",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        token: jwtToken,
      },
    })
      .then((res) => {
        console.log(res.data);
        setContributions(res.data)
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Card className="storeSupportListContainer col p-0">
      <CardHeader>
        <Row className="justify-content-between pl-3">
          <h4>후원현황</h4>
          <ButtonGroup>
            <Button>1주</Button>
            <Button>1달</Button>
            <Button>3달</Button>
            <Button>6달</Button>
          </ButtonGroup>
        </Row>
        <Form className="row mt-4 justify-content-around">
          <FormGroup>
            <Label for="startDate">시작 날짜</Label>
            <Input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="date placeholder"
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">종료 날짜</Label>
            <Input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="date placeholder"
            />
          </FormGroup>
        </Form>
      </CardHeader>
      <CardBody>
          {contributions.map((item, index)=>{
              
          })}
      </CardBody>
    </Card>
  );
}

export default StoreSupportList;

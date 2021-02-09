import { Col, Button, Row } from "reactstrap";

function PaymentSuccess() {
  function moveToMain() {
    window.location.href = "/";
  }
  return (
    <Col className="paymentSuccessContainer">
      <Row className="justify-content-center">
        <p className="col-12 text-center">
          당신의 후원이 아동의 미래의 빛이 되길
        </p>
        <Button className="col-3" onClick={moveToMain}>
          메인페이지로 이동
        </Button>
      </Row>
    </Col>
  );
}

export default PaymentSuccess;

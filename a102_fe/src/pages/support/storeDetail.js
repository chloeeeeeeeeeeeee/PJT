import {
<<<<<<< Updated upstream
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
  } from "reactstrap";
  import StoreDetailInfo from "../../components/support/storeDetailInfo";
  import SupportCart from "../../components/support/supportCart";
  
  function StoreDetail(props) {
    console.log("PROPS");
    console.log(props);
    // 매장 ID 값
    const { storeId } = props.match.params;
  
    const testCount = 7;
  
    console.log(props.match.params.storeId);
  
    return (
        <Row className="mt-3 storeDetailBox row justify-content-center">
            <StoreDetailInfo storeInfo={storeId}/>
            <SupportCart storeInfo={storeId} />
        </Row>
    );
  }
  
  export default StoreDetail;
  
=======
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import StoreDetailInfo from "../../components/support/storeDetailInfo";
import SupportCart from "../../components/support/supportCart";

function StoreDetail(props) {
  console.log("PROPS");
  console.log(props);
  // 매장 ID 값
  const { storeId } = props.match.params;

  console.log(props.match.params.storeId);

  return (
    <Col className="mainStoreDetail">
      <Row className="row">
        <Col sm="12" md={{ size: 10, offset: 1 }} id="title">
          <h3>후원 음식 선택하기</h3>
        </Col>
        <StoreDetailInfo storeInfo={storeId} />
        <SupportCart storeInfo={storeId} />
      </Row>
    </Col>
  );
}

export default StoreDetail;
>>>>>>> Stashed changes

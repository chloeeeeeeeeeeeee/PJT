import {
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
    <Container fluid={true} className="mainBox">
      <Row className="mt-3 mainRow">
        <StoreDetailInfo storeInfo={storeId}></StoreDetailInfo>
        <SupportCart storeInfo={storeId} />
      </Row>
    </Container>
  );
}

export default StoreDetail;

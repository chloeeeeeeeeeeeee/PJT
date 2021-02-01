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

function StoreDetailSupport(props) {
  // 매장 ID 값
  const { storeId } = props.match.params;

  console.log(props.match.params.storeId);

  return (
    <div>
      <Container fluid={true} className="mainBox">
        <Row className="mt-3">
          <StoreDetailInfo storeInfo={storeId}></StoreDetailInfo>
          <SupportCart storeInfo={storeId} />
        </Row>
      </Container>
    </div>
  );
}

export default StoreDetailSupport;

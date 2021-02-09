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

  console.log(props.match.params.storeId);

  return (
    <Row className="mt-3 storeDetailBox row justify-content-center">
      <StoreDetailInfo storeInfo={storeId} />
      <SupportCart storeInfo={storeId} />
    </Row>
  );
}

export default StoreDetail;

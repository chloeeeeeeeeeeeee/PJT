import { Row, Col, Button } from "reactstrap";
import { HiCursorClick } from "react-icons/hi";

function SupportMapItem(storeInfo) {
  function moveToStoreDetail() {
    window.location.href = `storedetailsupport/${storeInfo.storeInfo.storeId}`;
    // if (storeInfo.storeInfo.supportCheck) {
    //   window.location.href = `storedetailsupport/${storeInfo.storeInfo.storeId}`;
    // } else {
    //   window.location.href = `storeDetail/${storeInfo.storeInfo.storeId}`;
    // }
    // window.location.href = `/storeDetail/${storeInfo.storeInfo.storeId}`
  }

  return (
    <Row className="mapListItem m-1 p-1">
      <Col xs="7">{storeInfo.storeInfo.storeName}</Col>
      <Col xs="5">{storeInfo.storeInfo.storeCategory}</Col>
      <Col xs="9">{storeInfo.storeInfo.storeLocation}</Col>
      <Col xs="3"><HiCursorClick onClick={moveToStoreDetail}/></Col>
    </Row>
  );
}

export default SupportMapItem;

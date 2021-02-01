import { Row, Col } from "reactstrap";

function SupportMapItem(storeInfo) {
  function moveToStoreDetail() {
    // console.log(storeInfo);
    console.log(storeInfo.storeInfo);
    console.log(storeInfo.storeInfo.supportCheck);
    if (storeInfo.storeInfo.supportCheck) {
      window.location.href = `storedetailsupport/${storeInfo.storeInfo.storeId}`;
    } else {
      window.location.href = `storeDetail/${storeInfo.storeInfo.storeId}`;
    }
    // window.location.href = `/storeDetail/${storeInfo.storeInfo.storeId}`
  }

  return (
    <Row className="mapListItem m-1 p-1" onClick={moveToStoreDetail}>
      <Col xs="7">{storeInfo.storeInfo.storeName}</Col>
      <Col xs="5">{storeInfo.storeInfo.storeCategory}</Col>
      <Col xs="12">{storeInfo.storeInfo.storeLocation}</Col>
    </Row>
  );
}

// var mapOptions = {
//     center: new naver.maps.LatLng(37.3595704, 127.105399),
//     zoom: 10
// };

// var map = new naver.maps.Map('map', mapOptions);

export default SupportMapItem;

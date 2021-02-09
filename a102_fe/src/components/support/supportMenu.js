import { Row, Col } from "reactstrap";

function SupportMenu(supportmenu) {
  let imgurl = `http://i4a102.p.ssafy.io:8080/app/menus/1/${supportmenu.supportmenu.itemName}.jpg`;
  return (
    <Row className="col-10">
      <img src={imgurl} className="d-inline-block col-3" />
      <div className="col-9 menuItemInfo pt-4 pb-4 pl-0 pr-0 row justify-content-start">
        <h5 className="col-8">{supportmenu.supportmenu.itemName}</h5>
        <p className="col-4 text-right">{supportmenu.supportmenu.itemPrice > 6000 ? supportmenu.supportmenu.itemPrice - 6000 : supportmenu.supportmenu.itemPrice}원</p>
        <p className="col information">현재 {supportmenu.supportmenu.itemAvailable}그릇 후원되었습니다.</p>
      </div>
    </Row>
  );
}
export default SupportMenu;

import { AiOutlineReload } from "react-icons/ai";
import { Row, Button } from "reactstrap";

function StoreMenuItem(storeMenu) {
  function Update(menuitem) {
    window.history.pushState(menuitem, "menuitem", "/menuupdate");
    window.location.href = "/menuupdate";
  }

  function Delete(menuitem) {
    // console.log(menuitem);
    if (
      window.confirm(
        "정말로 상품을 삭제하시겠습니까? \n삭제된 상품을 복구 할 수 없습니다."
      )
    ) {
      fetch(
        `${process.env.REACT_APP_API_URL}/store/item/delete/${menuitem.itemId}`,
        {
          method: "POST",
          headers: {
            token: localStorage.getItem("access-token"),
          },
        }
      ).then((res) => {
        if (res.status === 200) {
          storeMenu.sendTriggerToParent();
          alert("삭제 성공");
          //   window.location.href = "/storeadmin";
        } else {
          alert(menuitem.itemId, "실패! 바보 메롱~!~!");
        }
      });
    }
  }

//   console.log(storeMenu.storeMenu);
  let imgurl = `${process.env.REACT_APP_API_URL}/${storeMenu.storeMenu.itemImgUrl}`;
  return (
    <Row className="col-12">
      <img src={imgurl} className="d-inline-block col-3" />
      <div className="col-9 menuItemInfo pt-4 pb-4 pl-0 pr-0 row justify-content-start">
        <h5 className="col-8">{storeMenu.storeMenu.itemName}</h5>
        <p className="col-4 text-right">
          {/* {storeMenu.storeMenu.itemPrice > 6000
            ? storeMenu.storeMenu.itemPrice - 6000
            : storeMenu.storeMenu.itemPrice} */}
          {storeMenu.storeMenu.itemPrice}원
        </p>
        <p className="col information">
          현재 {storeMenu.storeMenu.itemAvailable}그릇 후원되었습니다.
        </p>
        <Button onClick={() => Update(storeMenu.storeMenu)}>수정</Button>
        <Button onClick={() => Delete(storeMenu.storeMenu)}>삭제</Button>
      </div>
    </Row>
  );
}
export default StoreMenuItem;

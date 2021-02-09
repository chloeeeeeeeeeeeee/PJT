import { Row, Button } from "reactstrap";

function StoreMenuItem(storeMenu, { sendTriggerToParent }) {
  // update버튼 이렇게 만들어주세욜~!
  // 주소에 id값이 같이 안와서 이렇게 해야... 내가 id를 빼다 쓸 수가 있어 흑흑
  function Update(menuitem) {
    window.history.pushState(menuitem, "menuitem", "/menuupdate"); // menuitem : item객체명 바꿔주세욜!
    window.location.href = "/menuupdate";
  }
  // 되겠지... 될거얌 아마! ㅇㅅㅇ!
  // post라 확인을 해볼수가 읎따..! ㅋㅋㅋㅋㅋㅋㅋㅋㅋ안되면 합쳐서 푸쉬해서 청구하세욜~!
  function Delete(menuitem) {
    if (
      window.confirm(
        "정말로 상품을 삭제하시겠습니까? \n삭제된 상품을 복구 할 수 없습니다."
      )
    ) {
      fetch(`http://i4a102.p.ssafy.io:8080/app/qna/delete/${menuitem.itemId}`, {
        // menuitem : item객체명 바꿔주세욜!
        method: "POST",
        headers: {
          token: localStorage.getItem("access-token"),
        },
      }).then((res) => {
        if (res.status === 200) {
          sendTriggerToParent();
          alert("삭제 성공");
        } else {
          alert("실패! 바보 메롱~!~!");
        }
      });
    }
  }

  console.log(storeMenu.storeMenu);
  let imgurl = `http://i4a102.p.ssafy.io:8080/app/${storeMenu.storeMenu.itemImgUrl}`;
  return (
    <Row className="col-12">
      <img src={imgurl} className="d-inline-block col-3" />
      <div className="col-9 menuItemInfo pt-4 pb-4 pl-0 pr-0 row justify-content-start">
        <h5 className="col-8">{storeMenu.storeMenu.itemName}</h5>
        <p className="col-4 text-right">
          {storeMenu.storeMenu.itemPrice > 6000
            ? storeMenu.storeMenu.itemPrice - 6000
            : storeMenu.storeMenu.itemPrice}
          원
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

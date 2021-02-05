//qt->js 함수

function addItem(itemId, itemName, itemPrice){
    //TODO: 장바구니에 목록 추가
    itemHtml = `<div class="cart-item">
                    <div class="cart-item-available">
                        <i class="fab fa-gratipay" style="font-size: 16px; color: rgba(255, 140, 0, 0.6)"></i>
                    </div>
                    <div class="cart-item-title">${itemName}</div>
                    <div class="cart-item-cost">${itemPrice}원</div>
                    <div class="cart-item-quantity">
                        <div class="cart-item-quantity-btn"> - </div>
                        <div> 1 </div>
                        <div class="cart-item-quantity-btn"> + </div>
                    </div>
                </div>`
    document.getElementsByClassName("cart-body")[0].insertAdjacentHTML("beforeend", itemHtml)
}

function clearBag(){
    //TODO: 장바구니 비워주는 함수
    cartBody = document.getElementsByClassName("cart-body")[0]
    while ( cartBody.hasChildNodes() ) { cartBody.removeChild( cartBody.firstChild ); }

}

function fadeout(){
    document.getElementById("fade").setAttribute("class", "six-four fade-out")
}
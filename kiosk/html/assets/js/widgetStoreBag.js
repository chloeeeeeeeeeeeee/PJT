itemCnt = 0;
itemCost = 0;

//qt->js 함수
function addItem(itemId, itemName, itemPrice){
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
    cartBody = document.getElementsByClassName("cart-body")[0]
    while ( cartBody.hasChildNodes() ) { cartBody.removeChild( cartBody.firstChild ); }

}

function fadeout(){
    document.getElementById("fade").setAttribute("class", "six-four fade-out")
    setTimeout(function(){
        document.getElementById("fade").setAttribute("class", "six-four")
    }, 1000)
}

function addCost(cost){
    itemCnt = itemCnt+1;
    itemCost = itemCost + cost;
    updateCost();
}

function removeCost(cost){
    itemCnt = itemCnt-1;
    itemCost = itemCost-cost;
}

function clearCost(){
    itemCnt = 0;
    itemCost = 0;
    updateCost();
}

function comma(num){
    var len, point, str; 
       
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
   
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
     
    return str;
}

function updateCost(){
    document.getElementById("totalCnt").innerText = String(itemCnt);
    document.getElementById("totalCost").innerText = comma(itemCost);
}

//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickPay(){
    handler.fadeout()
    setTimeout(function(){
        handler.nextPage(function(retVal) {
            console.error(JSON.stringify(retVal));
        }, "donation")}
    , 1000)
}

function clickReset(){
    handler.clearBag(function(retVal) {
        console.error(JSON.stringify(retVal));
    })
}
itemCnt = 0;
itemCost = 0;
mainState = 0;

//qt->js 함수
function addItem(itemId, itemName, itemPrice){
    itemHtml = `<div class="cart-item" id="${itemId}">
                    <div class="cart-item-available">
                        <i class="fab fa-gratipay" style="font-size: 16px; color: rgba(255, 140, 0, 0.6)"></i>
                    </div>
                    <div class="cart-item-title">${itemName}</div>
                    <div class="cart-item-cost">${itemPrice}원</div>
                    <div class="cart-item-quantity">
                        <div class="cart-item-quantity-btn" id="${itemId}Minus" onclick="qtRemoveItem(${itemId})"> - </div>
                        <div id=${itemId}Cnt> 1 </div>
                        <div class="cart-item-quantity-btn" id="${itemId}Minus" onclick="qtAddItem(${itemId})"> + </div>
                    </div>
                </div>` 

    if(!addCnt(itemId)){
        document.getElementsByClassName("cart-body")[0].insertAdjacentHTML("beforeend", itemHtml)
    }
}

function addCnt(itemId){
    try{
        let itemCnt=document.getElementById(String(itemId)+"Cnt")
        itemCnt.innerText = String(parseInt(itemCnt.innerText) + 1)
        return true
    }
    catch(error){
        return false;
    }
}

function removeCnt(itemId){
    let itemCnt=document.getElementById(String(itemId)+"Cnt")
    if(itemCnt.innerText != "1"){
        itemCnt.innerText = String(parseInt(itemCnt.innerText) - 1)
    }
    else{
        let removeElement = document.getElementById(String(itemId))
        removeElement.parentNode.removeChild(removeElement)
    }
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
    updateCost();
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

function changeState(state){
    mainState = state;
}

//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickPay(){
    handler.fadeout()
    if(!mainState){
        setTimeout(function(){
            handler.nextPage(function(retVal) {
                console.error(JSON.stringify(retVal));
            }, "donation")}
        , 1000)
    }
    else{
        setTimeout(function(){
            handler.nextPage(function(retVal) {
                console.error(JSON.stringify(retVal));
            }, "pay")}
        , 1000)
    }
}

function clickReset(){
    handler.clearBag(function(retVal) {
        console.error(JSON.stringify(retVal));
    })
}

function qtRemoveItem(itemId){
    handler.removeBagItem(function(retVal) {
        console.error(JSON.stringify(retVal));
    }, itemId)
}

function qtAddItem(itemId){
    handler.addBagItem(function(retVal) {
        console.error(JSON.stringify(retVal));
    }, itemId)
}


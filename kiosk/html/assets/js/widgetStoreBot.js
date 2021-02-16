itemCnt = 0;
itemCost = 0;

//qt->js 함수
function fadeout(){
    document.getElementById("fade").setAttribute("class", "align-center fade-out")
}

function addCost(cost){
    itemCnt = itemCnt+1;
    itemCost = itemCost + cost;
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

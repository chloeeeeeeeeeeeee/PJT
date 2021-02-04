//qt->js 함수
function fadeout(){
    document.getElementById("fade").setAttribute("class", "align-center fade-out")
}

function addCost(cost){
    //TODO: 수량, 가격 추가
}

function clearCost(){
    //TODO: 수량, 가격 0으로 초기화
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

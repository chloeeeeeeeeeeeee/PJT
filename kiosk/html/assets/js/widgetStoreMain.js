//qt->js 함수
function addStoreItem(itemId, imgUrl, itemName, itemPrice){
    //TODO: 음식 목록에 추가하는 함수
}

function fadeout(){
    //화면전환효과
    document.getElementById("fade").setAttribute("class", "six-four fade-out")
}

//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function addBagItem(itemNum){
    handler.addBagItem(function(retVal) {
        console.error(JSON.stringify(retVal));
    }, itemNum)
}
//qt->js 함수
function fadein(){
    document.getElementsByClassName("main-container")[0].setAttribute("class", "main-container fade-in")
}

//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickPay(){
    handler.nextPage(function(retVal) {
        console.error(JSON.stringify(retVal));
    })
}

function clickNoPay(){
    handler.nextPage(function(retVal) {
        console.error(JSON.stringify(retVal));
    })
}
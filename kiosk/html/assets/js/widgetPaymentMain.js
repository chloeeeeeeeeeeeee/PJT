//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickKakaoPay(){
    handler.nextPage(function(retVal) {
        console.error(JSON.stringify(retVal));
    }, "kakao")
}

function clickCardTagging(){
    handler.nextPage(function(retVal) {
        console.error(JSON.stringify(retVal));
    }, "rfid")
}
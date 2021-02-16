//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickKakaoPay(){
    handler.nextPage("kakao")
}

function clickCardTagging(){
    handler.nextPage("rfid")
}


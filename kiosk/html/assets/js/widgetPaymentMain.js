//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickKakaoPay(){
    fadeout();
    setTimeout(function(){
        handler.nextPage("kakao")
    }, 1000)
}

function clickCardTagging(){
    fadeout();
    setTimeout(function(){
        handler.nextPage("rfid")
    }, 1000)
}

function fadein() {
    document.getElementById("fade").setAttribute("class", "payment-main fade-in");
    setTimeout(function () {
        document.getElementById("fade").setAttribute("class", "payment-main opaone");
    }, 1000)
}

function fadeout() {
    document.getElementById("fade").setAttribute("class", "payment-main fade-out");
    setTimeout(function () {
        document.getElementById("fade").setAttribute("class", "payment-main opazero");
    }, 1000)
}
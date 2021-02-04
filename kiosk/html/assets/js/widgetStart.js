//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickStart(){
    document.getElementsByClassName("btn")[0].setAttribute("class", "btn btn-open grow")
    setTimeout(function(){
        document.getElementsByClassName("btn")[0].setAttribute("class", "btn btn-open")
    }, 2000)
    setTimeout(function(){
        handler.nextPage(function(retVal) {
            console.error(JSON.stringify(retVal));
        }, "store")
    }, 2000)
}
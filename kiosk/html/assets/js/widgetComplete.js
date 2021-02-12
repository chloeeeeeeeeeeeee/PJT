//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function completeTimeout(sec){
    let cnt = document.getElementById("count");
    cnt.innerText = String(sec)
    if(sec == 0){
        handler.nextPage("start")
    }
    else{
        setTimeout(function(){
            completeTimeout(sec - 1);
        }, 1000)
    }
}

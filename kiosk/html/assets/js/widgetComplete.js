//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

let stopFlag = 0;

function completeTimeout(sec){
    let cnt = document.getElementById("count");
    cnt.innerText = String(sec)
    if(sec == 10) stopFlag = 0;
    if(sec == 0){
        handler.nextPage("start")
    }
    else{
        setTimeout(function(){
            if(stopFlag == 0){
                completeTimeout(sec - 1);
            }
            else{
                stopFlag = 0;
            }
        }, 1000)
    }
}

function stopCnt(){
    stopFlag = 1;
}

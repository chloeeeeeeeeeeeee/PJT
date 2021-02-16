// 카드 터치 대기 함수
let cardId;
let touch, sign, done;
let waitText = document.getElementById("wait-text");
let dotCnt = 0;
let cardType = "credit";
let gdreamCardList = ["a123", "b123"];

function initPage(){
    touch = document.getElementById("wait-touch");
    done = document.getElementById("wait-done");
    togglePage(touch)
}

initPage()

function togglePage(element){
    touch.style.display = 'none';
    done.style.display = 'none';
    element.style.display = 'flex';
}

function touched(cid){
    cid = "asdasd";
    try {
        cardId = String(cid);
        if(gdreamCardList.indexOf(cardId) != -1){
            cardType = "gdream";
        }
        else{
            cardType = "credit";
        }
        reqPay();
    } catch (error) {
        alert(error);
    }
}


function changeDot(){
    setTimeout(function(){
        if(dotCnt == 0){
            waitText.innerText = "결제 대기중";
        }
        else{
            waitText.innerText += "."
        }
        dotCnt += 1;
        if(dotCnt == 4){
            dotCnt = 0;
        }
        changeDot();
    }, 300)
}

changeDot();

new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function reqPay(){
    togglePage(done)
    try {
        setTimeout(function(){
            handler.verifyPay(cardId, cardType)
        }, 500)
    } catch (error) {
        alert(error)
    }
}

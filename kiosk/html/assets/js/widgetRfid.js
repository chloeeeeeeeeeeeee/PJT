// 카드 터치 대기 함수
let cardId;
let touch, sign, done;

function initPage(){
    touch = document.getElementById("wait-touch");
    sign = document.getElementById("wait-sign");
    done = document.getElementById("wait-done");
    togglePage(touch)
}

initPage()

function togglePage(element){
    touch.style.display = 'none';
    sign.style.display = 'none';
    done.style.display = 'none';
    element.style.display = 'flex';
}

function touched(cid){
    cardId = cid;
    togglePage(sign);
}

// 사인 관련 함수
let pos = {
    drawable: false,
    x: -1,
    y: -1
};
let canvas, ctx;
 
window.onload = function(){
    canvas = document.getElementById("canvas-sign");
    ctx = canvas.getContext("2d");
 
    canvas.addEventListener("mousedown", listener);
    canvas.addEventListener("mousemove", listener);
    canvas.addEventListener("mouseup", listener);
    canvas.addEventListener("mouseout", listener);
}
 
function listener(event){
    switch(event.type){
        case "mousedown":
            initDraw(event);
            break;
 
        case "mousemove":
            if(pos.drawable)
                draw(event);
            break;
 
        case "mouseout":
        case "mouseup":
            finishDraw();
            break;
    }
}

function initDraw(event){
    ctx.beginPath();
    pos.drawable = true;
    let coors = getPosition(event);
    pos.X = coors.X;
    pos.Y = coors.Y;
    ctx.moveTo(pos.X, pos.Y);
}
 
function draw(event){
    let coors = getPosition(event);
    ctx.lineTo(coors.X, coors.Y);
    pos.X = coors.X;
    pos.Y = coors.Y;
    ctx.stroke();
}
 
function finishDraw(){
    pos.drawable = false;
    pos.X = -1;
    pos.Y = -1;
}
 
function getPosition(event){
    let x = event.pageX - canvas.offsetLeft;
    let y = event.pageY - canvas.offsetTop;
    return {X: x, Y: y};
}

new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function signComplete(){
    togglePage(done)
    //TODO: 사인 이미지 qt에 전송 -> qt에서는 서버에 저장 후 완료되면 complete 화면 이동
    try {
        handler.verifyPay("cardId")
    } catch (error) {
        alert(error)
    }
}


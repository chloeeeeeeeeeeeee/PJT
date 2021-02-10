//qt->js 함수
function fadein(){
    document.getElementsByClassName("main-container")[0].setAttribute("class", "main-container fade-in")
    setTimeout(function(){
        document.getElementsByClassName("main-container")[0].setAttribute("class", "main-container")
    }, 1000)
}

fadein()

let donationMoney = 0;
let donationCnt = 0;

function addCnt(){
    let itemCnt=document.getElementById("donation-cnt")
    donationCnt = donationCnt + 1;
    itemCnt.innerText = String(donationCnt)

    let donationAmount = document.getElementById("donation-amount")
    donationMoney = donationMoney + 3000
    donationAmount.innerText = comma(donationMoney)
}

function removeCnt(){
    let itemCnt=document.getElementById("donation-cnt")
    if(itemCnt.innerText != "0"){
        donationCnt = donationCnt - 1;
        itemCnt.innerText = String(donationCnt)
        let donationAmount = document.getElementById("donation-amount")
        donationMoney = donationMoney - 3000
        donationAmount.innerText = comma(donationMoney)
    }
}

function comma(num){
    var len, point, str; 
       
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
   
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
     
    return str;
}

//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function clickAddBag(){
    for(let i=0;i<donationCnt;i++){
        handler.addBagItem(function(retVal) {
            console.error(JSON.stringify(retVal));
        }, 0)
    }
}
console.log("hi")
let itemCnt = 0;
let carouselCnt = 0;
let itemIdContainer = [];

//qt->js 함수
let newCarouselContainer = `<div class="carousel-item">
                                <section class="bookmark-container">
                                </section>
                            </div>` ;

function addStoreItem(itemId, imgUrl, itemName, itemPrice, badge, intro){
    itemIdContainer.push(itemId);
    let serverImgUrl = "http://i4a102.p.ssafy.io:8080/app/" + imgUrl;
    let listElement = `<div class="bookmark" onclick="addBagItem(${itemId})">
                        <div class="bookmark-photo">
                            <div class="bookmark-image" style="background-image: url(${serverImgUrl});"></div>
                        </div>
                        <div class="bookmark-title"> <span>${itemName}</span></div>
                        <div class="bookmark-badge">${badge}</div>
                        <div class="bookmark-dividing"></div>
                        <div class="bookmark-detail">
                            ${intro}
                        </div>
                        <div class="bookmark-btn1"><span>${itemPrice}원</span></div>
                        <div class="bookmark-contribution">
                            <i class="fas fa-check-circle p-1" style="font-size: 15px; color: darkslategrey;"></i>
                            <i class="fas fa-check-circle p-1" style="font-size: 15px; color: darkslategrey;"></i>
                            <i class="fas fa-check-circle p-1" style="font-size: 15px; color: darkslategrey;"></i>
                            <i class="fab fa-gratipay p-1" style="font-size: 15px; color: rgba(255, 140, 0, 0.6)"></i>
                            <i class="fab fa-gratipay p-1" style="font-size: 15px; color: rgba(255, 140, 0, 0.6)"></i>
                        </div>
                        <div class="bookmark-contribution-title"><span>이주의 후원 현황</span></div>
                    </div>`;

    if(itemCnt%8==0 && itemCnt!=0){
        carouselCnt = carouselCnt + 1;
        document.getElementsByClassName("carousel-inner")[0].insertAdjacentHTML("beforeend", newCarouselContainer)
    }
    document.getElementsByClassName("bookmark-container")[carouselCnt].insertAdjacentHTML("beforeend", listElement);
    itemCnt = itemCnt + 1;
}

function clearStoreItem(){
    itemCnt = 0;
    carouselCnt = 0;
    itemIdContainer = [];

    document.getElementsByClassName("carousel-inner")[0].innerHTML = `<div class="carousel-item active">
                                                                        <section class="bookmark-container">
                                                                        </section>
                                                                      </div>`
}

function fadeout(){
    //화면전환효과
    document.getElementById("fade").setAttribute("class", "six-four fade-out");
    setTimeout(function(){
        document.getElementById("fade").setAttribute("class", "six-four");
    }, 1000)
}

//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function addBagItem(itemId){
    handler.addBagItem(function(retVal) {
        console.error(JSON.stringify(retVal));
    }, itemId)
}

let itemCnt = 0;
let totalCnt = 0;
let itemCost = 0;
let mainState = 0;
let carouselCnt = 0;
let itemIdContainer = [];

let maxContriNum = 15

//qt->js 함수
let newCarouselContainer = `<div class="carousel-item">
                                <section class="bookmark-container">
                                </section>
                            </div>` ;

function addStoreItem(itemId, imgUrl, itemName, itemPrice, badge, intro, availableItem, contrubutionItem) {
    itemIdContainer.push(itemId);
    let numAvail = availableItem;
    let numContri = contrubutionItem;

    if(numAvail > maxContriNum){
        numAvail = maxContriNum;
        numContri = 0;
    }
    else{
        if(numContri > maxContriNum){
            numContri = maxContriNum - numAvail;
        }
        else{
            numContri -= numAvail;
        }
    }

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
                        <div class="bookmark-contribution">`
    for(let i=0;i<numContri;i++){
        listElement += `<i class="fas fa-check-circle p-1" style="font-size: 15px; color: darkslategrey;"></i>`
    }
    for(let i=0;i<numAvail;i++){
        listElement += `<i class="fab fa-gratipay p-1" style="font-size: 15px; color: rgba(255, 140, 0, 0.6)"></i>`
    }
    listElement +=  `</div>
                        <div class="bookmark-contribution-title"><span>이주의 후원 현황</span></div>
                    </div>`;

<<<<<<< HEAD
    if(itemCnt%8==0 && itemCnt!=0){
=======
    if (itemCnt % 8 == 0 && itemCnt != 0) {
>>>>>>> 58ac6e124b03efd64c9df47a1baf4b6e17c00e2f
        carouselCnt = carouselCnt + 1;
        document.getElementsByClassName("carousel-inner")[0].insertAdjacentHTML("beforeend", newCarouselContainer)
        newCarouselIndicators = `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${carouselCnt}"></li>`
        document.getElementsByClassName("carousel-indicators")[0].insertAdjacentHTML("beforeend", newCarouselIndicators)
    }
    document.getElementsByClassName("bookmark-container")[carouselCnt].insertAdjacentHTML("beforeend", listElement);
    itemCnt = itemCnt + 1;
}

function clearStoreItem() {
    itemCnt = 0;
    carouselCnt = 0;
    itemIdContainer = [];

    document.getElementsByClassName("carousel-inner")[0].innerHTML = `<div class="carousel-item active">
                                                                        <section class="bookmark-container">
                                                                        </section>
                                                                      </div>`;

    newCarouselIndicators = `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${carouselCnt}"></li>`;
    document.getElementsByClassName("carousel-indicators")[0].innerHTML = `<li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>`;

    document.getElementsByClassName("carousel-container")[0].style.display = 'flex';
    document.getElementsByClassName("donation-container")[0].style.display = 'none';
    mainState = 0;
}

function addItem(itemId, itemName, itemPrice) {
    itemHtml = `<div class="cart-item" id="${itemId}">
                    <div class="cart-item-available">
                        <i class="fab fa-gratipay" style="font-size: 16px; color: rgba(255, 140, 0, 0.6)"></i>
                    </div>
                    <div class="cart-item-title">${itemName}</div>
                    <div class="cart-item-cost">${itemPrice}원</div>
                    <div class="cart-item-quantity">
                        <div class="cart-item-quantity-btn" id="${itemId}Minus" onclick="qtRemoveItem(${itemId})"> - </div>
                        <div id=${itemId}Cnt> 1 </div>
                        <div class="cart-item-quantity-btn" id="${itemId}Minus" onclick="qtAddItem(${itemId})"> + </div>
                    </div>
                </div>`

    if (!addCnt(itemId)) {
        document.getElementsByClassName("cart-body")[0].insertAdjacentHTML("beforeend", itemHtml)
    }
}

function addCnt(itemId) {
    try {
        let itemCnt = document.getElementById(String(itemId) + "Cnt")
        itemCnt.innerText = String(parseInt(itemCnt.innerText) + 1)
        return true
    }
    catch (error) {
        return false;
    }
}

function removeCnt(itemId) {
    let itemCnt = document.getElementById(String(itemId) + "Cnt")
    if (itemCnt.innerText != "1") {
        itemCnt.innerText = String(parseInt(itemCnt.innerText) - 1)
    }
    else {
        let removeElement = document.getElementById(String(itemId))
        removeElement.parentNode.removeChild(removeElement)
    }
}

function clearBag() {
    cartBody = document.getElementsByClassName("cart-body")[0]
    while (cartBody.hasChildNodes()) { cartBody.removeChild(cartBody.firstChild); }

}

function addCost(cost) {
    totalCnt = totalCnt + 1;
    itemCost = itemCost + cost;
    updateCost();
}

function removeCost(cost) {
    totalCnt = totalCnt - 1;
    itemCost = itemCost - cost;
    updateCost();
}

function clearCost() {
    totalCnt = 0;
    itemCost = 0;
    updateCost();
}

function comma(num) {
    var len, point, str;

    num = num + "";
    point = num.length % 3;
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
        if (str != "") str += ",";
        str += num.substring(point, point + 3);
        point += 3;
    }

    return str;
}

function updateCost() {
    document.getElementById("totalCnt").innerText = String(totalCnt);
    document.getElementById("totalCost").innerText = comma(itemCost);
}

function toggleDisplay() {
    carousel = document.getElementsByClassName("carousel-container")[0];
    donation = document.getElementsByClassName("donation-container")[0];
    if (carousel.style.display == 'flex') {
        carousel.style.display = 'none';
        donation.style.display = 'flex';
    }
    else {
        carousel.style.display = 'flex';
        donation.style.display = 'none';
    }
}

function fadein() {
    document.getElementById("fade").setAttribute("class", "six-four fade-in");
    setTimeout(function () {
        document.getElementById("fade").setAttribute("class", "six-four opaone");
    }, 1000)
}

function fadeout() {
    document.getElementById("fade").setAttribute("class", "six-four fade-out");
    setTimeout(function () {
        document.getElementById("fade").setAttribute("class", "six-four opazero");
    }, 1000)
}

// Get the modal
var modal = document.getElementById('myModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        mainState=0;
    }
}



//js->qt 함수
new QWebChannel(qt.webChannelTransport, function (channel) {
    window.handler = channel.objects.handler;
});

function addBagItem(itemId) {
    handler.addBagItem(function (retVal) {
        console.error(JSON.stringify(retVal));
    }, itemId)
}

function clickPay() {
    if (!mainState) {
        modal.style.display = "block";
        mainState=1;
    }
    else {
        modal.style.display = "none";
        fadeout()
        setTimeout(function(){
            handler.nextPage("payment")
        }, 1000)
    }
}

function clickDonation(){
    modal.style.display = "none";
    toggleDisplay()
}

function clickReset() {
    handler.clearBag(function (retVal) {
        console.error(JSON.stringify(retVal));
    })
}

function qtRemoveItem(itemId) {
    handler.removeBagItem(function (retVal) {
        console.error(JSON.stringify(retVal));
    }, itemId)
}

function qtAddItem(itemId) {
    handler.addBagItem(function (retVal) {
        console.error(JSON.stringify(retVal));
    }, itemId)
}
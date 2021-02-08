from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
from ui.main_ui import Ui_mainWindow
from api import *

import kakaoSocket
import sys
import os
import time
import datetime
import threading

storeid = 1


class WebEnginePage(QWebEnginePage):
    # js 디버깅 함수 overriding
    # js의 console.log를 python terminal에 표시
    def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
        print("javaScriptConsoleMessage: ", level, message, lineNumber, sourceID)


class CallHandler(QObject):
    # js로 부터의 function call을 handling 하는 class
    # 기능
    @pyqtSlot(QVariant, result=QVariant)
    def nextPage(self, opt):
        # opt에 해당하는 페이지로 이동시키는 movePage 함수에 연결
        try:
            w.movePage(opt)
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    @pyqtSlot(QVariant, result=QVariant)
    def addBagItem(self, itemNum):
        # item number를 받아 장바구니에 추가해주는 함수에 연결
        try:
            w.addBagItem(itemNum)
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    @pyqtSlot(QVariant, result=QVariant)
    def removeBagItem(self, itemNum):
        # item number를 받아 장바구니에서 제거해주는 함수(1개)에 연결
        try:
            w.removeBagItem(itemNum)
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    @pyqtSlot(result=QVariant)
    def clearBag(self):
        # 장바구니를 비워주는 함수에 연결
        try:
            w.clearBagItem()
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    # 전환 효과
    @pyqtSlot()
    def fadeout(self):
        # w.widgetList["widgetStoreBag.html"].page().runJavaScript("fadeout()")
        w.widgetList["widgetStoreMain.html"].page().runJavaScript("fadeout()")


class et(QMainWindow, Ui_mainWindow):
    # QT 제어하는 메인 class
    def __init__(self):
        super().__init__()
        self.ui = Ui_mainWindow()
        self.ui.setupUi(self) # main_ui 파일 불러옴
        self.connectHtmlPage() # html 파일을 각 widget에 연결
        self.setKioskTitle(storeid) # 키오스크 네임 설정
        # 시간 타이머 설정
        self.displayTimeTimer = self.makeTimer(1000, self.displayTime)
        self.displayTimeTimer.start()
        # 홈 버튼 아이콘 설정
        self.ui.labelHome.setPixmap(QPixmap("./ui/res/home.png").scaledToWidth(60))
        self.clickable(self.ui.labelHome).connect(lambda: self.movePage("home"))
        # 메인 변수
        self.itemCnt = 0
        self.totalCost = 0
        self.itemList = {}
        self.bag = []
        self.phoneNum = "010-0000-0000"

    # Click 불가능한 label 등의 위젯을 클릭 가능하게 만들어주는 함수
    def clickable(self, widget):
        class Filter(QObject):
            clicked = pyqtSignal()
            def eventFilter(self, obj, event):
                if obj == widget:
                    if event.type() == QEvent.MouseButtonRelease:
                        if obj.rect().contains(event.pos()):
                            self.clicked.emit()
                            return True
                return False
        filter = Filter(widget)
        widget.installEventFilter(filter)
        return filter.clicked

    # 상단 바 제어 부분
    # 타이틀 설정
    def setKioskTitle(self, id):
        res = getStoreInfo(id)
        self.ui.labelTitle.setText(res["storeName"])

    # 시간 표시 타이머 함수
    def makeTimer(self, interval, connect):
        timer = QTimer(self)
        timer.setInterval(interval)
        timer.timeout.connect(connect)

        return timer

    # 우측 상단 날짜-시간을 세팅해주는 함수
    def displayTime(self):
        d = datetime.datetime.today()
        date = d.strftime('%Y-%m-%d')
        time = d.strftime('%p %I:%M:%S')
        self.ui.labelDate.setText(date)
        self.ui.labelTime.setText(time)

    # 메인 변수 초기화
    def initVals(self):
        self.itemCnt = 0
        self.totalCost = 0
        self.bag.clear()

    # html 폴더의 path를 list로 반환
    def getHtmlPathList(self):
        pathDir = './html/'
        pathList = os.listdir(pathDir)
        pathList.pop(0)
        for i in range(len(pathList)):
            pathList[i] = "/html/" + pathList[i]

        return pathList

    # html 파일을 각 widget에 연결하는 함수
    def connectHtmlPage(self):
        htmlPath = self.getHtmlPathList() # html file path를 받아옴
        self.widgetList = {}

        # file path에 맞는 widget을 생성하여 widgetList에 추가
        for path in htmlPath:
            widget = QWebEngineView()
            widget.setPage(QWebEnginePage(widget))
            widget.setUrl(QUrl.fromLocalFile(path))

            # js->qt function call handle을 위해 연결
            widget.channel = QWebChannel()
            widget.handler = CallHandler()
            widget.channel.registerObject('handler', widget.handler)
            widget.page().setWebChannel(widget.channel)

            # widget들의 list를 html 파일 이름으로 저장
            print(path.split('/')[2])
            self.widgetList[path.split('/')[2]] = widget

        # loadFinidhed 설정 -> html/js가 로딩 되기 전에 js function call을 방지
        self.widgetList["widgetStoreMain.html"].page().loadFinished.connect(self.makeStoreItem)

        # 레이아웃에 맞게 widgetList의 요소를 연결
        self.ui.pageStartLayout.addWidget(self.widgetList["widgetStart.html"], 0, 0, 1, 1)
        self.ui.pageStoreLayout.addWidget(self.widgetList["widgetStoreMain.html"], 0, 0, 1, 2)
        self.ui.pageStoreLayout.addWidget(self.widgetList["widgetStoreBag.html"], 0, 2, 1, 1)
        self.ui.pageStoreLayout.addWidget(self.widgetList["widgetDonationMain.html"], 0, 0, 1, 2)
        #self.ui.pageDonationLayout.addWidget(self.widgetList["widgetDonationMain.html"], 0, 0, 1, 1)
        self.ui.pagePaymentLayout.addWidget(self.widgetList["widgetPaymentMain.html"], 0, 0, 1, 1)
        self.ui.pageCompleteLayout.addWidget(self.widgetList["widgetCompletePic.html"], 0, 0, 1, 1)
        self.ui.pageCompleteLayout.addWidget(self.widgetList["widgetCompleteText.html"], 0, 1, 1, 1)



    def movePage(self, opt):
        print("click", opt)
        if opt == "home":
            self.clearBagItem()
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageStart)

        if opt == "store":
            # self.ui.pageStoreLayout.addWidget(self.widgetList["widgetStoreMain.html"], 0, 0, 1, 2)
            w.widgetList["widgetStoreBag.html"].page().runJavaScript("changeState(0)")
            self.widgetList["widgetStoreMain.html"].raise_()
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageStore)
            self.makeStoreItem(True)

        if opt == "donation":
            # self.ui.stackedWidget.setCurrentWidget(self.ui.pageDonation)
            w.widgetList["widgetStoreBag.html"].page().runJavaScript("changeState(1)")
            self.widgetList["widgetDonationMain.html"].page().runJavaScript("fadein()")
            time.sleep(0.2)
            self.widgetList["widgetDonationMain.html"].raise_()

        if opt == "pay":
            self.ui.stackedWidget.setCurrentWidget(self.ui.pagePayment)
            self.widgetList["widgetPaymentMain.html"].raise_()

        if opt == "kakao":
            kakaoPayUrl = postKakaoPay(w.bag, self.totalCost, self.itemCnt, self.phoneNum)
            kakaoWidget = QWebEngineView()
            print(kakaoPayUrl)
            kakaoWidget.setUrl(QUrl(kakaoPayUrl))

            kakaoWidget.channel = QWebChannel()
            kakaoWidget.handler = CallHandler()
            kakaoWidget.channel.registerObject('handler', kakaoWidget.handler)
            kakaoWidget.page().setWebChannel(kakaoWidget.channel)

            self.ui.pageKakaoPayLayout.addWidget(kakaoWidget, 0, 0, 1, 1)
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageKakaoPay)

        if opt == "complete":
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageComplete)


    def makeStoreItem(self, ok):
        jscmd = "ckearStoreItem()"
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)
        if ok:
            self.itemList = getStoreItem(storeid)
            idIter = 0
            for i in self.itemList:
                jscmd = "addStoreItem(\'{itemId}\', \'{imgUrl}\', \'{itemName}\', \'{itemPrice}\', \'{badge}\', \'{intro}\')"\
                    .format(itemId=idIter, imgUrl=i["itemImgUrl"], itemName=i["itemName"],
                            itemPrice=i["itemPrice"], badge="Hot!", intro="음식설명음식설명음식설명음식설명")
                # print(jscmd)
                self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)
                idIter = idIter+1

    def addBagItem(self, itemNum):
        item = {}
        if itemNum == 0:
            item["itemName"] = "후원금액"
            item["itemPrice"] = 3000
        else:
            item = self.itemList[itemNum]
            self.bag.append(item)

        self.totalCost = self.totalCost + item["itemPrice"]
        self.itemCnt = self.itemCnt + 1

        jscmd = "addItem(\'{itemId}\', \'{itemName}\', \'{itemPrice}\')"\
                .format(itemId=itemNum, itemName=item["itemName"], itemPrice=item["itemPrice"])
        self.widgetList["widgetStoreBag.html"].page().runJavaScript(jscmd)
        jscmd = "addCost({cost})".format(cost=item["itemPrice"])
        self.widgetList["widgetStoreBag.html"].page().runJavaScript(jscmd)

    def removeBagItem(self, itemNum):
        item = self.itemList[itemNum]
        self.bag.remove(item) # 첫번째 요소만 제거

        self.totalCost = self.totalCost - item["itemPrice"]
        self.itemCnt = self.itemCnt - 1

        jscmd = "removeCnt(\'{itemId}\')".format(itemId=itemNum)
        self.widgetList["widgetStoreBag.html"].page().runJavaScript(jscmd)
        jscmd = "removeCost({cost})".format(cost=item["itemPrice"])
        self.widgetList["widgetStoreBag.html"].page().runJavaScript(jscmd)

    def clearBagItem(self):
        self.initVals()
        jscmd = "clearBag()"
        self.widgetList["widgetStoreBag.html"].page().runJavaScript(jscmd)
        jscmd = "clearCost()"
        self.widgetList["widgetStoreBag.html"].page().runJavaScript(jscmd)

    def getPgToken(self, pgToken):
        # TODO: pgToken으로 결제 여부 확인
        # TODO: 결제 실패시 결제 실패 페이지(재확인, 결제수단변경)으로 이동
        # TODO: 결제 완료시 complete 화면으로 이동
        pass

app = QApplication(sys.argv)
w = et()
w.show()
# kakao api pg token을 받기 위한 socket thread 함수
t = threading.Thread(target=kakaoSocket.th_socket, args=(w,))
t.start()
print("th_socket thread start")
app.exec_()

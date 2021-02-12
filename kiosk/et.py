from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
from ui.main_ui2 import Ui_mainWindow

from api import *
from utils import *
from WebEnginePage import *

import kakaoSocket
import sys
import os
import time
import datetime
import threading

# Global variables
pageConnector = {}


# js로 부터의 function call을 handling 하는 class
class CallHandler(QObject):
    # 기능
    @pyqtSlot(QVariant)
    def nextPage(self, opt):
        print(opt)
        # opt에 해당하는 페이지로 이동시키는 함수에 연결
        # 사용가능목록(opt)
        # start, store, payment, kakao, rfid, complete
        pageConnector[opt]()

    @pyqtSlot(QVariant)
    def addBagItem(self, itemNum):
        # item number를 받아 장바구니에 추가해주는 함수에 연결
        w.addBagItem(itemNum)

    @pyqtSlot(QVariant)
    def removeBagItem(self, itemNum):
        # item number를 받아 장바구니에서 제거해주는 함수(1개)에 연결
        w.removeBagItem(itemNum)

    @pyqtSlot()
    def clearBag(self):
        # 장바구니를 비워주는 함수에 연결
        w.clearBagItem()

    @pyqtSlot(QVariant)
    def verifyPay(self, data):
        print("hi")
        # rfid 결제 검증
        w.rfidPaymentVerification(data)


# QT 제어하는 메인 class
class et(QMainWindow, Ui_mainWindow):
    # main window init
    def __init__(self):
        super().__init__()
        self.ui = Ui_mainWindow()
        self.ui.setupUi(self) # main_ui 파일 불러옴
        # 메인 변수
        self.storeid = 1
        self.widgetList = {}
        self.itemCnt = 0
        self.totalCost = 0
        self.itemList = {}
        self.bag = []
        self.phoneNum = "010-0000-0000"

        # 초기 실행 함수
        self.makePage()  # 페이지 리스트 생성 및 로드
        self.widgetList["widgetStoreMain.html"].page().loadFinished.connect(self.makeStoreItem)  # loadFinidhed 설정 -> html/js가 로딩 되기 전에 js function call을 방지
        self.setTopBar()
        self.loadStartPage()

    # 메인 변수 초기화
    def initVals(self):
        self.itemCnt = 0
        self.totalCost = 0
        self.bag.clear()
        self.phoneNum = ""

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

    # 상단 바 설정
    def setTopBar(self):
        # 홈 버튼 아이콘 설정
        # TODO: 프로젝트 메인 아이콘으로 변경
        self.ui.labelHome.setPixmap(QPixmap("./ui/res/home.png").scaledToWidth(60))
        self.clickable(self.ui.labelHome).connect(self.loadStartPage)

        # 타이머 설정
        self.displayTimeTimer = self.makeTimer(1000, self.displayTime)
        self.displayTimeTimer.start()

        # 키오스크 타이틀 설정
        self.setKioskTitle(self.storeid)

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

    # Page controller
    def makePage(self):
        htmlPath = getHtmlPathList("html")  # html file path를 받아옴

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

            # main layout에 연결
            self.ui.mainLayout.addWidget(widget, 2, 0, 1, 3)

            # widget들의 list를 html 파일 이름으로 저장
            self.widgetList[path.split('/')[2]] = widget

    def loadStartPage(self):
        self.clearBagItem()
        self.widgetList["widgetStart.html"].raise_()

    def loadItemListPage(self):
        self.makeStoreItem(True)
        self.widgetList["widgetStoreMain.html"].page().runJavaScript("fadein()")
        self.widgetList["widgetStoreMain.html"].raise_()

    def loadPaymentMethodPage(self):
        self.widgetList["widgetPaymentMain.html"].raise_()

    def loadKakaoPayPage(self):
        url = postKakaoPay(self.itemList, self.totalCost, self.itemCnt, self.phoneNum)
        jscmd = "setUrl(\"{url}\")".format(url=url)
        self.widgetList["widgetKakaoPay.html"].page().runJavaScript(jscmd)
        self.widgetList["widgetKakaoPay.html"].raise_()

    def loadRfidPage(self):
        self.widgetList["widgetRfid.html"].raise_()

    def loadCompletePage(self):
        self.widgetList["widgetComplete.html"].raise_()
        jscmd = "completeTimeout(\"10\")"
        self.widgetList["widgetComplete.html"].page().runJavaScript(jscmd)

    # html controll functions
    def makeStoreItem(self, ok):
        if ok:
            widget = self.widgetList["widgetStoreMain.html"]
            jscmd = "clearStoreItem()"
            widget.page().runJavaScript(jscmd)
            self.itemList = getStoreItem(self.storeid)
            idIter = 0
            for i in self.itemList:
                jscmd = "addStoreItem(\'{itemId}\', \'{imgUrl}\', \'{itemName}\'," \
                        " \'{itemPrice}\', \'{badge}\', \'{intro}\'" \
                        ", {available}, {contribution})"\
                    .format(itemId=idIter, imgUrl=i["itemImgUrl"], itemName=i["itemName"],
                            itemPrice=i["itemPrice"], badge="Hot!", intro="",
                            available=i["itemAvailable"], contribution=i["itemContributionAmount"])
                widget.page().runJavaScript(jscmd)
                idIter = idIter+1

    def addBagItem(self, itemNum):
        item = self.itemList[itemNum]
        self.bag.append(item)

        self.totalCost = self.totalCost + item["itemPrice"]
        self.itemCnt = self.itemCnt + 1

        jscmd = "addItem(\'{itemId}\', \'{itemName}\', \'{itemPrice}\')" \
            .format(itemId=itemNum, itemName=item["itemName"], itemPrice=item["itemPrice"])
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)
        jscmd = "addCost({cost})".format(cost=item["itemPrice"])
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

    def removeBagItem(self, itemNum):
        item = self.itemList[itemNum]
        self.bag.remove(item)  # 첫번째 요소만 제거

        self.totalCost = self.totalCost - item["itemPrice"]
        self.itemCnt = self.itemCnt - 1

        jscmd = "removeCnt(\'{itemId}\')".format(itemId=itemNum)
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)
        jscmd = "removeCost({cost})".format(cost=item["itemPrice"])
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

    def clearBagItem(self):
        self.initVals()
        jscmd = "clearBag()"
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)
        jscmd = "clearCost()"
        self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)

    def makePageConnector(self):
        pc = {"start": self.loadStartPage, "store": self.loadItemListPage,
                         "payment": self.loadPaymentMethodPage, "kakao": self.loadKakaoPayPage,
                         "rfid": self.loadRfidPage, "complete": self.loadCompletePage}
        return pc

    def getPgToken(self, pgToken):
        sendPgToken(pgToken)
        self.loadCompletePage()

    def rfidPaymentVerification(self, data):
        # TODO: 서버로부터 결제 검증
        self.loadCompletePage()


app = QApplication(sys.argv)
w = et()
pageConnector = w.makePageConnector()
# kakao api pg token을 받기 위한 socket thread 함수
t = threading.Thread(target=kakaoSocket.th_socket, args=(w,))
t.start()
print("th_socket thread start")
w.show()
app.exec_()
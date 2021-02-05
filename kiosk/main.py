from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
from ui.main_ui import Ui_mainWindow
from api import *

import sys
import os
import datetime

storeid = 1


class WebEnginePage(QWebEnginePage):
    # js 디버깅 함수 overriding
    # js의 console.log를 python terminal에 표시
    def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
        print("javaScriptConsoleMessage: ", level, message, lineNumber, sourceID)


class CallHandler(QObject):
    @pyqtSlot(QVariant, result=QVariant)
    def nextPage(self, opt):
        try:
            w.movePage(opt)
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    @pyqtSlot(QVariant, result=QVariant)
    def addBagItem(self, itemNum):
        try:
            w.addBagItem(itemNum)
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    @pyqtSlot(QVariant, result=QVariant)
    def removeBagItem(self, itemNum):
        try:
            w.removeBagItem(itemNum)
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    @pyqtSlot(result=QVariant)
    def clearBag(self):
        try:
            w.clearBagItem()
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    @pyqtSlot()
    def fadeout(self):
        w.widgetList["widgetStoreBag.html"].page().runJavaScript("fadeout()")
        w.widgetList["widgetStoreBot.html"].page().runJavaScript("fadeout()")
        w.widgetList["widgetStoreMain.html"].page().runJavaScript("fadeout()")


class et(QMainWindow, Ui_mainWindow):
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

        self.itemCnt = 0
        self.totalCost = 0
        self.itemList = {}
        self.bag = []

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

    def displayTime(self):
        d = datetime.datetime.today()
        date = d.strftime('%Y-%m-%d')
        time = d.strftime('%p %I:%M:%S')
        self.ui.labelDate.setText(date)
        self.ui.labelTime.setText(time)

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

            widget.channel = QWebChannel()
            widget.handler = CallHandler()
            widget.channel.registerObject('handler', widget.handler)
            widget.page().setWebChannel(widget.channel)
            print(path.split('/')[2])
            self.widgetList[path.split('/')[2]] = widget

        # loadFinidhed 설정
        self.widgetList["widgetStoreMain.html"].page().loadFinished.connect(self.makeStoreItem)

        # 레이아웃에 맞게 widgetList의 요소를 연결
        self.ui.pageStartLayout.addWidget(self.widgetList["widgetStart.html"], 0, 0, 1, 1)
        self.ui.pageStoreLayout.addWidget(self.widgetList["widgetStoreMain.html"], 0, 0, 1, 2)
        self.ui.pageStoreLayout.addWidget(self.widgetList["widgetStoreBag.html"], 0, 2, 1, 1)
        # self.widgetList["widgetStoreBot.html"].setMaximumSize(QSize(16777215, 200))
        # self.ui.pageStoreLayout.addWidget(self.widgetList["widgetStoreBot.html"], 1, 0, 1, 3)
        self.ui.pageDonationLayout.addWidget(self.widgetList["widgetDonationMain.html"], 0, 0, 1, 1)
        self.widgetList["widgetDonationBot.html"].setMaximumSize(QSize(16777215, 200))
        self.ui.pageDonationLayout.addWidget(self.widgetList["widgetDonationBot.html"], 1, 0, 1, 1)
        self.ui.pagePaymentLayout.addWidget(self.widgetList["widgetPaymentMain.html"], 0, 0, 1, 1)
        self.ui.pageCompleteLayout.addWidget(self.widgetList["widgetCompletePic.html"], 0, 0, 1, 1)
        self.ui.pageCompleteLayout.addWidget(self.widgetList["widgetCompleteText.html"], 0, 1, 1, 1)



    def movePage(self, opt):
        print("click", opt)
        if opt == "home":
            self.clearBagItem()
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageStart)

        if opt == "store":
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageStore)
            # self.makeStoreItem(storeid)

        if opt == "donation":
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageDonation)
            self.widgetList["widgetDonationBot.html"].page().runJavaScript("fadein()")
            self.widgetList["widgetDonationMain.html"].page().runJavaScript("fadein()")

    def makeStoreItem(self, ok):
        if ok:
            self.itemList = getStoreItem(storeid)
            idIter = 0
            for i in self.itemList:
                jscmd = "addStoreItem(\'{itemId}\', \'{imgUrl}\', \'{itemName}\', \'{itemPrice}\', \'{badge}\', \'{intro}\')"\
                    .format(itemId=idIter, imgUrl=i["itemImgUrl"], itemName=i["itemName"],
                            itemPrice=i["itemPrice"], badge="Hot!", intro="음식설명음식설명음식설명음식설명")
                print(jscmd)
                self.widgetList["widgetStoreMain.html"].page().runJavaScript(jscmd)
                idIter = idIter+1

    def addBagItem(self, itemNum):
        item = self.itemList[itemNum]
        self.bag.append(item)

        jscmd = "addItem(\'{itemId}\', \'{itemName}\', \'{itemPrice}\')"\
                .format(itemId=itemNum, itemName=item["itemName"], itemPrice=item["itemPrice"])
        self.widgetList["widgetStoreBag.html"].page().runJavaScript(jscmd)
        jscmd = "addCost({cost})".format(cost=item["itemPrice"])
        self.widgetList["widgetStoreBag.html"].page().runJavaScript(jscmd)

    def removeBagItem(self, itemNum):
        item = self.itemList[itemNum]
        self.bag.remove(item) # 첫번째 요소만 제거

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


app = QApplication(sys.argv)
w = et()
w.show()
app.exec_()

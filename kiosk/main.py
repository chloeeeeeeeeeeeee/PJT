from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
from ui.main_ui import Ui_mainWindow
from api import *

import sys
import os

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
            w.movePage("next", opt)
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"

    @pyqtSlot()
    def fadeout(self):
        w.widgetList[6].page().runJavaScript("fadeout()")
        w.widgetList[7].page().runJavaScript("fadeout()")
        w.widgetList[8].page().runJavaScript("fadeout()")


class et(QMainWindow, Ui_mainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_mainWindow()
        self.ui.setupUi(self) # main_ui 파일 불러옴
        self.connectHtmlPage() # html 파일을 각 widget에 연결
        self.itemCnt = 0
        self.totalCost = 0
        self.itemList = {}
        self.bag = []

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
        self.widgetList = []

        # file path에 맞는 widget을 생성하여 widgetList에 추가
        for path in htmlPath:
            widget = QWebEngineView()
            widget.setPage(QWebEnginePage(widget))
            widget.setUrl(QUrl.fromLocalFile(path))

            widget.channel = QWebChannel()
            widget.handler = CallHandler()
            widget.channel.registerObject('handler', widget.handler)
            widget.page().setWebChannel(widget.channel)
            self.widgetList.append(widget)

        # 레이아웃에 맞게 widgetList의 요소를 연결
        self.ui.pageStartLayout.addWidget(self.widgetList[5], 0, 0, 1, 1)
        self.ui.pageStoreLayout.addWidget(self.widgetList[8], 0, 0, 1, 2)
        self.ui.pageStoreLayout.addWidget(self.widgetList[6], 0, 2, 1, 1)
        self.widgetList[7].setMaximumSize(QSize(16777215, 200))
        self.ui.pageStoreLayout.addWidget(self.widgetList[7], 1, 0, 1, 3)
        self.ui.pageDonationLayout.addWidget(self.widgetList[3], 0, 0, 1, 1)
        self.widgetList[2].setMaximumSize(QSize(16777215, 200))
        self.ui.pageDonationLayout.addWidget(self.widgetList[2], 1, 0, 1, 1)
        self.ui.pagePaymentLayout.addWidget(self.widgetList[4], 0, 0, 1, 1)
        self.ui.pageCompleteLayout.addWidget(self.widgetList[0], 0, 0, 1, 1)
        self.ui.pageCompleteLayout.addWidget(self.widgetList[1], 0, 1, 1, 1)

    def movePage(self, opt):
        print("click", opt, self.pageIndex)
        if opt == "home":
            self.initVals()
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageStart)
            self.pageIndex = 0

        if opt == "store":
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageStore)
            self.makeStoreItem(storeid)

    def makeStoreItem(self, storeId):
        self.itemList = getStoreItem(storeId)
        idIter = 0
        for i in self.itemList:
            jscmd = "addStoreItem(\'{itemId}\', \'{imgUrl}\', \'{itemName}\', \'{itemPrice}\')"\
                .format(itemId=idIter, imgUrl=i["itemImgUrl"], itemName=i["itemName"], itemPrice=i["itemPrice"])
            print(jscmd)
            self.widgetList[8].page().runJavaScript(jscmd)
            idIter = idIter+1

    def addBagItem(self, itemNum):
        item = self.itemList[itemNum]
        self.bag.append(item)
        jscmd = "addBagItem(\'{itemId}\', \'{imgUrl}\', \'{itemName}\', \'{itemPrice}\')"\
                .format(itemId=itemNum, imgUrl=item["itemImgUrl"], itemName=item["itemName"], itemPrice=item["itemPrice"])
        print(jscmd)
        self.widgetList[6].page().runJavaScript(jscmd)

    def clearBagItem(self):
        self.initVals()
        jscmd = "clearBag()"



app = QApplication(sys.argv)
w = et()
w.show()
app.exec_()

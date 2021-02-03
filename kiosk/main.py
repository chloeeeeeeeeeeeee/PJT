from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
from ui.main_ui import Ui_mainWindow

import sys
import os


class WebEnginePage(QWebEnginePage):
    # js 디버깅 함수 overriding
    # js의 console.log를 python terminal에 표시
    def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
        print("javaScriptConsoleMessage: ", level, message, lineNumber, sourceID)


class CallHandler(QObject):
    @pyqtSlot(result=QVariant)
    def nextPage(self):
        try:
            w.movePage("next")
        except Exception as e:
            print('예외가 발생했습니다.', e)
        return "true"


class et(QMainWindow, Ui_mainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_mainWindow()
        self.ui.setupUi(self) # main_ui 파일 불러옴

        self.connectHtmlPage() # html 파일을 각 widget에 연결
        self.makePageList() # page list 생성

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
        widgetList = []

        # file path에 맞는 widget을 생성하여 widgetList에 추가
        for path in htmlPath:
            widget = QWebEngineView()
            widget.setPage(QWebEnginePage(widget))
            widget.setUrl(QUrl.fromLocalFile(path))

            widget.channel = QWebChannel()
            widget.handler = CallHandler()
            widget.channel.registerObject('handler', widget.handler)
            widget.page().setWebChannel(widget.channel)
            widgetList.append(widget)

        # 레이아웃에 맞게 widgetList의 요소를 연결
        self.ui.pageStartLayout.addWidget(widgetList[5], 0, 0, 1, 1)
        self.ui.pageStoreLayout.addWidget(widgetList[8], 0, 0, 1, 2)
        self.ui.pageStoreLayout.addWidget(widgetList[6], 0, 2, 1, 1)
        widgetList[7].setMaximumSize(QSize(16777215, 200))
        self.ui.pageStoreLayout.addWidget(widgetList[7], 1, 0, 1, 3)
        self.ui.pageDonationLayout.addWidget(widgetList[3], 0, 0, 1, 1)
        self.ui.pageDonationLayout.addWidget(widgetList[2], 1, 0, 1, 1)
        self.ui.pagePaymentLayout.addWidget(widgetList[4], 0, 0, 1, 1)
        self.ui.pageCompleteLayout.addWidget(widgetList[0], 0, 0, 1, 1)
        self.ui.pageCompleteLayout.addWidget(widgetList[1], 0, 1, 1, 1)

    def makePageList(self):
        self.pageIndex = 0
        self.pageList = [self.ui.pageStart, self.ui.pageStore,
                         self.ui.pageDonation, self.ui.pagePayment,
                         self.ui.pageComplete]

    def movePage(self, opt):
        print("click", opt, self.pageIndex)
        if opt == "home":
            self.ui.stackedWidget.setCurrentWidget(self.ui.pageStart)
            self.pageIndex = 0

        if opt == "next":
            self.ui.stackedWidget.setCurrentWidget(self.pageList[self.pageIndex + 1])
            self.pageIndex = self.pageIndex + 1





app = QApplication(sys.argv)
w = et()
w.show()
app.exec_()

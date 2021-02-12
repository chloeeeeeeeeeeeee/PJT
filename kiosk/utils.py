from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtCore import *

import time
import threading
import os


# path 내부의 파일들을 list로 반환
def getHtmlPathList(dirName):
    pathDir = './' + dirName + '/'
    pathList = os.listdir(pathDir)
    pathList.pop(0)
    for i in range(len(pathList)):
        pathList[i] = '/' + dirName + '/' + pathList[i]

    return pathList


def setTimeout(sec, func):
    t = threading.Thread(target=sleeping, args=(sec, func))
    t.start()


def sleeping(sec, func):
    time.sleep(sec)
    func()


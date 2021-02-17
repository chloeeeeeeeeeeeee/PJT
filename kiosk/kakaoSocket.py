from PyQt5.QtCore import *
import socket

# response를 위한 body
body = "loading..."
httpRes = "HTTP/1.1 200\r\n" \
          "Content-Type: text/html; charset=UTF-8\r\n" \
          "Content-Length: {len}\r\n" \
          "\r\n" \
          "{body}".format(len=len(body), body=body)


class getPg(QThread):
    notifyProgress = pyqtSignal(str)

    def __init__(self, parent=None):
        super().__init__(parent)

    def run(self):
        # 소켓 설정
        # localhost:8081로 pgToken과 함께 들어오는 http req를 받기 위한 socket
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind(('localhost', 8081))
        server_socket.listen(0)
        client_socket, addr = server_socket.accept()

        # data 한번만 받아옴
        data = client_socket.recv(65535)
        # request url에서 pgToken 분리
        data = data.decode().split("pg_token=")[1].split(" ")[0]
        # http request에 맞는 response 전송
        client_socket.send(httpRes.encode())

        # 소켓 close
        client_socket.close()
        server_socket.close()

        # pgToken 전송
        self.notifyProgress.emit(data)

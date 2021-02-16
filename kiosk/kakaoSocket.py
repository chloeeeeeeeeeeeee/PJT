from PyQt5.QtCore import *

import socket
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
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind(('localhost', 8081))
        server_socket.listen(0)
        client_socket, addr = server_socket.accept()

        data = client_socket.recv(65535)

        print("data", data)
        data = data.decode().split("pg_token=")[1].split(" ")[0]
        client_socket.send(httpRes.encode())

        print(data)
        client_socket.close()
        server_socket.close()

        self.notifyProgress.emit(data)

import socket


def th_socket(w):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', 3000))
    server_socket.listen(0)

    while True:
        client_socket, addr = server_socket.accept()
        data = client_socket.recv(65535)

        data = data.decode().split("pg_token=")[1].split(" ")[0]
        w.getPgToken(data)


import socket

def th_socket(w):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', 8081))
    server_socket.listen(0)
    client_socket, addr = server_socket.accept()

    while True:
        data = client_socket.recv(65535)
        if data:
            print("data", data)
            data = data.decode().split("pg_token=")[1].split(" ")[0]
            w.getPgToken(data)




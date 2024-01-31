# echo-server.py

import socket

HOST = "192.168.106.248"  # Standard loopback interface address (localhost)
PORT = 8080  # Port to listen on (non-privileged ports are > 1023)

s =  socket.socket(socket.AF_INET, socket.SOCK_STREAM)


s.bind((HOST, PORT))
s.listen()

while(1):
    conn, addr = s.accept()
    print(f"Connected by {addr}")
    data = conn.recv(1)
    print(data)

    conn.close()
            
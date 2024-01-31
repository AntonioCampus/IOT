import socket

# Define the server host and port
host = '192.168.106.248'
port = 8080

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((host, port))
    s.sendall(b"Hello, world")
    data = s.recv(1024)

print(f"Received {data!r}")
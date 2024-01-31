import socket

def start_server():
    # Create a socket object
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Bind the socket to a specific address and port
    server_address = ('192.168.106.43', 8080)
    server_socket.bind(server_address)

    # Listen for incoming connections
    server_socket.listen(1)
    print(f"Server is listening on {server_address[0]}:{server_address[1]}")

    while True:
        # Wait for a connection
        print("Waiting for a connection...")
        client_socket, client_address = server_socket.accept()
        print(f"Accepted connection from {client_address}")

        try:
            # Receive data from the client
            data = client_socket.recv(1024)
            if data:
                print(f"Received data: {data.decode('utf-8')}")

        finally:
            # Clean up the connection
            client_socket.close()

if __name__ == "__main__":
    start_server()

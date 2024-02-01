import paho.mqtt.publish as publish

# MQTT broker details
broker_address = "mqtt.eclipseprojects.io"  # Replace with your MQTT broker address
port = 1883  # Default MQTT port
topic = "test"  # Replace with your desired MQTT topic

# Message to be published
message = "1"

# Publish the message
publish.single(topic, message, hostname=broker_address, port=port)

print("Message published successfully.")
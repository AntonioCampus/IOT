import paho.mqtt.publish as publish



class MQTT:
    @staticmethod
    def publish(broker_address,port,topic,message):
        publish.single(topic, message, hostname=broker_address, port=port)

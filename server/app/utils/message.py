from flask import jsonify

class message:
    def __init__(self,info,data):
        self.data = {
            'info': info,
            'data': data
        }
    
    def jsonMSG(self):
        return jsonify(self.data)
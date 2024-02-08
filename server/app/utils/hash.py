import hashlib



class hash:
    @staticmethod
    def hash_256(data):
        return hashlib.sha256(data.encode()).hexdigest()
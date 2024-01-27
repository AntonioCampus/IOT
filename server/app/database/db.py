import sqlite3


class Database():
    def __init__(self,database,schema):
        self.database =database
        self.connection = sqlite3.connect(self.database)
        with open(schema) as f:
            self.connection.executescript(f.read())
        cur = self.connection.cursor()
        cur.execute("INSERT INTO users (user, pass) VALUES (?, ?)",
                    ('admin', 'password'))
        self.connection.commit()
        self.connection.close()
    
    def GetConnection(self):
        return sqlite3.connect(self.database)



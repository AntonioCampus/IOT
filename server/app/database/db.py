import sqlite3

#prpva
class Database():
    def __init__(self,database,script_path):
        self.database =database
        self.connection = sqlite3.connect(self.database)
    
        with open(script_path+"/schema.sql") as f:
            self.connection.executescript(f.read())

        self.connection.commit()
        self.connection.close()
    
    def OpenConnection(self):
        self.connection =sqlite3.connect(self.database)
        return self.connection

    def CloseConnection(self):
        self.connection.close()

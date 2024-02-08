DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS alerts;
DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS detectors;
DROP TABLE IF EXISTS actuators;
DROP TABLE IF EXISTS zones;
DROP TABLE IF EXISTS zone;
DROP TABLE IF EXISTS ovverides;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    pass TEXT NOT NULL,
    isAdmin BOOLEAN NOT NULL
);


CREATE TABLE ovverides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    zone TEXT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user(userId)
);

CREATE TABLE devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idname TEXT NOT NULL,
    passcode TEXT NOT NULL,
    zone INTEGER,
    FOREIGN KEY (zone) REFERENCES zones(id)
);


CREATE TABLE detectors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY (id) REFERENCES devices(id)
);

CREATE TABLE actuators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY (id) REFERENCES devices(id)
);


CREATE TABLE alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zoneId INTEGER,
    deviceId INTEGER,
    status BOOLEAN,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deviceId) REFERENCES devices(id),
    FOREIGN KEY (zoneId) REFERENCES zones(id)
);




CREATE TABLE zones(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    info TEXT NOT NULL
);


INSERT INTO users (user, pass,isAdmin) VALUES ('admin', 
                    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
                    true);

INSERT INTO users (user, pass,isAdmin) VALUES ('user', 
                    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
                    false); 


INSERT INTO ovverides ( userId,zone,time) VALUES (1, 1,'2024-01-29 11:06:01');
INSERT INTO ovverides ( userId,zone,time) VALUES (1, 1,'2024-04-29 11:06:01');
INSERT INTO ovverides ( userId,zone,time) VALUES (1, 1,'2024-01-39 11:06:01');


INSERT INTO zones (info) VALUES ("Inzio pista");
INSERT INTO zones (info) VALUES ("Fine pista");
INSERT INTO zones (info) VALUES ("Vicino torre di controllo");
INSERT INTO zones (info) VALUES ("Dio ti guarda!!");
INSERT INTO zones (info) VALUES ("Vicino a nitti");

INSERT INTO devices (idname,passcode,zone) VALUES ('actuator1',
                                                    "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
                                                    "1");
INSERT INTO devices (idname,passcode,zone) VALUES ('actuator2',
                                                    "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
                                                    "2");
INSERT INTO devices (idname,passcode,zone) VALUES ('detector1',
                                                    "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
                                                    "1");


INSERT INTO actuators (id) VALUES (1);
INSERT INTO actuators (id) VALUES (2);
INSERT INTO detectors (id) VALUES (3);



insert into alerts (zoneId,deviceId, status, time) values (1,1, false, '2024-01-29 11:06:01');
insert into alerts (zoneId,deviceId, status, time) values (1,1, false, '2024-02-29 11:06:01');
insert into alerts (zoneId,deviceId, status, time) values (1,1, true, '2024-01-29 11:06:01');
insert into alerts (zoneId,deviceId, status, time) values (1,1, false, '2024-04-29 11:06:01');
insert into alerts (zoneId,deviceId, status, time) values (1,1, false, '2024-06-29 11:06:01');
insert into alerts (zoneId,deviceId, status, time) values (1,1, false, '2024-08-29 11:06:01');



'use strict';

const mqtt = require('mqtt');
const mysql = require('mysql');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const options = {
    clientID: 'dai',
    username: 'dai',
    password: '123456',
    host: 'mqtt.wuys.me',
    port: 1883,
};

const client = mqtt.connect(options);
const sensorsTopic = 'esp/dataSensors';
const led1Topic = 'LED1';
const led2Topic = 'LED2';

client.on('connect', () => {
    console.log('MQTT connected!!');
    // client.subscribe(sensorsTopic, () => {
    //     client.on('message', (topic, message, packet) => {
    //         console.log(message.toString());
    //         insertTB(`'${topic}', ${message.toString().split(' ')}`);
    //     });
    // });
});

client.subscribe(sensorsTopic, () => {
    client.on('message', (topic, message, packet) => {
        console.log(message.toString());
        io.sockets.emit('data-sensors', message.toString().split(' '));
        // insertTB(`'${topic}', ${message.toString().split(' ')}`);
    });
});
io.on('connection', socket => {
    console.log(`user ${socket.id} connected`);
});

io.on('connection', socket => {
    socket.on('ledStatus1', msg => {
        io.sockets.emit('led1Status', msg);
        msg === 'on' && client.publish(led1Topic, msg);
        msg === 'off' && client.publish(led1Topic, msg);
    });
    socket.on('ledStatus2', msg => {
        io.sockets.emit('led2Status', msg);
        msg === 'on' && client.publish(led2Topic, msg);
        msg === 'off' && client.publish(led2Topic, msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

// SQL

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'datass',
// });

// conn.connect(err => {
//     if (err) throw err;
//     console.log('Connected!');
//     const sqlCreateTB = `CREATE TABLE datasensors (
//         ID int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//         topic char(50),
//         temp int(10),
//         hum int(10),
//         light int(10),
//         currentTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
//     );`;
//     conn.query(sqlCreateTB, function (err, result) {
//         if (err) throw err;
//         console.log('Table created');
//     });
// });

function insertTB(msg) {
    const sqlInsert = `INSERT INTO datasensors (topic, temp, hum) VALUES (${msg})`;
    conn.query(sqlInsert, (err, results) => {
        if (err) throw err;
    });
}

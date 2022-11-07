const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datass',
});

conn.connect(err => {
    if (err) throw err;
    console.log('Connected!');
    const sqlCreateTB = `CREATE TABLE datasensors (
        ID int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        topic char(50),
        temp int(10),
        hum int(10),
        light int(10),
        currentTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;
    conn.query(sqlCreateTB, function (err, result) {
        if (err) throw err;
        console.log('Table created');
    });
});

function insertTB(msg) {
    const sqlInsert = `INSERT INTO datasensors (topic, temp, hum) VALUES (${msg})`;
    conn.query(sqlInsert, (err, results) => {
        if (err) throw err;
    });
}

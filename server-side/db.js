const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '',
    port: 3306,  
    user: '',
    password: '',
    database: 'coffeeshopdb',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = db;

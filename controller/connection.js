const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'barangay684',
    port: 3306
})
module.exports = pool;
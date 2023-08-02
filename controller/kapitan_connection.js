const mysql = require('mysql2');
require('dotenv').config();
const pool = mysql.createConnection({
    host: 'localhost',
    user: process.env.kapitan_username,
    password: process.env.kapitan_password,
    database: 'barangay684',
    port: 3306
})
module.exports = pool;
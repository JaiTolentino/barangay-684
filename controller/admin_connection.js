const mysql = require('mysql2');
require('dotenv').config();
const pool = mysql.createConnection({
    host: 'localhost',
    user: process.env.admin_username,
    password: process.env.admin_password,
    database: 'brgy684',
    port: 3306
})
module.exports = pool;
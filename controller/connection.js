const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'barangay684',
    port: 3306
})
if (pool) {
    console.log("Database connected successfully");
} else {
    console.log("Database failed to connect");
}
module.exports = pool;
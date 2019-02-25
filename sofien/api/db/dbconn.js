const mysql = require('mysql');


//Creating A Connection To MYSQL---------------------------------------------------->
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'irots'
});



module.exports = connection;
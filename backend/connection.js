const mysql = require('mysql2');


var mysqlConnection = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: 'mytransport',
    multipleStatements: true
})



module.exports = mysqlConnection.promise();
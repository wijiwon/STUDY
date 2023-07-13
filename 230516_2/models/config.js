const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
    user : "root",
    password : "980214",
    database : "test7",
    multipleStatements : false
})

module.exports = mysql;
const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
    user : "root",
    password : "980214",
    multipleStatements : true,
    database : "test8"
})

module.exports = mysql;
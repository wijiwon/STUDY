const mysql2 = require("mysql2/promise");

// mysql 탭 종료 단축키 : ctrl + W

const mysql = mysql2.createPool({
    user : "root",
    password : "980214",
    database : "test4",
    multipleStatements : true 
})

module.exports = mysql;
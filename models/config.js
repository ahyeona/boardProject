const mysql2 = require("mysql2/promise");

const mysql = mysql2.createPool({
    user:"root",
    password:"root",
    database:"board_project",
    multipleStatements:true
});

module.exports = mysql;
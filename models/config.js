const mysql2 = require("mysql2/promise");
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);

const mysql = mysql2.createPool({
    user:"root",
    password:"root",
    database:"board_project",
    multipleStatements:true
});

const sessionStore = new MySQLStore({},mysql);

module.exports = {mysql, sessionStore};
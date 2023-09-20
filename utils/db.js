const mysql = require("mysql2");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "joga_mysql",
});

module.exports = db;
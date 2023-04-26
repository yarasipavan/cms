var mysql = require("mysql2");

// config dotenv to use env variables
require("dotenv").config();
var conn = mysql.createConnection({
  host: process.env.DB_HOST, // assign your host name
  user: process.env.DB_USER, //  assign your database username
  password: process.env.DB_PASSWORD, // assign your database password
  database: process.env.DB_NAME, // assign database Name
  port: process.env.DB_PORT,
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});

module.exports = conn;

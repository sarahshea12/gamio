require("dotenv").config();
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
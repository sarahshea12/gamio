const express = require("express");
var session = require('express-session');
const mysql = require("mysql2");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
var users = []; 


// create sql connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
});

// setting up database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE DATABASE IF NOT EXISTS gamio"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-database created/located");
  });

  var sql = "USE gamio"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-using gamio");
  });

  var sql = "CREATE TABLE IF NOT EXISTS users (name VARCHAR(255), age INT, game VARCHAR(255))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-created/located users table");
  });

  var sql = "CREATE TABLE IF NOT EXISTS events (game VARCHAR(255), date DATE, time TIME, players VARCHAR(255))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-created/located events table");
  });

  var sql = "INSERT INTO users (name, age, game) VALUES ('George', 34, 'Chess')"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-inserted record");
  });

  var sql = "CREATE TABLE IF NOT EXISTS accounts (id int(11) NOT NULL, username varchar(50) NOT NULL, password varchar(255) NOT NULL, email varchar(100) NOT NULL)"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-created/located accounts table");
  });

  sql = "SELECT * from users"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-got records");
    users = result; 
  });

  // var sql = "ALTER TABLE accounts ADD PRIMARY KEY (id)"
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("-altered accounts table");
  // });

//   var sql = "ALTER TABLE accounts MODIFY id int(11) NOT NULL AUTO_INCREMENT"
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("-altered accounts table to modify primary key");
//   });
});

// creating express app 
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: 'keyboard cat', //~so secure~
  resave: false,
  saveUninitialized: true,
}))

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

// require html routes
require("./html-routes.js")(app);

// display home handlebar page
app.get('/', function (req, res) {
  res.render('login');
});

app.listen(PORT, () => {
console.log(
    "==>  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
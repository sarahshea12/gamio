const express = require("express");
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
    password: process.env.password
    // database: "mydb"
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

  var sql = "INSERT INTO users (name, age, game) VALUES ('George', 34, 'Chess')"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-inserted record");
  });
  
  sql = "SELECT * from users"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("-got records");
    users = result; 
  });
});

// creating express app 
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

// require html routes
require("./html-routes.js")(app);

// display home handlebar page
app.get('/', function (req, res) {
  res.render('home',{
    users
  });
});

app.listen(PORT, () => {
console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
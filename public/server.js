const express = require("express");
const mysql = require("mysql2");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
var users = []; 
//create sql connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
    database: "mydb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (name, address) VALUES ('Ryan', 'University City Blvd.')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    sql = "SELECT * from users"
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Got records");
      users = result; 
    });
  });

// Creating express app 
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

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

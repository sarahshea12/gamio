const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// Creating express app 
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
);
});

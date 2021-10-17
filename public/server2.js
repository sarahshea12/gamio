const express = require('express');
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const mysql = require('mysql');
const path = require('path');
const { homedir } = require('os');
const host = 'localhost:3000';
// const port = process.env.PORT || 8080;
const port = 8081;



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootsql',
  database: 'test_db',
  port: '3306',
  insecureAuth: true
})

connection.connect((err) => {
  if (err) {
    throw err
  } else {
    console.log("connected")
  }
})

//connection.query("INSERT INTO users (id,fullName,emailAddress,city,country ) VALUES (3,'Harish Asokan', 'UTD', 'CLT','USA')", (err, rows) => {
//  if(err){
//      throw err
//  } else {
//      console.log("Data Sent");
//     console.log(rows)
// }
// })

sql = "SELECT * from users"
connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Got records");
  users = result;
});

// creating express app 
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('hbs', exphbs({
}));
app.set('view engine', 'hbs');


app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/"
  })
);

// require html routes
// require("./html-routes.js")(app);

// display home handlebar page
app.get('/', function (req, res) {
  console.log("hello world");
  res.render('./home', {
    users
  }
  )
});
// Sign up form 
app.get('/signup', function (req, res) {
  res.render('./signup');
});

// Event page
app.get('/events', function (req, res) {
  res.render('./events');
});


app.listen(port);
console.log(
  "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
  port,
  port
);
 
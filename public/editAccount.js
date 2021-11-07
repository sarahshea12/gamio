var mysql = require('mysql2');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
	database : 'gamio'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

function update(request, response){
    var username = request.body.username; 
    var email; 
    connection.query('SELECT username FROM accounts WHERE (?)', [username], (error, results, fields) => {
        if(error){
            response.send(error);
        }else{
            if(results.length > 0){
                email = results.email; 
                connection.query('UPDATE accounts SET username = (?) WHERE email = (?)' [username, email], (error, results, fields) => {
                    console.log("am updated")
                }
                )

            }
        }
    })
}

module.exports = {update}; 
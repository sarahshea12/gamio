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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function create (request, response){
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email; 
    var id = getRandomInt(1000);
	if (username && password) {
		connection.query('INSERT INTO accounts (id, username, password, email) VALUES (?,?,?,?)', [id, username, password, email], function(error, results, fields) {
            if(error){
				response.send(error);
			} else {
                response.redirect('/events');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
}

module.exports = {create};
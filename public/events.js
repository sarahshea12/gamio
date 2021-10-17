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

function display(request, response){
    connection.query('SELECT * FROM events', function(error, results) {
        if (error){
            response.send(error)
        } else {
            console.log(results)
            response.render('events', {results});
            return results;
        }
	});
}

module.exports = {display};
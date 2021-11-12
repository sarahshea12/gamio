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

function create (request, response){
    var host = request.body.name;
    var date = request.body.date;
    var time = request.body.time;
    var game = request.body.game;

	if (date && time && game && host) {
		connection.query('INSERT INTO events (game, date, time, players) VALUES (?,?,?,?)', [game, date, time, host], function(error, results, fields) {
            if(error){
				response.send(error);
			} else {
                response.redirect('/events');
			}			
			response.end();
		});
	} else {
		response.send('Please complete all fields');
		response.end();
	}
}

module.exports = {create};
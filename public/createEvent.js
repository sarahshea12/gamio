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

let host;

function create(request, response){
    host = request.session.username;
    var date = request.body.date;
    var time = request.body.time;
    var game = request.body.game;
	var contact = request.body.contact; 
	var details = request.body.details; 

	if (date && time && game && host) {
		connection.query('INSERT INTO events (game, date, time, players, contact, details) VALUES (?,?,?,?,?,?)', [game, date, time, host, contact, details], function(error, results, fields) {
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

function updatePlayers (request, response) {
	if (request.session.username != host) {
		console.log(host)
		console.log(request)
		connection.query('UPDATE events SET username = (?) WHERE username = (?)', [newUsername, username], function (error) {
			console.log("in update");
			if(error){
				console.log("error updating" + error);
				response.send(error);  
			}
		})
	} else {
		alert("You are the host of this event!")
	}
}

module.exports = {create, updatePlayers};
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
    let game = request.body.regButton
    let currentPlayers;
    
    connection.query('SELECT players FROM events WHERE game = ?', [game], (error, result) => {
        if(error){
            response.send(error);
        } else {
            let playersList = []
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                playersList.push(row.players)
            });
            currentPlayers = playersList[0].split(" ")
            currentPlayers.forEach(function(player) {
                if (player == request.session.username) {
                    response.send('Player is already registered!');
		            response.end();
                }
            })
            currentPlayers.push(request.session.username)
        }
        if (currentPlayers.length > 0) {
            currentPlayers = currentPlayers.join(" ")
            connection.query('UPDATE events SET players = ? WHERE game = ?', [currentPlayers, game], (error, result) => {
                if(error){
                    response.send(error);
                } else {
                    response.redirect('/profile');
                }
            })
        }
	});
}

module.exports = {update};
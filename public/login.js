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

function login(username, password, request, response){
	this.isLoggedIn = null;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
			console.log("In query callback");
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				console.log("login failed");
				response.send('Incorrect Username and/or Password!');
				this.isLoggedIn = false;  
			}	
			request.session.save();
			console.log(request.session.username);
			response.end();		
		});
	} else {
		response.send('Please enter Username and Password!');
		this.isLoggedIn = false; 
	}

	return this.isLoggedIn; 
}

module.exports = {login};
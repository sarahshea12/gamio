const { ExpressHandlebars } = require("express-handlebars");
const express = require('express');
const login = require('./login');
const { Router } = require("express");
const createAccount = require('./createAccount');


module.exports = function(app) {
    app.get("/signup", (req, res) => {
        res.render("signup");
      });

      app.get("/login", (req, res) => {
        res.render("login");
      });
      
      app.get("/home", (req, res) => {
        res.render("home");
      });

      app.post('/auth', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        login.login(username, password, req, res);
      })

      app.get('/', function(request, response) {
        response.sendFile(path.join(__dirname + '/login.html'));
      });
      
      app.get("/createAccount", (req, res) => {
        res.render("createAccount");
      });

      app.post('/createAccount', function(req, res){
        createAccount.create(req, res);
      })
}


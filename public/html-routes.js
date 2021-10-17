const { ExpressHandlebars } = require("express-handlebars");
const express = require('express');
const login = require('./login');
module.exports = function(app) {
    app.get("/signup", (req, res) => {
        res.render("signup");
      });

      app.get("/login", (req, res) => {
        res.render("login");
      });

      const routes = express.Router(); 
      routes.post('/auth', login);
      app.use(routes)
}

module.exports = function(app) {
  
}


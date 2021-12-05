const login = require('./login');
const createAccount = require('./createAccount');
const editAccount = require('./editAccount');
const events = require('./events')
const createEvent = require('./createEvent')

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
      req.session.loggedin = false;
      req.session.username = "";

      //oh god this is hell tier code
      login.login(username, password, req, res);
    })

    app.get('/', function(request, response) {
      response.render("login");
    });
    
    app.get("/createAccount", (req, res) => {
      res.render("createAccount");
    });

    app.post('/createAccount', function(req, res){
      createAccount.create(req, res);
    })

    app.post('/createEvent', function(req, res){
      createEvent.create(req, res);
    })

    app.get("/events", (req, res) => {
      if (req.session.loggedin) {
        events.display(req, res)
      } else {
        res.render('login')
      }
    });

    app.get("/profile", (req, res) => {
      if (req.session.loggedin) {
        user = req.session.username;
        res.render("profile", {user})
      }else{
        res.render('login')
      }
    })

    app.post("/update", (req, res) => {
      updatePlayers.update(req, res);
    })

    app.post("/profile", (req, res) => {
      editAccount.update(req, res); 
      user = req.body.username;
      res.render("profile", {user})
    }
    ); 
}
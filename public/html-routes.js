const login = require('./login');
const createAccount = require('./createAccount');
const events = require('./events')

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
      response.render("login");
    });
    
    app.get("/createAccount", (req, res) => {
      res.render("createAccount");
    });

    app.post('/createAccount', function(req, res){
      createAccount.create(req, res);
    })

    app.get("/events", (req, res) => {
      events.display(req, res)
     // res.render("events", res);
    });

    // app.get("/events", (req, res) => {
    //   events.display(req, res)
    // });
}
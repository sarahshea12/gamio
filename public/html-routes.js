module.exports = function(app) {
    app.get("/signup", (req, res) => {
        res.render("signup");
      });

    app.get("/events", (req, res) => {
      res.render("events");
    });
}
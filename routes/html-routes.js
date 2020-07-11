var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  app.get("/mapsplayground",(req,res) => {
    res.sendFile(path.join(__dirname,"../public/html/maptest.html"));
  });
  app.get("/", function(req, res) {
    res.render("home");
  });

  app.get("/login", function(req, res) {

    if (req.user) {
      res.redirect("home");
    }
    res.render("login");
  });

  app.get("/search", function(req,res) {
    if (req.user) {
      res.render("search");
    }
    else {
      res.render("signup");
    }
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
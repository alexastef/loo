var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  app.get("/mapsplayground",(req,res) => {
    res.sendFile(path.join(__dirname,"../public/html/maptest.html"));
  });
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("home");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {

    if (req.user) {
      res.redirect("home");
    }
    res.render("login");
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
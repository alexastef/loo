require('dotenv').config();
const { default: Axios } = require('axios');
const axios = require("axios");
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  app.get("/api/nearby/", (req,res) => {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const params = `key=${process.env.MAPS_API_KEY}&location=${lat},${lon}&rankby=distance&type=store`

    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`)
    .then(r => {
      console.log(r.data.results);
      res.json(r.data.results);
    });

  });
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        console.log("307")
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log("401");
        res.status(401).json(err);
      });
  });
};

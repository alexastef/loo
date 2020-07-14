const axios = require("axios");
const db = require("../models");


const path = require("path");
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
      const destination = req.query.destination;
      console.log("(login) destination is " + destination);
      if (destination) {
        res.redirect(destination)
      }
      else {
        res.redirect("/");
      }
    }
    res.render("login");
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.render("logout");
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/search", function(req,res) {
    if (req.user) {
      res.render("search");
    }
    else {
      res.redirect("/login?destination=" + "search");
    }
  });

  app.get("/add/:place_id", async function(req,res) {
    const place_id = req.params.place_id;
    let detailedPlace;

    try {
      const response = await axios.get("http://" + req.headers.host + "/api/oneplace/" + place_id);
      detailedPlace = response.data;
    }
    catch (error) {
      console.log(error);
    }
    if (req.user) {
      res.render("add", { place: detailedPlace });
    }
    else {
      res.render("login");
    }
  });
 
  app.get("/details/:place_id", async function(req,res) {
    const place_id = req.params.place_id;
    let detailedPlace;

    const dbPlace = await db.Bathroom.findOne({ where: { place_id: place_id} });
    // let dbLoo = dbPlace.dataValues
    let dbLoo = dbPlace.dataValues;

    try {
      const response = await axios.get("http://" + req.headers.host + "/api/oneplace/" + place_id);
      detailedPlace = response.data;
    }
    catch (error) {
      console.log(error);
    }
    if (req.user) {
      res.render("details", { place: detailedPlace, dbPlace: dbLoo });
      
    }
    else {
      res.redirect("/login?destination=" + "details/" + place_id);
    }
  });

  app.get("/details/:place_id", async function(req,res) {
    const place_id = req.params.place_id;
    let detailedPlace;

    db.Bathroom.findOne({ where: { place_id: req.params.place.id} }).then((dbPlace) => {
      console.log(dbPlace);
    });

     try {
      const response = await axios.get("http://" + req.headers.host + "/api/oneplace/" + place_id);
      detailedPlace = response.data;
    }
    catch (error) {
      console.log(error);
    }
    if (req.user) {
      res.render("details", { place: detailedPlace });
    }
    else {
      res.render("login");
    }
  });
}

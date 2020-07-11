require('dotenv').config();
const { default: Axios } = require('axios');
const axios = require("axios");
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  async function placeDetails (places) {
    const promises = places.map(async place => {
      const fields = "name,formatted_phone_number,formatted_address,geometry,photo,place_id"
      const detailedParams = `place_id=${place.place_id}&fields=${fields}&key=${process.env.MAPS_API_KEY}`;
      const detailedQuery = `https://maps.googleapis.com/maps/api/place/details/json?${detailedParams}`;

      const response = await axios.get(detailedQuery);//.then((detailedPlace) => {
      return response.data.result;
    });
    const detailedPlaces = await Promise.all(promises);
    console.log(detailedPlaces);
    //console.log("this number of places: " + detailedPlaces.length);
    return detailedPlaces;
  }
  app.get("/api/nearby/", (req,res) => {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const params = `key=${process.env.MAPS_API_KEY}&location=${lat},${lon}&rankby=distance&type=store`
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`)
    .then(async r => {
      //console.log(r.data.results);
      //res.json(r.data.results);
      const places = r.data.results;
      const detailedPlaces = await placeDetails(places);
      console.log(detailedPlaces);
      res.json(detailedPlaces);
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
    console.log("starting up signup.")
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

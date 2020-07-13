require('dotenv').config();
const { default: Axios } = require('axios');
const axios = require("axios");
const db = require("../models");
const passport = require("../config/passport");
// const bathroom = require('../models/bathroom');

module.exports = function (app) {
  async function placeDetails(places) {
    const promises = places.map(async place => {
      const fields = "name,formatted_phone_number,formatted_address,geometry,photo,place_id"
      const detailedParams = `place_id=${place.place_id}&fields=${fields}&key=${process.env.MAPS_API_KEY}`;
      const detailedQuery = `https://maps.googleapis.com/maps/api/place/details/json?${detailedParams}`;

      const response = await axios.get(detailedQuery);
      const detailedPlace = response.data.result;

      return detailedPlace;
    });
    const detailedPlaces = await Promise.all(promises);
    return detailedPlaces;
  }

  app.get("/api/photo/:photo", async (req,res) => {

    const photoReference = req.params.photo;
    const photoParams = `key=${process.env.MAPS_API_KEY}&photoreference=${photoReference}&maxheight=300`
    const photoQuery = `https://maps.googleapis.com/maps/api/place/photo?${photoParams}`;

    let photo;
    try {
      photo = await axios.get(photoQuery);
      res.send(photo.request.res.responseUrl);
    }
    catch (error) {
      console.log(error);
      res.send(error);
    }
  });

  app.get("/api/nearby/:source", (req, res) => {
    const source = req.params.source;
    console.log("calling from", source); 
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const params = `key=${process.env.MAPS_API_KEY}&location=${lat},${lon}&rankby=distance&type=store`
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`)
      .then(async r => {
        const places = r.data.results;
        const detailedPlaces = await placeDetails(places);

        if (source === "home") {
          // NEED TO REMOVE PLACES THAT ARE NOT IN OUR DATABASE
          // res.json(detailedPlaces);
          // console.log(db.Bathroom);
          db.Bathroom.findAll({}).then((dbBathrooms) => {
            res.json({dbBathrooms, detailedPlaces});
          });
        }
        else {
          res.json(detailedPlaces);
        }

      });
  });

  app.get("/api/oneplace/:place_id", async function (req,res) {
    const place_id = req.params.place_id;

    const fields = "name,formatted_phone_number,formatted_address,geometry,photo,place_id"
    const detailedParams = `place_id=${place_id}&fields=${fields}&key=${process.env.MAPS_API_KEY}`;
    const detailedQuery = `https://maps.googleapis.com/maps/api/place/details/json?${detailedParams}`;

    const response = await axios.get(detailedQuery);
    const detailedPlace = response.data.result;

    res.json(detailedPlace);
  });


  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });
  app.post("/api/signup", function (req, res) {
    console.log("starting up signup.")
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        console.log("307")
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log("401");
        res.status(401).json(err);
      });
  });
  app.post("/api/bathroom", function(req, res) {
    console.log("adding a new loo...");
    db.Bathroom.create(req.body).then(function(newLoo) {
      res.json(newLoo);
    }).then(() => console.log("loo added successfully"));
  });
};

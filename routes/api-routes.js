require('dotenv').config();
const { default: Axios } = require('axios');
const axios = require("axios");
const db = require("../models");
const passport = require("../config/passport");
const bathroom = require('../models/bathroom');
const Sequelize = require('sequelize');
const path = require("path");

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

  async function textSearch(term,type,lat,lng) {

    const fields = `fields=name,formatted_address,formatted_phone_number,geometry`;
    const location = `location=${lat},${lng}`;
    const radius = `radius=1000`
    const typeOrQuery = term === "" ? `type=${type}` : `query=${term}`
    const params = `${fields}&${location}&${radius}&${typeOrQuery}`
    const searchParameters = `&key=${process.env.MAPS_API_KEY}&${params}`;
    const query = `https://maps.googleapis.com/maps/api/place/textsearch/json?${searchParameters}`;

    console.log(query);

    const response = await axios.get(query);
    const places = response.data.results;

    //temporarily remove photos
    // places.forEach((place) => {
    //   console.log(place.name);
    //   console.log(place.types);
    // });

    return places;
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

  app.get("/api/nearby/:source", async (req, res) => {
    const source = req.params.source;
    console.log("calling from", source); 
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    if (process.env.DEBUG_MODE === "true") {
      console.log("debug mode get");
      if (source === "home") {
        console.log("source home");
        setTimeout(() => {
          res.sendFile(path.join(__dirname,"../public/mockdata/mockdb.json"));
        },2000);
        return;
      }
      else {
        console.log("source search");
        setTimeout(() => {
          res.sendFile(path.join(__dirname,"../public/mockdata/mockGoogle.json"));
        },2000);
        return;
      }
    }
    console.log("not mock");
    const stores = await textSearch("","store",lat,lon);
    const restaurants = await textSearch("","restaurant",lat,lon);
    
    //const places = [...stores,...restaurants];
    // weave them together so we're not only seeing stores at the top and restaurants at the bottom
    let places = [];
    for (let i = 0; i < 20; i++) {
      places.push(stores[i]);
      places.push(restaurants[i]);
    }

    if (source === "home") {
      
      const place_ids = places.map(place => place.place_id);

      db.Bathroom.findAll({
        where: {
          place_id: {
            [Sequelize.Op.in]: place_ids
          }
        }
      }).then((dbBathrooms) => {
        const bathroomsDataValues = dbBathrooms.map(bathroom => bathroom.dataValues);
        let clientArrayOfBathrooms = [];
        bathroomsDataValues.forEach(dbBathroom => {
          const matchingGooglePlace = places.find(detailedPlace => detailedPlace.place_id === dbBathroom.place_id);
          const mergedBathroom = { ...dbBathroom, ...matchingGooglePlace };
          clientArrayOfBathrooms.push(mergedBathroom)
        });
        console.log(clientArrayOfBathrooms);
        res.json(clientArrayOfBathrooms);
      });
    }
    else {
      res.json(places);
    }

  });

  app.get("/api/oneplace/:place_id", async function (req,res) {
    const place_id = req.params.place_id;

    const fields = "name,formatted_phone_number,formatted_address,geometry,photos,place_id"
    const detailedParams = `place_id=${place_id}&fields=${fields}&key=${process.env.MAPS_API_KEY}`;
    const detailedQuery = `https://maps.googleapis.com/maps/api/place/details/json?${detailedParams}`;

    const response = await axios.get(detailedQuery);
    const detailedPlace = response.data.result;

    res.json(detailedPlace);
  });

  app.get("/api/search/:searchvalue", async function (req,res) {
    const term = req.params.searchvalue;
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const results = await textSearch(term,"",lat,lon);
    console.log("results.length", results.length);
    res.json(results)
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

 app.post("/api/login", passport.authenticate("local", { successRedirect: '/', failureRedirect:'/login'}),
function (req, res) {
   console.log(req.user);
 res.json(req.user);
 // res.redirect('/users/' + req.user.email);
  //});
 // app.post("/api/login", passport.authenticate("local"), function (req, res) {
  // res.json(req.user);
 });

  app.post("/api/signup", function (req, res) {
    console.log("starting up signup.")
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(function () {
      console.log("307 - redirect on successful signup")
      res.redirect(307, "/api/login");
    })
    .catch(function (err) {
      if (err.name === 'SequelizeUniqueConstraintError'){
        const errorMsg = "Email already in use: " + err.fields['users.email'];
        console.log(errorMsg);
        res.status(409).json({message: errorMsg});
        return;
      }
      console.log("We could not sign you up");//'SequelizeUniqueConstraintError' ; err.fields.users.email
      res.status(401).json(err);
    });
  });

  app.post("/api/bathroom", function(req, res) {
    console.log("adding a new loo...");
    db.Bathroom.create(req.body).then(function(newLoo) {
      res.json(newLoo);
    }).then(() => console.log("loo added successfully"));
  });

  app.put("/api/details", function(req, res) {
    console.log("updating loo...");

    db.Bathroom.update({ 
      available: req.body.available,
      needs_key: req.body.needs_key,
      gender_neutral: req.body.gender_neutral,
      handicap_accessible: req.body.handicap_accessible,
      has_water: req.body.has_water,
      has_soap: req.body.has_soap,
      has_paper: req.body.has_paper,
      has_mirror: req.body.has_mirror,
      clean_rating: req.body.clean_rating
    }, {
      where: {
        place_id: req.body.place_id
      }
    }).then(() => {
      res.send("loo updated successfully");
    });
  });
};

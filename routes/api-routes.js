require('dotenv').config();
const { default: Axios } = require('axios');
const axios = require("axios");
const db = require("../models");
const passport = require("../config/passport");
const bathroom = require('../models/bathroom');
const Sequelize = require('sequelize');

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

  async function getPlaces(lat,lon) {
    const places = [];
    let nextPageToken = "";
    const params = `key=${process.env.MAPS_API_KEY}&location=${lat},${lon}&rankby=distance&type=store`
    const query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`;
    for (let i = 0; i < 5; i++) {
      const nextPageTokenParam = nextPageToken !== "" ? `&pagetoken=${nextPageToken}` : "";
      console.log("calling", `${query}${nextPageTokenParam}`);
      const response = await axios.get(`${query}${nextPageTokenParam}`);
      //console.log(response);
      console.log("data.next_page_token", response.data.next_page_token);
      nextPageToken = response.data.next_page_token;
      //console.log("nextPageToken",nextPageToken);
      places.push(...response.data.results);
      //console.log("number of places: " + response.data.results.length);
    }
    console.log("total number of places: " + places.length);
    return places;
  }

  app.get("/api/nearby/:source", (req, res) => {
    const source = req.params.source;
    console.log("calling from", source); 
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const params = `key=${process.env.MAPS_API_KEY}&location=${lat},${lon}&rankby=distance&type=store`
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`)
      .then(async r => {
        const places = r.data.results;
        // console.log(r.data.results);
        //places = await getPlaces(lat,lon);

        //const detailedPlaces = await placeDetails(places);
        //console.log("number of detailed places",detailedPlaces.length);
        if (source === "home") {
          
          const place_ids = places.map(place => place.place_id);
          console.log("place_ids", place_ids);
          db.Bathroom.findAll({
            where: {
              place_id: {
                [Sequelize.Op.in]: place_ids
              }
            }
          }).then((dbBathrooms) => {
            console.log("dbBathrooms", dbBathrooms);
            const bathroomsDataValues = dbBathrooms.map(bathroom => bathroom.dataValues);
            let clientArrayOfBathrooms = [];
            bathroomsDataValues.forEach(dbBathroom => {
              const matchingGooglePlace = places.find(place => place.place_id === dbBathroom.place_id);
              const mergedBathroom = { ...dbBathroom, ...matchingGooglePlace };
              clientArrayOfBathrooms.push(mergedBathroom)
            });
            console.log("client",clientArrayOfBathrooms);
            res.json(clientArrayOfBathrooms);
          });



        //   db.Bathroom.findAll({
        //     where: {
        //         place_id: place_ids
        //     }
        // }).then((dbBathrooms) => {
        //   console.log("test",dbBathrooms);

        // })
          // detailedPlaces.forEach(function(place){
          //   db.Bathroom.findOne({where : {place_id: place.place_id}}).then((dbBathroom) => {
          //     if(dbBathroom){
          // //     }
          // })
            // res.json({dbBathrooms, detailedPlaces});
          // })

          // db.Bathroom({ force: true })
          // .then(() => bathroom.findOne({
          //   where: {
          //     place_id: 'ChIJn5Mo5eZx3IARjnA1CrR8P1c'
          //   }
          // }))
          // .then((dbBathrooms) => {
            // res.json({dbBathrooms, detailedPlaces});
          // }
          //   }
          // }))
          // 
          // .catch(error => console.log(error));
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

  app.get("/api/search/:searchvalue", function (req,res) {
    const term = req.params.searchvalue;

    const searchParameters = `query=${term}&key=${process.env.MAPS_API_KEY}`;
    const query = `https://maps.googleapis.com/maps/api/place/textsearch/json?${searchParameters}`;

    axios.get(query).then(async response => {
      const places = response.data.results;
      const detailedPlaces = await placeDetails(places);
      res.json(detailedPlaces);
    });
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

  // need put request for update
  // app.put("/api/details", function(req, res) {

  // })
};

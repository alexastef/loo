require('dotenv').config();
const { default: Axios } = require('axios');
const axios = require("axios");

module.exports = function(app) {
  app.get("/api/nearby/", (req,res) => {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);

    const params = `key=${process.env.MAPS_API_KEY}&location=${lat},${lon}&rankby=distance&type=establishment`

    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`)
    .then(r => {
      console.log(r.data.results);
      res.json(r.data.results);
    });

  });
}
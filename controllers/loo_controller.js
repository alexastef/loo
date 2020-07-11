// import express and the Bathroom model (bathroom.js) to use its database functions
const express = require("express");
const bathroom = require("../models/bathroom.js");
const router = express.Router();


// route for selecting all entries (this still needs loads of work to be done)
router.get("/", (req, res) => {
    bathroom.selectAll((data) => {
        let bathroom = data.map(({ last_verified, location_name, street_address, available, has_water, has_soap, has_paper, has_mirror, thumbs_up, thumbs_down }) => ({
            last_verified: last_verified,
            location_name: location_name,
            street_address: street_address,
            available: available,
            has_water: has_water,
            has_soap: has_soap,
            has_paper: has_paper,
            has_mirror: has_mirror,
            thumbs_up: thumbs_up,
            thumbs_down: thumbs_down
        }));

        let bathroomObject = { bathroom: bathroom };
        res.render("index", bathroomObject);
    });
});

// route for creating a new entry for adding a loo
router.post("/api/new", (req, res) => {
    let bathroomName = req.body.location_name;

    bathroom.createOne(bathroomName, (result) => {
        res.json( { id: result.insertId } );
    });
});

// export routes for server.js to use.
module.exports = router;
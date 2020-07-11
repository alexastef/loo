// import express and the Bathroom model (bathroom.js) to use its database functions
const express = require("express");
const bathroom = require("../models/bathroom.js");
const bathroom = require("../models/index.js");
const bathroom = require("../models/bathroomReview.js");
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
router.post("/api/loos", (req, res) => {

    bathroom.createOne(["location_name", "street_address", "available"],[req.body.location_name, req.body.street_address, req.body.available], (result) => {
        res.json( { id: result.insertId } );
    });
});

//UPDATE (CRUD) --> UPDATE via PUT request
router.put("/api/loos/:id", (req, res) =>
{
  const condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log("received: " + req.body.available);
 bathroom.updateOne(
    {
      available: req.body.available
    },
    condition, 
    function (result) {
    res.json({ id: result.updateId});
  }
  );
});

// export routes for server.js to use.
module.exports = router;
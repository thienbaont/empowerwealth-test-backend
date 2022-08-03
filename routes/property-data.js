const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This will help us connect to the database
const mongodbClient = require("../mongodb/mongodbClient");

// Collection name
const collectionName = "propertyData";
const getCollection = () => {
    const db = mongodbClient.getDb();
    return db.collection(collectionName);
}

// This section will help you get a list of all the records.
router.route("/property-data").get(function (req, res) {
    const collection = getCollection();
    collection.find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
router.route("/property-data/:id").get(function (req, res) {
    const collection = getCollection();
    const query = { "propertyId": parseInt(req.params.id) };
    collection.findOne(query, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

module.exports = router;
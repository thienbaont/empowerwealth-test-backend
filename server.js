const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({
    path: "./config.env"
});

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/property-data"));

// get driver connection
const mongodbClient = require("./mongodb/mongodbClient");
app.listen(port, () => {
    // perform a database connection when server starts
    mongodbClient.connect(function (err) {
        if (err) console.error(err);
        console.log("Successfully connected to MongoDB.");
    });

    console.log(`Server is running on port: ${port}`);
});
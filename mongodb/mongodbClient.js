const { MongoClient } = require("mongodb");
const connectionString = process.env.CONNECTION_STRING;
const databaseName = process.env.DATABASE_NAME;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;
module.exports = {
    connect: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db)
                _db = db.db(databaseName);

            if (callback)
                return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },
};
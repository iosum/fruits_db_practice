const MongoClient = require('mongodb').MongoClient;
// everything on assert are related to node js app or ios app
// it always to do with testing
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsdb';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // insertDocuments(db, function () {
    //     client.close();
    // }); 
    findDocuments(db, function () {
        client.close();
    });
});


const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
        {
            name: "apple",
            score: 8,
            review: "great"
        },
        {
            name: "banana",
            score: 3,
            review: "bad"
        },
        {
            name: "orange",
            score: 5,
            review: "good"
        }
    ], function (err, result) {
        // make sure there are no errors when inserting docs
        assert.equal(err, null);
        // ensure there are three results in the collection
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(fruits);
    });
}
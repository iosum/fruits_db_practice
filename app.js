const mongoose = require('mongoose');

// Use mongoose to connect to the fruitsDB
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
});

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
});

// Use schema to create mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

const Person = mongoose.model("Person", personSchema);

// Create fruit doc from Fruit model
const fruit = new Fruit ({
    name: "apple",
    rating: 5,
    review: "good"
});

const orange = new Fruit({
    name: "orange",
    rating: 8,
    review: "good orange"
});

const banana = new Fruit({
    name: "banana",
    rating: 6,
    review: "good banana"
});

const kiwi = new Fruit({
    name: "kiwi",
    rating: 7,
    review: "good kiwi"
});

const person = new Person ({
    name: "John",
    age: 37
});

// Save fruit docs into Fruit collection
//fruit.save();
person.save();

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Success!");
//     }
// });

Fruit.find(function(err, fruits) {
    if(err) {
        console.log(err);
    } else {
        mongoose.connection.close()
        console.log(fruits);
        fruits.forEach(function(fruit) {
            console.log(fruit.name);
        });
    }
});

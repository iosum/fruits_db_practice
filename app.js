const mongoose = require('mongoose');

// Use mongoose to connect to the fruitsDB
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check the data entry."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
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

const peach = new Fruit({
    name: "peach",
    rating: 10,
    review: "awesome!"
});

const pineapple = new Fruit({
    name: "pineapple",
    rating: 9,
    review: "awesome pineapple!"
});
pineapple.save();

const mango = new Fruit({
    name: "mango",
    rating: 10,
    review: "awesome mango!"
});
mango.save();

Person.updateOne(
    {
        name: "John",
    },
    {
        favoriteFruit: mango
    },
    function(err) {
        if(err){
            console.log(err);
        } else {
            console.log("done");
        }
    }
);

const person = new Person ({
    name: "Amy",
    age: 12,
    favoriteFruit: pineapple
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


Fruit.deleteOne({
    name: "banana",
    function (err) {
        if(err) {
            console.log(err);
        } else {
            console.log("successfully done."); 
        }
    }
});
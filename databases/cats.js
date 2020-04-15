const mongoose = require('mongoose');

//connect to DB

// mongoose.connect("mongodb://localhost/name_of_db");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name : String,
    age: Number,
    temperament: String,
});

//this enables Cat.find() , Cat.insert, etc.
var Cat = mongoose.model("Cat" , catSchema); 

//add new cat to db

// var george = new Cat({
//     name: "Ms. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!");
//     } else{
//         console.log("WE JUST SAVED A CAT TO THE DB:");
//         console.log(cat);
//     }
// });

//#####################################
// Cat.create({
//     name: "Snow White",
//     age: 15,
//     temperament: "Bland"
// } , function(err, cat){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(cat);
//     }
// });

//#####################################

//retrieve all cats in db and console.log

Cat.find({} , function(err, cats){
    if(err){
        console.log('OH NO, ERROR!');
        console.log(err);
    } else {
        console.log('ALL THE CATS');
        console.log(cats);
    }
});
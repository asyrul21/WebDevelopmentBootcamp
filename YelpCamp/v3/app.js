const express = require('express');
const app = express();
const request = require('request');
const seedDB = require("./seeds");

//DB setup
const mongoose = require('mongoose');
seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v3");

// //SCHEMA setup
var Campground = require("./models/campground");
// var Comment = require("./models/comment");
// var User = require("./models/user");


// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// enable .ejs auto extension
app.set("view engine" , "ejs");


app.get('/' , function(req, res){
    // res.send('This is the landing page!');
    res.render('landing');
});

// INDEX ROUTE : Show all campgrounds
app.get('/campgrounds' , function(req, res){
    // res.send('This is the Campgrounds page!');
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});

// CREATE route : add new campground to DB
app.post('/campgrounds' , function(req, res){
    //get data from form and add to campground array
    // res.send("You HIT THE POST ROUTE!");
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {
        name : name,
        image : image,
        description: desc,
    }
    
    //create a new campground and save to DB
    Campground.create(newCamp, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW : show form to create new campground
app.get('/campgrounds/new' , function(req, res) {
    res.render('new');
})

//SHOW - show more info about one campground
app.get('/campgrounds/:id', function(req, res){
    // res.send("This will be show PAGE!");
    
    //find the campground with procided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           console.log(foundCampground);
           //render show template with that campground
           res.render('show', {campground: foundCampground});
       }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Starting the Yelp Camp Server!');
});
const express = require('express');
const app = express();
const request = require('request');

//DB setup
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");
//SCHEMA setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name : "Granite Hill",
//         image: "https://images.pexels.com/photos/965153/pexels-photo-965153.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     } , function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(campground);
//         }
//     });

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
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           res.render('show', {campground: foundCampground});
       }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Starting the Yelp Camp Server!');
});
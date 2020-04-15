var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');


// INDEX ROUTE : Show all campgrounds
router.get('/' , function(req, res){
    // res.send('This is the Campgrounds page!');
    // Get all campgrounds from DB
    // console.log(req.user);
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });
});

// CREATE route : add new campground to DB
router.post('/' , function(req, res){
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
router.get('/new' , function(req, res) {
    res.render('campgrounds/new');
})

//SHOW - show more info about one campground
router.get('/:id', function(req, res){
    // res.send("This will be show PAGE!");
    
    //find the campground with procided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           console.log(foundCampground);
           //render show template with that campground
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
    
});

module.exports = router;
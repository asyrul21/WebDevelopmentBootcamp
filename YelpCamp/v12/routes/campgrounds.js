var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware/index');



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
router.post('/' , middleware.isLoggedIn, function(req, res){
    //get data from form and add to campground array
    // res.send("You HIT THE POST ROUTE!");
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCamp = {
        name : name,
        image : image,
        description: desc,
        author: author
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
router.get('/new' , middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
})

//SHOW - show more info about one campground
router.get('/:id', function(req, res){
    // res.send("This will be show PAGE!");
    
    //find the campground with procided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err || !foundCampground){
           req.flash('error', 'Campground not found');
           res.redirect('back');
        //   console.log(err);
       } else{
           console.log(foundCampground);
           //render show template with that campground
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
    
});


//EDIT CAMPGROUND ROUTE FORM
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    //is user logged in
        //does user own the campground?
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });  
});

//UPDATE
router.put('/:id', middleware.checkCampgroundOwnership,function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('campgrounds');
        }else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
    
    //redirect somewhere
});


//DESTROY 
router.delete('/:id', middleware.checkCampgroundOwnership,function(req, res){
    // res.send('You are tring to delete something!');
    
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds')
        }
    });
});



module.exports = router;
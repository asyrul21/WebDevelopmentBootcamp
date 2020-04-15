var express = require('express');
var router = express.Router({mergeParams: true});

var Campground = require('../models/campground');
var Comment = require('../models/comment');


// =================================
// ========COMMENT ROUTES===========
router.get("/new", isLoggedIn , function(req, res){
    // res.send("THIS WILL BE THE COMMENT FORM!");
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
    // res.render("comments/new");
    
});

router.post("/", isLoggedIn ,function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //Comment.create
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                        campground.comments.push(comment);
                        campground.save();
                        res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    })
    //create new comment
    //connect new comment to campgroud
    //redirect campground show page
});

//middlewear
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;
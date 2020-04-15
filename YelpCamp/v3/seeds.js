var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f8c97da4e4b1bd_340.jpg",
            description : "Blah Blah Blah"
        },
        {
            name: "Desert Mesa",
            image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f8c97da4e4b1bd_340.jpg",
            description : "Blah Blah Blah"
        },
        {
            name: "Canyon Floor",
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
            description : "Blah Blah Blah"
        },
    
    ];


function seedDB(){
    Campground.remove({}, function(err){ //remove all campgorunds
    if(err){
        console.log(err);
    }
    console.log("Removed campgrounds!");
     //add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            }else {
                console.log("added a campground");
                //create comment for each campground
                Comment.create({
                    text: "This place is great, but I wish there was Internet",
                    author: "Homer"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment!");
                    }
                });
            }
        })
    })
    
});
    
}

module.exports = seedDB;
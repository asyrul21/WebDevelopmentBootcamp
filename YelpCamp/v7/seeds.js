var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b014439cf3c479a5e9b0_340.jpg",
            description : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure"
        },
        {
            name: "Desert Mesa",
            image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104497f9c27ca7efb1bd_340.jpg",
            description : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure"
        },
        {
            name: "Canyon Floor",
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
            description : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure"
        },
    
    ];


function seedDB(){
    Campground.remove({}, function(err){ //remove all campgorunds
    // if(err){
    //     console.log(err);
    // }
    // console.log("Removed campgrounds!");
    //  //add a few campgrounds
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err){
    //             console.log(err);
    //         }else {
    //             console.log("added a campground");
    //             //create comment for each campground
    //             Comment.create({
    //                 text: "This place is great, but I wish there was Internet",
    //                 author: "Homer"
    //             }, function(err, comment){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("Created new comment!");
    //                 }
    //             });
    //         }
    //     })
    // })
    
});
    
}

module.exports = seedDB;
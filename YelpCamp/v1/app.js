const express = require('express');
const app = express();
const request = require('request');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// enable .ejs auto extension
app.set("view engine" , "ejs");

 const campgrounds = [
        {name: "Salmon Creek" , image:"https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144390f8c37eafe4b3_340.jpg"},
        {name: "Granite Hill" , image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f5c97ba0e5bcbe_340.jpg"},
        {name: "Mountain Goat's Rest" , image:"https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c97ba0e5bcbe_340.jpg"},
         {name: "Salmon Creek" , image:"https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144390f8c37eafe4b3_340.jpg"},
        {name: "Granite Hill" , image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f5c97ba0e5bcbe_340.jpg"},
        {name: "Mountain Goat's Rest" , image:"https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c97ba0e5bcbe_340.jpg"},
         {name: "Salmon Creek" , image:"https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144390f8c37eafe4b3_340.jpg"},
        {name: "Granite Hill" , image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f5c97ba0e5bcbe_340.jpg"},
        {name: "Mountain Goat's Rest" , image:"https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c97ba0e5bcbe_340.jpg"},
         {name: "Salmon Creek" , image:"https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144390f8c37eafe4b3_340.jpg"},
        {name: "Granite Hill" , image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104497f5c97ba0e5bcbe_340.jpg"},
        {name: "Mountain Goat's Rest" , image:"https://pixabay.com/get/ea36b7062bf6093ed1584d05fb1d4e97e07ee3d21cac104497f5c97ba0e5bcbe_340.jpg"}
        ];

app.get('/' , function(req, res){
    // res.send('This is the landing page!');
    res.render('landing');
});

app.get('/campgrounds' , function(req, res){
    // res.send('This is the Campgrounds page!');
    
    res.render('campgrounds', {campgrounds : campgrounds});
});

app.post('/campgrounds' , function(req, res){
    //get data from form and add to campground array
    // res.send("You HIT THE POST ROUTE!");
    
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {
        name : name,
        image : image,
    }
    
    campgrounds.push(newCamp);
    
    // redirect to /campground page
    res.redirect('/campgrounds'); //redirect defaults to GET request
});

app.get('/campgrounds/new' , function(req, res) {
    res.render('new');
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Starting the Yelp Camp Server!');
});
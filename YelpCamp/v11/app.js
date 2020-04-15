//npm install --save connect-flash

const express = require('express');
const app = express();
const request = require('request');
const seedDB = require("./seeds");


//flash
const flash = require('connect-flash');
app.use(flash());

//authentication
const   passport        = require('passport'),
        LocalStrategy   = require('passport-local');

//DB setup
const mongoose = require('mongoose');
// seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v3");

// //SCHEMA setup
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

//method override
var methodOverride = require('method-override');
app.use(methodOverride("_method"));


// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// enable .ejs auto extension
app.set("view engine" , "ejs");

//custom stylesheet
app.use(express.static(__dirname + "/public"));


//PASSPORT and auth config
app.use(require("express-session")({
    secret: "Once again Rusty wins the cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================================
//middlewear to enable currentUser for all routes

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//==================================
//==================================
//require all routes
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    indexRoutes         = require('./routes/index');
    
app.use("/" , indexRoutes);
app.use("/campgrounds" , campgroundRoutes); //all routes start with /campgrounds
app.use("/campgrounds/:id/comments" , commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Starting the Yelp Camp Server!');
});
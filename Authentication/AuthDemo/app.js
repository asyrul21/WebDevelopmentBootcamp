// npm install express mongoose --save
// npm install passport passport-local passport-local-mongoose --save
// npm install body-parser express-session --save
// npm install ejs --save

//express
var express = require("express");
var app = express();
app.set('view engine', 'ejs');

//mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/auth_demo_app');

//models
var User = require('./models/user');

//passport
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose"); 


app.use(require("express-session")({
    secret: "Rusty is the best and the cutest dog in the world!",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));




//============================
//==========ROUTES============
//============================


app.get('/', function(req, res){
    res.render("home");
});

app.get('/secret', isLoggedIn, function(req, res){
    res.render("secret");
});

//Auth Routes
//Show sign up form
app.get('/register', function(req, res){
    res.render('register');
});

//handling user sign up
app.post('/register', function(req, res){
    // res.send('Register POST Route!');
    // req.body.username
    // req.body.password
    
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }else {
            passport.authenticate('local')(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});


//login routes
//render login form
app.get('/login', function(req, res){
    res.render('login');
})

//login post route
//middleware
app.post('/login', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
    
});

//logout
app.get('/logout', function(req, res){
    // res.send('OK I will log you out!');
    
    req.logout();
    res.redirect("/");
});

//writing a middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server started!');
})


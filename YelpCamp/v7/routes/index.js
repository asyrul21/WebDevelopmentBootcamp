var express = require('express');
var router = express.Router();

var passport = require('passport');
var User = require('../models/user');


router.get('/' , function(req, res){
    // res.send('This is the landing page!');
    res.render('landing');
});



//=================
// AUTH ROUTES

//show register form
router.get('/register', function(req, res){
    res.render('register');
});

//sign up logic
router.post('/register', function(req, res){
    // res.send('Signing you up...');
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//login
//show form
router.get('/login', function(req, res){
    res.render("login");
});

//login logic
// app.post('logic', middleware , callback);
router.post('/login', passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "login"
}),function(req, res){
    // res.send('LOGIN LOGIC HAPPENS HERE');
});

//LOGOUT route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;

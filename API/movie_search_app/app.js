// http://www.omdbapi.com/?&apikey=thewdb&s=star

var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render('search');
});

app.get("/results" , function(req, res){
    // res.send("Hello it works!");
    
    //get data from query string
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?&apikey=thewdb&s=' + query;
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            // res.send(results["Search"][0]);
            res.render("results", {data: data});
            
        }
    });
    
});


app.listen(process.env.PORT , process.env.IP, function(){
   console.log('Movie App has started!'); 
});
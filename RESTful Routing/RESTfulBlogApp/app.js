// npm install express
// npm install body-parser
// npm install mongoose
// npm install ejs

// npm install method override
// npm install express-sanitizer


var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

// title
// image
// body
// created

// RUN mongod in different tab
//setup mongoose and express // APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //must be after body parser
app.use(methodOverride("_method"));

//SCHEMA
var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : { type : Date, default : Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);

//=====================================
//========== RESTful ROUTES ===========

// Blog.create({
//     title : "Test Blog",
//     image : "https://images.unsplash.com/photo-1506126944674-00c6c192e0a3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffcbd5766dee174472d78bcc388c22f0&auto=format&fit=crop&w=1350&q=80",
//     body : "Hello this is a Blog Post"
// });

app.get("/" , function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs" , function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
              res.render("index", {blogs : blogs});      
        }
    })
});

//NEW ROUTE
app.get("/blogs/new" , function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res){
    //sanitize text area/body of blog
    //sanitization code
    // console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // console.log("========");
    // console.log(req.body);
    
   //create blog
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       }
       else {
           //then redirect to index
           res.redirect("/blogs");
       }
   });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    // res.send("SHOW PAGE!");
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog : foundBlog})
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    // res.send("Update ROUTE!")
    
    //sanitization code
    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    // res.send("YOU HAVE REACHED THE DESTROY ROUTE");
    
    //DESTROY
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else {
            res.redirect("/blogs");
        }
    })
});


//=====================================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
});
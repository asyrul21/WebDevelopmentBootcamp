var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// POST - title, content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// var postModel = mongoose.model("Post", postSchema);
var Post = mongoose.model("Post", postSchema);


// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] //an array of posts
});

var User = mongoose.model("User", userSchema);



//===========================

// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding. Go to potions to learn it!"
// })

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     }else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious!"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }else {
//         console.log(post);
//     }
// });

User.findOne({name: "Hermione Granger"}, function(err, user){
    if(err){
        console.log(err);
    }else {
        // console.log(user); //found user
        user.posts.push({
            title: "3 things I really hate",
            content: "Voldemort, voldemort, and voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            }else {
                console.log(user);
            }
        });
    }
});
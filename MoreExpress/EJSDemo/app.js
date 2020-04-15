var express = require('express');
var app = express();

//for accessing different files
//serve contents of public directory
app.use(express.static("public"));

//to enable specifies ejs files without the .ejs extension
// e.g. home.ejs -> home
app.set("view engine" , "ejs");


app.get("/" , (req, res) => {
    // res.send('<h1>Welcome to the Homepage!!</h1><h2>Blah Blah</h2>');
    // res.render('home.ejs'); //EJS: embedded JS
    res.render('home'); //EJS: embedded JS
});

app.get("/fallinlovewith/:thing" , (req, res) => {
    var thing = req.params.thing;
    // res.send('You fell in love with ' + thing);
    // res.render('love.ejs', {thingVar : thing});
    res.render('love', {thingVar : thing});
});


app.get('/posts', (req, res) => {
    var posts = [
            { title : "Post 1", author : 'Susy'},
            { title : "My adorable pet bunny", author : 'Charlie'},
            { title : "Can you believe this pomsky?", author : 'Colt'},
        ];
        
    res.render('posts', {posts : posts});
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is listening!');
});
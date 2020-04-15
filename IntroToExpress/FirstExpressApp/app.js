var express = require('express');
var app = express();

console.log('EXPRESS!');

// "/" => "Hi There!";
// app.get(<path> , (req, res) => { //callback })
app.get("/", (req, res) => {
    res.send("Hi There!");
    
});

// "/bye" => "Goodbye!"
app.get("/bye" , (req, res) => {
    res.send('Goodbye!');
});

// "/dog" => "MEOW!"
app.get("/dog" , (req, res) => {
    console.log('Someone made a request to /dog!');
    res.send('MEOOWWS');
});

//route parameters
app.get("/r/:subredditName" , (req, res) => {
    console.log('req.params:', req.params);
    
    var subreddit = req.params.subredditName;
    console.log('Subreddit:', subreddit);
    
    // res.send("Welcome to the Subreddit Page!");
    res.send("Welcome to the " + subreddit + " page!");
});

// undefined route //be careful with the order
app.get("*" , (req,res) => {
    res.send('YOU ARE A STAR!!');
});

//Tell Express to llisten for requests (start server)
app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server has started');
});
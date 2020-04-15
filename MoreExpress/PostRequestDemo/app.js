var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs');

var friends = ['Tony' , 'Miranda' , 'Justin', 'Pierre', 'Lily']

app.get('/', (req, res)=>{
    // res.send("HEELLOOOUUU! Welcome to the Post Request Demo Home Page!");
    
    res.render('home');
});

app.get('/friends' , (req,res) => {
//   var friends = ['Tony' , 'Miranda' , 'Justin', 'Pierre', 'Lily']
   res.render('friends', {friends : friends}); 
});

app.post('/addfriend' , (req, res) => {
    // console.log(req.body);
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    // res.send('You have reached the POST route!');

    res.redirect('/friends');
});

app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('Post Request Server Started!');
});
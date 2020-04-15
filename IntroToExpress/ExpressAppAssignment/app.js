var express = require('express');
var app = express();

console.log('Assignment, GO!');

app.get("/", (req, res) => {
    res.send('Hi there, welcome to my assignment!');
});

app.get("/speak/:animal" , (req, res) => {
    console.log('Someone made request to /speak!');
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig : "Oink",
        cow : "Moo",
        dog : "Woof Woof!",
        cat : "Meow",
    }
    
    var sound = sounds[animal];
    
    res.send("The " + animal + " says " + sound);
    
    // if(animal.toLowerCase() === 'pig'){
    //     res.send('The ' + animal + ' says Oink!');
    // }
    // else if(animal.toLowerCase() === 'cow'){
    //     res.send('The ' + animal + ' says Moo!');
    // }
    // else if(animal.toLowerCase() === 'dog'){
    //     res.send('The ' + animal + ' says Woof Woof!');
    // }
    // else
    // {
    //     res.send('animal not found!');
    // }
    
});

app.get('/repeat/:word/:number' , (req, res) => {
    var item = req.params.word;
    var num = Number(req.params.number);
    var sentence = '';
    
    for(var i = 0; i < num; i++){
        // sentence = sentence + item + ' ';
        
        sentence = sentence + item + ' ';

    }
    
    // res.send(arr);
    res.send(sentence);
});

app.get("*", (req, res) => {
    res.send('Sorry, page not found...What are you doing with your life?');
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server has started!');
});
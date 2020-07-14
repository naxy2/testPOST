const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require("fs");
const file = path.join(__dirname, "data.json")

const app = express();
const port = process.env.PORT;


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});


app.use(express.json());

var data = {messages: []} 

if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file));
    console.log("Trovato file: ", data);
}else{
    console.log("File non trovato")
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/messaggi', (req, res) => {
    try{
        res.sendFile(path.join(__dirname, "data.json"));
    }catch (e){
        res.sendStatus(404);
    }
});

app.post('/post/', (req, res) => {
    console.log("Arrivato: " + req.body.nick+": "+req.body.text+" "+req.ip);
    data.messages.push({
        time: new Date(),
        nick: req.body.nick,
        text: req.body.text,
        ip: req.ip
    });
    while (data.messages.length > process.env.maxMSG){data.messages.shift()}
        
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(data)
    res.sendStatus(200);
    res.end();
});

app.post('/reset/', (req, res) =>{
    if (req.body.key == process.env.resetPSW){
        data = {messages: []} 
        fs.writeFileSync(file, JSON.stringify(data , null, 2));
    }
});

app.listen(port, () => {
    console.log("Avvio");
});
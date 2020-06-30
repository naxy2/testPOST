const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require("fs");
const psw = "qwerty";
const file = "./data.json"

const app = express();
const port = 3000;

app.use(express.json());  
app.use(bodyParser.json());       // to support JSON-encoded bodies

var data = {messages: []} 

if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file));
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
    if (req.body.key == psw){
        console.log("Arrivato: " + req.body.text);
        data.messages.push({
            time: new Date(),
            nick: req.body.nick,
            text: req.body.text
        });
        while (data.messages.length > 150){data.messages.shift()}
        
        fs.writeFileSync(file, JSON.stringify(data));
        res.sendStatus(200);
    }else{
        res.sendStatus(401);
    }
    res.end();
});

app.listen(port, () => {
    console.log("Avvio");
});
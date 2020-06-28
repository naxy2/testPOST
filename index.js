const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const psw = "qwerty";

const app = express();
const port = 3000;

app.use(express.json());  
app.use( bodyParser.json() );       // to support JSON-encoded bodies


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/post/', (req, res) => {
    if (req.body.key == psw){
        console.log("Arrivato: " + req.body.text);
        res.sendStatus(200);
    }else{
        res.sendStatus(401);
    }
    res.end();
});

app.listen(port, () => {
    console.log("Avvio");
});
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());  
app.use( bodyParser.json() );       // to support JSON-encoded bodies


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/post/', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
    res.end();
});

app.listen(port, () => {
    console.log("Avvio");
});
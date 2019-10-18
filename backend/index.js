const express = require('express');
const app = express();
const fs = require('fs');

app.get('/json', (req, res) => {
    fs.readFile(__dirname +'/public/json'+ "/user.json", "utf-8", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/json', 'Access-Control-Allow-Origin' : '*'});
        res.end(data);
    });
});

app.get('/json/getuser', (req, res) => {
    let id;
});

const server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("http://localhost:" + port + "/json");
});


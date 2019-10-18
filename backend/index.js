const express = require('express');
const app = express();
const fs = require('fs');

app.get('/json', (req, res) => {
    fs.readFile(__dirname + "/package.json", "utf8", (err, data) => {
        res.end(data);
    });
});

const server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("http://localhost:" + port);
});
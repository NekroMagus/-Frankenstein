const express = require('express');
const app = express();
const fs = require('fs');
const users = require(__dirname + '/public/json/user.json');

app.get('/json', (req, res) => {
    fs.readFile(__dirname +'/public/json'+ "/user.json", "utf-8", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/json', 'Access-Control-Allow-Origin' : '*'});
        res.end(data);
    });
});

app.get('/json/getuser', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
   let data = null;
    try {
        data = JSON.parse(users);
    }catch(e) {
        data =users;
    }
    let userId = users.filter(item => item.userId === req.param.userId);
    res.end(JSON.stringify(userId));
});

const server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("http://localhost:" + port + "/json");
});


const express = require('express');
const app = express();
const fs = require('fs');
const allUsers = require(__dirname + '/public/json/user.json');

app.get('/users', async (req, res) => {
    let userId = req.query.userId;
    if (Number.isInteger(+userId)) {
        let users = allUsers.filter(item => +item.userId === +req.query.userId);
        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify(allUsers));
    }
});

const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log("http://localhost:" + port + "/users");
});
const express = require('express');
const app = express();
const fs = require('fs');
const allUsers = require(__dirname + '/public/json/user.json');

app.get('/users', async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
    if (req.query.userId === undefined || req.query.userId === null) {
        res.end(JSON.stringify(allUsers));
    }
    let user = allUsers.filter(item => +item.userId === +req.query.userId);
    res.end(JSON.stringify(user));
});

const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log("http://localhost:" + port + "/user");
});
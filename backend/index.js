const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const allUsers = require(__dirname + '/public/json/user.json');
const cors = require('cors');

const parser = bodyParser.json();
app.use(cors());

app.get('/users', async (req, res) => {
    let userId = req.query.userId;
    if (Number.isInteger(+userId)) {
        let users = allUsers.filter(item => +item.userId === +req.query.userId);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(allUsers));
    }
});

app.post('/users', parser, async (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.sendStatus(400);
    }
    let maxId = 0;
    allUsers.map(item => {
        maxId = Math.max(item.id, maxId);
    });
    let user = {};
    user = req.body;
    user.id = ++maxId;
    allUsers.push(user);
    fs.writeFile(__dirname + '/public/json/user.json', JSON.stringify(allUsers), (err => {
        if(err) throw err;
    }));
});

app.put('/users', async (req, res) => {

});

app.delete('/users', async (req, res) => {

});

const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log("http://localhost:" + port + "/users");
});
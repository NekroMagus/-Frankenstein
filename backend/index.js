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
    allUsers.push(createUser(req.body));
    fs.writeFile(__dirname + '/public/json/user.json', JSON.stringify(allUsers), (err => {
        if (err) throw err;
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

function createUser(data) {
    let maxId = 0;
    allUsers.map(item => {
        maxId = Math.max(item.id, maxId);
    });
    let user = {};
    user.userId = data.userId;
    user.id = ++maxId;
    user.title = data.title;
    user.body = data.body;
    return user;
}
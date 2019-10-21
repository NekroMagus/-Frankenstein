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
    let id = req.query.id;
    if (Number.isInteger(+userId)) {
        let users = allUsers.filter(item => +item.userId === +req.query.userId);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(users));
    } else if (Number.isInteger(+id)) {
        let users = allUsers.filter(item => +item.id === +req.query.id);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(allUsers));
    }
});

app.post('/users', parser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (findTitle(req.body.title) !== undefined) {
        return res.status(400).send({
            error: "The title is repeated"
        });
    }
    allUsers.push(createUser(req.body));
    fs.writeFileSync(__dirname + '/public/json/user.json', JSON.stringify(allUsers), (err => {
        if (err) throw err;
    }));
    res.status(201).send({
        message: "Post successful"
    });
});

app.put('/users', parser, async (req, res) => {
    let id = req.body.id;
    if (id === null) {
        return res.status(400).send({
            error: "Cannot found post with id: " + req.body.id
        });
    }
    let userIndex = findIndexUserById(id);
    allUsers[userIndex].title = req.body.title;
    allUsers[userIndex].body = req.body.body;
    fs.writeFileSync(__dirname + '/public/json/user.json', JSON.stringify(allUsers), (err => {
        if (err) throw err;
    }));
    res.status(200);
});

app.delete('/users', async (req, res) => {
    let userIndex = findIndexUserById(req.query.id);
    if (+userIndex !== -1) {
        allUsers.splice(userIndex, 1);
        fs.writeFileSync(__dirname + '/public/json/user.json', JSON.stringify(allUsers), (err => {
            if (err) throw err;
        }));
        return res.status(200).send({
            message: "Successful deleted"
        });
    } else {
        return res.status(404).send({
            error: "User not found"
        });
    }
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

function findUserById(id) {
    return allUsers.find(x => x.id === id);
}

function findIndexUserById(id) {
    return allUsers.findIndex(item => +item.id === +id);
}

function findTitle(title) {
    return allUsers.find(item => item.title === title);
}
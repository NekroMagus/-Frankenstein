const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const allUsers = require(__dirname + '/public/json/user.json');
const cors = require('cors');

// connect to mongoose
const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');
const Post = require('./models/post');
const UsersFromDB = require('./models/post');
// set up default mongoose connection to test database
const mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
//get the default connection
const db = mongoose.connection;

//bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const parser = bodyParser.json();
app.use(cors());

app.get('/users', async (req, res) => {
    try {
        let userId = req.query.userId;
        let id = req.query.id;
        if (Number.isInteger(+userId)) {
            let users = allUsers.filter(item => +item.userId === +userId);
            await res.status(200).send(users);
        } else if (Number.isInteger(+id)) {
            let users = allUsers.filter(item => +item.id === +id);
            await res.status(200).send(users);
        } else {
            res.status(200).send(allUsers);
        }
    } catch (err) {
        res.status(err.response.status);
        return res.send(err.message);
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

app.get('/db', async (req, res) => {
    Post.find({}, (err, users) => {
        if (err) return console.log(err);
        res.send(users);
    });
});

app.post('/db', parser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const userId = req.body.userId;
    const title = req.body.title;
    const body = req.body.body;
    Post.findOne({id_title: req.body.id});
    const newPost = new Post({userId: userId, id_post: 1, title: title, body: body});
    await newPost.save(err => {
        if (err) return console.log(err);
        res.status(200).send(newPost);
    });
});

app.delete('/db', async (req, res) => {
    const id = req.query.id;
    Post.findByIdAndDelete(id, (err, post) => {
        if (err) return console.log(err);
        res.status(200).send(post);
    });
});

app.post('/registration', parser, (req, res) => {
    if (!req.body) return res.status(400);
    const login = req.body.login;
    if(UsersFromDB.findOne({login: login}) !== null){
        return res.status(400).send({
            error: "Пользователь с таким логином уже существует"
        });
    }
    const password = req.body.password;
    if (login.length < 5 || login.length > 16) {
         res.status(400).send({
            saved: false,
            error: "Длина логина должна быть от 5 до 16 символов",
            fields: ['login']
        });
    } else if (Number.isInteger(+login[0])) {
        res.status(400).send({
            saved: false,
            error: "Логин не может начинаться с цифры",
            fields: ['login']
        })
    } else {
        bCrypt.hash(password, null, null, (err, hash) => {
            let user = new UsersFromDB({
                login: login,
                password: hash
            });
            user.save(err => {
                if (err) return console.log(err);
                res.status(200).send({
                    saved: true,
                })
            });
        });
    }
});

app.get('/registration', (req, res) => {
    UsersFromDB.find({}, (err, users) => {
        if (err) return console.log(err);
        res.send(users);
    });
});

const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log("http://localhost:" + port + "/users");
    console.log('http://localhost:' + port + '/db');
    console.log('http://localhost:' + port + '/registration');
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
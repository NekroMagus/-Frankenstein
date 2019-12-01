const express = require('express');
const cors = require('cors');
const posts = require('./routes/postsFile');
const postsDB = require('./routes/postsDB');
const registration = require('./routes/registration');
const downloadFiles = require('./routes/downloadFiles');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(posts);
app.use(postsDB);
app.use(downloadFiles);
app.use(registration);
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60 * 60 * 1000 }, resave: false, saveUninitialized: false }));

const server = app.listen(3000, () => {
    let port = server.address().port;
    const local = 'http://localhost:';
    console.log(local + port + "/users");
    console.log(local + port + '/db');
    console.log(local + port + '/registration');
    console.log(local + port + '/downloadFiles');
});
const express = require('express');
const cors = require('cors');
const posts = require('./routes/postsFile');
const postsDB = require('./routes/postsDB');
const registration = require('./routes/registration');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(posts);
app.use(postsDB);
app.use(registration);
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log("http://localhost:" + port + "/users");
    console.log('http://localhost:' + port + '/db');
    console.log('http://localhost:' + port + '/registration');
});
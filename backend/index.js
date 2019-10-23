const express = require('express');
const cors = require('cors');
const posts = require('./routes/postsFile');
const postsDB = require('./routes/postsDB');
const registration = require('./routes/registration');
const app = express();
app.use(cors());
app.use(posts);
app.use(postsDB);
app.use(registration);

const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log("http://localhost:" + port + "/users");
    console.log('http://localhost:' + port + '/db');
    console.log('http://localhost:' + port + '/registration');
});
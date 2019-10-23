const ex = require('../config/index');
const router = ex.routers.router;
let allUsers =  ex.routers.allUsers;
const parser = ex.routers.bodyParser.json();
const fs = ex.routers.fs;

router.get('/users', async (req, res) => {
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
        res.status(404);
        return res.send(err.message);
    }
});

router.post('/users', parser, async (req, res) => {
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

router.put('/users', parser, async (req, res) => {
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

router.delete('/users', async (req, res) => {
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

function createUser(data) {
    let maxId = 0;
    ex.allUsers.map(item => {
        maxId = Math.max(item.id, maxId);
    });
    let user = {};
    user.userId = data.userId;
    user.id = ++maxId;
    user.title = data.title;
    user.body = data.body;
    return user;
}

function findTitle(title) {
    return allUsers.find(item => item.title === title);
}

function findIndexUserById(id) {
    return allUsers.findIndex(item => +item.id === +id);
}

module.exports = router;
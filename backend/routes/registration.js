const ex = require('../config/index');
const router = ex.routers.router;
const UsersFromDB = ex.db.UsersFromDB;
const parser = ex.routers.bodyParser.json();
const bCrypt = ex.db.bCrypt;

router.get('/registration', (req, res) => {
    UsersFromDB.find({}, (err, users) => {
        if (err) return console.log(err);
        res.send(users);
    });
});

router.post('/registration', parser, async (req, res) => {
    if (!req.body) return res.status(400);
    const login = req.body.login;
    let user = await UsersFromDB.findOne({login: login});
    if (user !== null) {
        return res.status(400).send( {
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

module.exports = router;
const ex = require('../config/index');
const passport = require('passport');
const auth = require('./auth');
const Users = require('../models/userAuth');

const router = ex.routers.router;
const UsersFromDB = ex.db.UsersFromDB;
const parser = ex.routers.bodyParser.json();
const bCrypt = ex.db.bCrypt;

ex.routers.router.use(parser);

router.get('/registration',auth.optional , (req, res) => {
    UsersFromDB.find({}, (err, users) => {
        if (err) return console.log(err);
        res.send(users);
    });
});

router.post('/registration',auth.optional, async (req, res) => {
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


//POST new user route (optional, everyone has access)
router.post('/rega', auth.optional, (req, res, next) => {
    const user = req.body;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
    const user = req.body;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return info;
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return Users.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
});


module.exports = router;
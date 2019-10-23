const ex = require('../config/index');
const Post = ex.db.Post;
const router = ex.routers.router;
const parser = ex.routers.bodyParser.json();

router.get('/db', async (req, res) => {
    Post.find({}, (err, users) => {
        if (err) return console.log(err);
        res.send(users);
    });
});

router.post('/db', parser, async (req, res) => {
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

router.delete('/db', async (req, res) => {
    const id = req.query.id;
    Post.findByIdAndDelete(id, (err, post) => {
        if (err) return console.log(err);
        res.status(200).send(post);
    });
});

module.exports = router;
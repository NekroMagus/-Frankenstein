const ex = require('../config/index');
const router = ex.routers.router;

router.get('/downloadFiles', (req, res) => {
    res.download('README.md', 'ReAdMe.md');
});

module.exports = router;
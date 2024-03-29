const router = require("express").Router();

const { PostAll, PostCreate, myPost, PostUpdate, PostDel } = require("../controllers/postController");
const { isLogin } = require("../middleware/loginMiddleware");

router.get('/posts', isLogin, PostAll);

router.get('/myposts', isLogin, myPost);

router.post('/', isLogin, PostCreate)

router.post('/postupdate/:id', isLogin, PostUpdate);

router.post('/postDelete/:id', isLogin, PostDel);

module.exports = router;

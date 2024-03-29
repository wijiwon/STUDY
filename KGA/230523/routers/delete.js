const router = require("express").Router();
const { postDel } = require("../controllers/borderController");
const { isLogin } = require("../middleware/login")

router.get('/:id',isLogin,postDel)

module.exports = router;
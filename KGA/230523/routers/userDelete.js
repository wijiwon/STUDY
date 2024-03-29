const router = require("express").Router();
const { isLogin } = require("../middleware/login");
const { userDel } = require("../controllers/adminController");

router.get('/:id',isLogin,userDel)

module.exports = router;
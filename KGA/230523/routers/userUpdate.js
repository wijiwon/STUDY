const router = require("express").Router();
const { isLogin } = require("../middleware/login");
const { userUpdate } = require("../controllers/adminController");

router.get('/:id',isLogin,userUpdate)

module.exports = router;
const router = require("express").Router();
const { postUpdate, postUpdateView } = require("../controllers/borderController");
const { isLogin } = require("../middleware/login")

router.get('/:id',isLogin,postUpdateView);

router.post('/:id',isLogin,postUpdate)

module.exports = router;
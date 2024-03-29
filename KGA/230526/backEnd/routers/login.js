const router = require("express").Router();
const { Login, viewUser, userUpdate } = require("../controllers/loginController");
const { isLogin } = require("../middleware/loginMiddleware")

router.post('/',Login);

router.get('/view', isLogin, viewUser);

router.post('/update', isLogin, userUpdate);


module.exports = router;
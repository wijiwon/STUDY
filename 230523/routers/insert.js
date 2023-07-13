const router = require("express").Router();
const { postCreate } = require("../controllers/borderController");
const { isLogin } = require("../middleware/login")

router.get('/',isLogin,(req,res)=>{
    res.render("insert");
})
router.post('/', isLogin, postCreate);
module.exports = router;
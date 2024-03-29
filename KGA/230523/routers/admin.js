const router = require("express").Router();
const { isLogin } = require("../middleware/login");
const { UserAll } = require("../controllers/adminController");

router.get('/',isLogin,async(req,res)=>{
    const result = await UserAll(req,res);    
    res.render("admin", {data : result});
})

module.exports = router;
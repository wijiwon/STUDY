const router = require("express").Router();
const { PostAll } = require("../controllers/borderController");
const { isLogin } = require("../middleware/login")

router.get('/',isLogin,async (req,res)=>{
    const result = await PostAll(req,res);
    // console.log("결과", result)
    // console.log("결과2", result.dataValues)
    // console.log("결과2", res)
    res.render("postList", {data:result})
})

module.exports = router;
const router = require("express").Router();
const { postView } = require("../controllers/borderController");
const { isLogin } = require("../middleware/login")

router.get('/:id',isLogin,async (req,res)=>{
    const result = await postView(req,res);
    // console.log("결과", result)
    res.render("view", {data:result})
})

module.exports = router;
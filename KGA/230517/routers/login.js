const { Login, Verify } = require("../controllers/controller");
const router = require("express").Router();

router.get('/',(req,res)=>{
    res.render("login");
})

router.post('/',Login);


router.get("/mypage", Verify, (req,res)=>{
    res.send("토큰이 정상적! 마이페이지로 이동");
})



module.exports = router;
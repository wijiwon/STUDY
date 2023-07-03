const router = require("express").Router();
const { SignUp } = require("../controller/signUpController")

router.get("/", (req,res)=>{
    res.render("signUp");
})

router.post("/", SignUp);

module.exports = router;
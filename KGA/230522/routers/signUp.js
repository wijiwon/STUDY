const router = require("express").Router();
const { sign } = require("crypto");
const {signUp} = require("../controllers/signUpController");


router.get('/',(req,res)=>{
    res.render("signUp");
})

router.post('/',signUp);

module.exports = router;
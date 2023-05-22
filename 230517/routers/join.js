const { SignUp } = require("../controllers/controller");
const router = require("express").Router();

router.get("/",(req,res)=>{
    res.render("join");
})


router.post('/',SignUp);

module.exports = router;
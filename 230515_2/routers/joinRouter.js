const router = require("express").Router();
const {Signup} = require("../controllers/usersController");

router.get('/',(req,res)=>{
    res.render("join");
})

router.post('/',Signup);

module.exports = router;``
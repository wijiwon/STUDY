const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.SignUp = async(req,res)=>{
    const { user_id, user_pw, user_name } = req.body;
    const result = await User.findOne({where: {user_id}});

    if(result != null){
        res.render("이미 가입된 아이디 입니다.")
    }
    
    const hash = bcrypt.hashSync(user_pw, 10);
    User.create({
        user_id: user_id,
        user_pw : hash,
        user_name : user_name,
        user_img : "http://localhost:8080/img/aaa.jpeg"
    })
    res.redirect("http://127.0.0.1:5501/frontEnd/login.html")
}

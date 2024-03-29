const { User } = require("../models");

const bcrypt = require("bcrypt");

exports.SignUp = async(req,res)=>{
    try {
        const { name, age, user_id, user_pw } = req.body;
        const user = await User.findOne({where : {user_id}});
        if(user != null){
            // 유저가 조회된 것. 중복회원 가입을 막는다.
            return res.send("이미 사용중인 아이디 입니다.");
        }

        const hash = bcrypt.hashSync(user_pw, 10);
        await User.create({
            name,
            age,
            user_id,
            user_pw : hash
        })
        res.redirect("http://127.0.0.1:5500/frontEnd/login.html")
    } catch (error) {
        console.log(error);
    }
}
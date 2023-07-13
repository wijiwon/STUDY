const { User } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async(req,res)=>{
    console.log("로그인??")
    try {
        const { user_id, user_pw } = req.body;
        const user = await User.findOne({where:{user_id}});
        if(user == null){
            res.send("가입된 계정이 아닙니다.")
        }
        // console.log("유저>????????????????",user.user_id)
        // console.log("유저2????????????????",user_pw)
        const same = bcrypt.compareSync(user_pw, user.user_pw);
        // console.log("##############", user.id);
        const { user_name, id } = user;
        // console.log("----------------", same);
        if(same){
            let token = jwt.sign({
                user_name,
                id
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn: "10m"
            });
            req.session.access_token = token;
            res.redirect("http://127.0.0.1:5501/frontEnd/mypage.html")
        }
        else{
            console.log("비번틀림")
            res.send("비밀번호가 일치하지 않습니다.")
        }
        
    } catch (error) {
        console.log(error)
    }
}

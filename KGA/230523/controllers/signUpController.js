const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.signUp = async(req,res)=>{
    try {
        const { user_id, user_pw, user_name } = req.body;
        const user = await User.findOne({where: {user_id}});
        if(user != null){
            return res.send("이미 가입된 아이디 입니다.")
        }
        const hash = bcrypt.hashSync(user_pw, 10);
        User.create({
            user_id,
            user_pw : hash,
            user_name,
            user_level: 0
        });

        const admin = await User.findOne({where: {user_level : 3}})
        const adminHash = bcrypt.hashSync("admin123", 10);
        console.log("어드민", admin);
        if(admin == null){
            User.create({
                user_id : "admin",
                user_pw : adminHash,
                user_name : "관리자",
                user_level : 3
            })
        }
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
}
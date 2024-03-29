const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Login = async(req,res)=>{
    try {
        const { user_id, user_pw } = req.body;
        const user = await User.findOne({where: {user_id}});
        if(user == null){
            res.send("가입한 계정이 아닙니다. 다시 확인 해주세요!");
        }

        // req.body의 user_pw와 user_id의 조건으로 검색한 계정의 user_pw의 값이 같으면 true를 반환한다.
        const same = bcrypt.compareSync(user_pw, user.user_pw);
        console.log("유저 레벨",user.user_level)
        if(user.user_level == 0){
            res.send("관리자의 승인이 필요합니다!")
        }

        if(same){
            let token = jwt.sign({
                id: user.id,
                name: user.user_id,
                nick: user.user_name,
                level: user.user_level
            }, process.env.ACCESS_TOKEN_KEY,{
                expiresIn: "3m"
            });
            req.session.access_token = token;
            if(user.user_level == 3){
                res.redirect("/admin");
            }
            res.redirect("/postList");
        }
        else{
            res.send("비밀번호를 확인하세요!");
        }

    } catch (error) {
        console.log(error);
    }
}
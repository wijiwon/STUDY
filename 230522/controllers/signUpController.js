const { User } = require("../models")
const bcrypt = require("bcrypt");
exports.signUp = async (req,res)=>{
    try {
        const { name, age, user_id, user_pw } = req.body
        // 
        const user = await User.findOne({where : {user_id}});
        if(user != null){
            return res.send("err")
        }

        // 비밀번호 암호화를 위해 설치
        // 회원가입
        // hashSync : 동기적으로 실행할 수 있는 메소드
        const hash = bcrypt.hashSync(user_pw, 10);
        console.log(hash, "sdfsdfsdfs")
        // user 테이블에 회운 추가
        User.create({
            name,
            age,
            user_id,
            user_pw : hash,
        });
        res.redirect('/login');
    } catch (error) {
        console.log(error)
    }
}
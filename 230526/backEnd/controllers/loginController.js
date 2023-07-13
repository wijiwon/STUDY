const { User }  = require("../models");

//로그인 bcrypt jsonwebtoken

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async(req,res)=>{
    try {
        const { user_id, user_pw } = req.body;
        console.log(user_id,user_pw);
        const user = await User.findOne({where : {user_id}});
        if(user == null){
            return res.send("가입 안한 아이디임");
        }

        const same = bcrypt.compareSync(user_pw, user.user_pw);

        const { name, age, id } = user;
        if(same){
            let token = jwt.sign({
                name,
                age,
                id
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn : "20m"
            });
            req.session.access_token = token;
            // ' / ': 여기서 경로는 백엔드의 도메인 경로 루트이다.
            // 때문에프론트의 경로를 작성해주자

            // 이런 경우는 배포된 프론트의 경로이다.
            return res.redirect("http://127.0.0.1:5500/frontEnd/main.html")
           
            // 이렇게 리다이렉트를 할 게 아니면 프론트에서 응답 받은 값으로 
            // 조건 분기 처리해서 페이지를 전환시켜주면 된다.
            // return res.send("로그인 완료");
        }
        else{
            return res.send("비밀번호 틀림");
        }
    } catch (error) {
        // console.log("난 이키보드 좋던뎅 ㅎ");
        // console.log("안녕하세요 쑤잌쑤잌 아직안옴 판씨가 가지고있음 ㅎ");
        console.log(error)

        
    }

}

// 유저 정보를 확인할 수 있게함
exports.viewUser = async(req,res)=>{
    const { acc_decoded } = req;
    console.log("변경????????????????????",acc_decoded);
    const user = await User.findOne({
        // where : {name : acc_decoded.name} => where : {id : acc_decoded.id}
        // userUpdate를 실행하면 User테이블의 name값이 변경되어 로그인 시 지장?생성?저장?된 acc_decoded의 name값과
        // 새로 저장한 User테이블의 name값과 달라져 찾을 수 없으므로 고정값인 id로 변경하여 오류를 해결! 아현성생님
        where : {id : acc_decoded.id}
    })
    // json 형태로 데이터를 응답
    res.json({user})
}

exports.userUpdate = async(req,res)=>{
    const {acc_decoded} = req;
    const {user_name, user_age} = req.body;
    const user = await User.update(
        {name: user_name, age: user_age},
        {where : {id: acc_decoded.id}}
    )
    // console.log("----------------",user);


    res.redirect("http://127.0.0.1:5500/frontEnd/mypage.html")

}
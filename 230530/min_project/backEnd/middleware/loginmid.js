const jwt = require("jsonwebtoken");

exports.isLogin = async(req, res, next)=>{
    const  {access_token} = req.session;
    console.log("실행 ㄱㄱ")
    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded)=>{
        if(err){
            console.log(err)
            res.send("다시 로그인해 주세요")
        }
        if(acc_decoded){
            req.acc_decoded = acc_decoded;
            next();
        }
    })
}
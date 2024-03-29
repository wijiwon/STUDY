const router = require("express").Router();
const dot = require("dotenv").config();
const jwt = require('jsonwebtoken');

router.post('/', (req,res)=>{
    console.log(req.session.token);
    const token = req.session.token;
    // 토큰이 유효한지 검증
    // verify(): 토큰이 유효한지 검증하는 메소드
    // 첫 번째 매개변수: 토큰을 전달
    // 두 번째 매개변수: key를 전달
    // 세 번째 매개변수: 콜백 함수 전달
        // 콜백 함수의 첫 번째 매개변수: err 내용 객체
        // 콜백 함수의 두 번째 매개변수: 해석된 객체
    const key = process.env.KEY;
    jwt.verify(token, key, (err, decoded)=>{
        if(err){
            console.log("썩은 토큰");
            res.send("토큰이 썩었거나, 변조된 것이다.");
        }
        else{
            // 해석된 객체
            console.log(decoded);
            res.send(decoded);
        }
    })
})


module.exports = router;
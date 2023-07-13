// jsonwebtoken 설치
// dotenv 섷치
// npm i jsonwebtoken dotenv

// 익스프레스 받아서 실행하고 익스프레스 안에 있는 라우터 객체 실행
const router = require("express").Router(); 

const dot = require("dotenv").config();

const jwt = require('jsonwebtoken');

router.post("/login", (req,res)=>{
    const name = "mr.hong";
    const key = process.env.KEY;

    //토큰을 생성하여 'token'변수에 담는다.
    let token = jwt.sign({
        type : "JWT",
        name : name,
    }, key, {
        // 토큰의 유효시간
        expiresIn : "3m",
        // 토큰 발급자
        issuer : name
    } )
    // 요청받은 세션의 토큰에는 token이 담긴다.
    req.session.token = token;
    res.render("page2");
})

// 다른 곳에 로그인 했으면 로그인을 중복 로그인을 방지해주자
// 데이터베이스에 엑세스 토큰을 저장하고
// 로그인을 하면 엑세스 토큰을 갱신 시켜주는 작업

module.exports = router;
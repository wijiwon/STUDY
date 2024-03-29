// 입장 토큰만 만들어서 로그인 검증 했는데

// 엑세스 토큰만 사용한 방식

// 1. 이용자가 로그인 시도를 하고
// 2. 서버에서 이용자를 확인하고 입장권을 발급해주고
        // JWT 토큰 인증정보를 payload에 할당하고 생성
// 3. 생성한 토큰을 클라이언트에 반환해주고, 클라이언트는 이 입장권을 가지고 있는다.
// 4. 클라이언트가 서버에 요청을 할 때, 이 입장권도 같이 보내서 요청을 시도한다
// 5. 서버는 요청을 받아서 그 입장권이 유효한지 확인하고 유효한 입장권이면 요청을 처리하고 요청에 대한 응답을 해준다.
// 6. 입장권이 정상적인지(썩었거나 변조가 되었는지) 확인하고 썩었으면 다시 재로그인 시킨다.
        // 썩은 입장권이 발견되면 입장권을 새로 산다.

// Refresh token을 같이 사용하면
// Access token만 사용하면 이증 보안이 취약할 수 있어서 다른 사람이 Acess token을 탈취했을 때,
// 토큰의 유효기간이 끝날 때 까지는 막을 수 없다..... 그래서 토큰의 유효기간을 짧게준다.
// 유효기간을 짧게 주게 되면 로그인을 계속 해야한는 번거로움이 발생한다. 따라서 사용자가 이용하기 힘들다.
// Refresh token의 유효기간을 길게주고, Acess token의 유효기간을 짧게 주어서 사용하도록 한다.
// 어려운 개념은 아니고 JWT토큰을 그냥 2개 사용하는 것이다.
// 두 토큰이 모두 유효기간이 끝나면 다시 재로그인이 되어야한다.
// Refresh token은 유효기간을 길게 주고 Acess token의 유효기간이 끝났을 때 발그배주는 역할만 하면 된다.

// Access token과 Refresh token을 같이 사용한 인증방식
// 1. 클라이언트가 로그인
// 2. 서버에서 사용자를 확인하고 입장권 권한 인증 정보를 payload에 할당하고 생성
// Refresh token을 만들어서 데이터베이스에 저장해두고 2개의 토큰 전부 클라이언트에 전달해준다.
// 3. 클라이언트도 두 토큰을 가지고 있고
// 4. 클라이언트가 요청을 할 때 Access token을 전달해서 요청한다.
// 5. 서버는 전달받은 토큰을 확인하고 Access token을 디코드해서 사용자 정보를 확인하고
// 6. 토큰이 정상적인지 썩은 토큰인지 확인한다.
// 7. 변조된 토큰(썩은 토큰)이면 새로 로그인 시킬 수 있게 한다.
// 8. 날짜가 지난 토큰이면, Refresh token으로 다시 재발급 해준다.

// 쉽게 Access token은 우리가 사용하던 토큰 그대로 이고, Refresh token만 추가되었는데 
// Access token의 발급 용도로만 알고있지.

// 오늘 사용할 모듈
// dotenv, express, cookie-parser, jsonwebtoken, ejs
// dotenv express cookie-parser jsonwebtoken ejs

// 1. package-json
// 2. 서버 객체 만들고
// 3. 서버 대기 상태
// 4. view 엔진 경로 설정
// 5. view 엔진 ejs 사용
// 6. body 객체 사용 

const express = require("express");
const path = require("path");
const dot = require("dotenv").config();
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.urlencoded({extended : false}));
app.use(cookies());

app.set("views", path.join(__dirname,"page"));
app.set("view engine", "ejs");

// 더미로 회원가입 한 사람의 정보객체 생성
const user = {
    id: "weee",
    pw: "123"
}

app.get('/',(req,res)=>{
    res.render("login");
})

app.post("/login", (req,res)=>{
    // 요청 객채의 body에 user_id, user_pw를 구조분해할당으로 가져옴
    const {user_id, user_pw} = req.body;
    if(user_id === user.id && user_pw === user.pw){
        // access token 발급
        const AccessToken = jwt.sign({
            // payload
            id : user.id
        }, process.env.ACCESS_TOKEN_KEY,{
            expiresIn : "20s"
        });
        // refresh token 발급
        const refreshToken = jwt.sign({
            id : user.id
        }, process.env.REFRESH_TOKEN_KEY,{
            expiresIn : "1d"
        })
        //쿠키 생성
        //refresh_token이라는 이름의 refreshToken의 값이 담긴 쿠기가 생성되고 이 쿠키의 만료시간은 1일이다.
        res.cookie("refresh_token", refreshToken, {maxAge : 24 * 60 * 60 * 1000});
        res.render("join", {AccessToken});
    }
})

app.post("/refresh", (req,res)=>{
    // 옵션 체이닝. 뒤에 오는 키값이 있는지 먼저 확인하고 값을 호출해서 반환
    // 그래서 크래쉬 방지
    if(req.cookies?.refresh_token){
        // console.log("쿠키",req.cookies)
        const refreshToken = req.cookies.refresh_token;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode)=>{
            // err가 있으면 다시 로그인 하세요!
            if(err){
                // 쿠키에 refresh_token이 존재하지만, 그 값이 변조되었을 경우
                res.send("로그인을 다시 해주세요!");
            }
            else{
                const AccessToken = jwt.sign({
                    id : user.id
                }, process.env.ACCESS_TOKEN_KEY,{
                    expiresIn : "20s"
                })
                res.render("join", {AccessToken});
            };
        })
    }
    // 쿠키에 refresh_token 자체가 없거나 값이 없을 경우
    else{
        res.send("로그인 해주세요!")
    }
})

app.listen(8000, ()=>{
    console.log("서버가 잘 열렸어요!")
})
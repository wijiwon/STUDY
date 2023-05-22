// 프로젝트 시작하기
// package.json
// 서버 객체 생성
// 서버 대기상태
// body 객체 사용
// 세션 사용 (세이브 옵션 다 false)
// dotenv, mysql2,
// view엔진 경로 사용. view엔진은 ejs
// jwt 토큰 사용

const express = require("express");
const path = require("path");
const jwt = require ("jsonwebtoken");
const session = require ("express-session");
const dot = require("dotenv").config();
const app = express();

const joinRouter = require("./routers/joinRouter");
const loginRouter = require("./routers/loginRouter");

app.use(express.urlencoded({extended : false}));

app.set("views", path.join(__dirname,"page"));
app.set("view engine", "ejs");


app.use(session({
    // 세션 발급에 사용할 비밀 키. 노출 안되도록 env로 만들자
    secret : process.env.SESSION_KEY,
    // 세션을 저장하고 불러올 때 세션을 다시 저장할지 여부
    resave : false,
    // 세션을 저장할 때 초기화 여부 
    saveUninitialized : false
}));


app.use('/join', joinRouter);
app.use('/login', loginRouter);

app.listen(8080, ()=>{
    console.log("서버가 무사히 열렸어요!")
})
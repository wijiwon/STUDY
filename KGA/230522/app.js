// 로그인하고 게시판에 글 작성, 수정, 삭제 진행

// 프로젝트 시작
// package.json 생성
// 사용할 모듈. express express-session mysql2 ejs dotenv sequelize
// view엔진 경로설정
// view엔진 ejs로 설정
// body 객체 사용
// 서버 객체 만들고 대기상태

const express = require("express");
const session = require("express-session");
const dot = require("dotenv").config();
const path = require("path");

const app = express();

const { sequelize } = require("./models");
const SignUpRouters = require('./routers/signUp')
const LoginRouters = require('./routers/login')
const BorderRouter = require('./routers/border')

app.set("views", path.join(__dirname,"page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));

app.use(session({
    secret : process.env.SESSION_KEY,                // 세션 키 넣을 것
    resave : false,                                  // 다시 저장할 지 여부
    saveUninitialized : false                        //초기화 할지 여부
}))

// force: 초기화 여부
sequelize.sync({force : false})
.then((e)=>{
    console.log("연결성공")
}).catch((err)=>{
    console.log(err);
})

app.use("/signUp",SignUpRouters);
app.use("/login",LoginRouters);
app.use("/border",BorderRouter);


app.listen(8000,()=>{
    console.log("서버열림")
})
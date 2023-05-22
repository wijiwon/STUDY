// 프로젝트 시작
// package.json만들고
// express 대기상태
// page폴더
// 경로 연결 view
// view 엔진 ejs
// body 객체 사용
const express = require("express");
const path = require("path");
const session = require("express-session");

const pageRouter = require('./routers/page');
const tokenRouter = require('./routers/token');
const verifyRouter = require('./routers/verify');

const app = express();

// 세션을 사용하기위해 설치할 모듈
// npm i express-session
// ---------------------------------

app.set("views",path.join(__dirname,"page"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : false}));
app.use(session({
    // 세선을 발급할때 사용할 키 이것도 나중에는 소스코드 노출 안되게 바꿔놓자.
    secret : process.env.KEY2,
    // 세션이 변경되거나 저장할때나 불러올때 다시 저장할지 여부
    resave : false,
    // 세션에 저장할 때 초기화 여부
    saveUninitialized : true,
}));

app.use(pageRouter);
app.use(tokenRouter);
app.use("/userVerify", verifyRouter);

app.listen(8000,()=>{
    console.log("server 열림~");
})
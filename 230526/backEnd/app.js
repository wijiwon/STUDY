// 로그인 페이지
// 복습
// 프론트랑 백을 폴더를 나눠서 작업을 진행할 예정이다.
// 배포를 해서 프론트를 수정하면 프론트에만 푸쉬
// 백엔드를 수정하면 백에만 푸쉬한다.

// 프로젝트 관리
// 백엔드랑 프론트랑 깃 레파지토리 파놓고 푸쉬

// express express-session cors sequelize mysql2 dotenv bcrypt jsonwebtoken
// 프로젝트 시작 package.json
// 서버 대기상태
// body 객체 사용

const express = require("express");
const cors = require("cors");
const dot = require("dotenv").config();
const session = require("express-session");

const { sequelize } = require("./models");

const loginRouter = require("./routers/login");
const signUpRouter = require("./routers/signUp");
const postRouter = require("./routers/Post");

const app = express();

app.use(express.urlencoded({extended:false}));

app.use(session({
    secret : process.env.SESSION_TOKEN_KEY,
    resave : false,
    saveUninitialized : false
}))

//forse: 데이터 베이스에 있으면 해당 값을 초기화 시킬지 유무를 설정
sequelize.sync({forse : false}).then(()=>{
    console.log("연결성공")
}).catch((err)=>{
    console.log(err)
})

// 다른 도메인에서 악의적으로 접근할 수 없도록
// 도메인 접근 시 발생하는 보안 정책

// 다른 도메인과 통신을 안전하게 유지 시키기 위해서 보안 정책이 있다.
// cors 모듈을 가지고 도메인을 허용 해주자
// Access-control-Allow-origin을 헤더에 포함해서
// 접근을 허용하고 응답하고 브라우저에서 응답을 받은 뒤
// 헤어 값을 확인해서 접근을 허용 또는 차단한다.
app.use(cors({
    // 도메인 허용 옵션
    // 1. 접근을 허용할 도메인을 작성
        // 여러개의 도메인을 허용하고 싶다면 배열의 형태로 넣어주면 된다.
    origin : "http://127.0.0.1:5500",
    // 클라이언트의 요청에 쿠키를 포함할지의 속성
    credentials : true,
}))


// 테스트
app.get("/", (req,res)=>{
    res.send("응답함");
})


app.use("/signUp", signUpRouter);
app.use("/login", loginRouter);
app.use("/Post", postRouter);



app.listen(8080, ()=>{
    console.log("서버열림")
})
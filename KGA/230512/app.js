// 프로젝트 시작

// package.json
// npm init -y

// express, ejs, mysql2 설치
// npm i express ejs mysql2



// 로그인 할 때
// JWT 토큰을 사용합니다.
// JWT 토큰을 존맛탱으로 외우는 방법도 있대! 와우~!
// JWT 토큰: JSON Web Token
// 웹 표준으로 두 객체의 JSON 객체를 사용해서 정보를 안정성 있게 전달해준다.

// JWT는 사용할 정보를 자체적으로 가지고 있다. (우리가 필요한 것들 - 예를 들어 유저 정보 같은)
// JWT로 발급한 토큰은 기본정보(유저의 정보 프로필)
// 그리고 토큰이 정상인지 검증(서명을 포함하고 있다. signature)

// 주로 로그인이 정상적인지 회원 인증 권한에서 사용한다.

// JWT는 유저가 로그인을 요청하면 서버에서 유저의 정보를 가지고
// 정상적인 루트로 로그인을 요청한 유저면 토큰을 발급해서 전달해준다. (영화표, 입장권)
// 유저가 서버에 요청을 할 때, JWT토큰을 포함해서 요청을 하면 서버가
// 요청을 받고 토큰이 썩은 토큰인지 검사를 해서 착한 토큰이면 유저가 요청한
// 작업을 처리해주고 응답해준다.

// JWT를 사용하는 이유: 안정성 있게 정보를 전달해서 요청을 할 수 있다.

// JWT를 생성하면 시용할 모듈이 인코딩과 해싱 작업을 해준다.

// HMAC: 해싱 기법을 적용해서 메시지의 위.변조를 방지하는 기법
// SHA256: 임의의 길이 메시지를 256 비트의 축약된 메시지로 만들어내는 해시 알고리즘

// JWT의 구조

// -----------------------------------------------------------------------------------
// let header = {
//     // 사용하는 해싱 알고리즘
//     alg : "SHA256",
//     // 토큰의 타입
//     type : "JWT"
// }

// let payload = {
//     // 토큰의 이름 제목
//     sub : "2342",
//     // 유저의 이름 (유저 프로필)
//     name: "affsfge",
//     // 토큰이 발급된 시간. 발급된지 얼마나 지났는지
//     lat: "1433"
// }
// -----------------------------------------------------------------------------------

// 비밀키 생성
// let signature = HMACSHA256(BASE64URL(header) + BASE64URL(payload));

// header : 타입과 알고리즘의 정보를 가지고 있고,
// payload: 유저의 정보와 만료 기간이 포함된 객체를 가지고 있다.
// signature: header, payload를 인코딩하고 합쳐소 해싱해 비밀키로 만든다.

// 사용할 모듈 express, jsonwebtoken, dotenv, ejs

// dotenv: 어플리케이션을 만들면서 설정값들을 여기에 작성해둔다.
// 보인. 민감한 정보들을 보안으로 유지하기 위해서 .env 파일에 설정값들을 작성해둔다.
// 예를 들어, 비밀키, 암호, API토큰 등등을 저장해놓는다.


const mysql = require("mysql2");
const express = require("express");
const path = require("path");

// JWT 모듈 가져오기
const jwt = require("jsonwebtoken");

// dotenv 모듈 가져오기. 가져오면서 config 메소드 실행
// .env 파일을 읽어서 적용
const dot = require("dotenv").config();

// JWT 토큰을 만들건데
// 비밀키를 가지고 토큰을 만들어서 암호화를 시킬 예정.
// 그럼 그 비밀키는 탈취가 되면 안되겠져?

// process.env 객체에 우리가 .env파일에 설정한 이름으로 키값이 들어있다.
const KEY = process.env.KEY;

// 로그인을 하면 토큰을 만들어주는 페이지부터 만들자.

const app = express();

// view 엔진의 파일들의 경로
app.set("views", path.join(__dirname, "page"));
// 사용할 view엔진은 ejs 
app.set("view engine", "ejs");
// 바디 객체를 사용할 때 깊은 객체를 사용할 건지. false = 깊은 객체 사용 안함.ㄴ
app.use(express.urlencoded({extended : false}));

app.get("/",(req,res)=>{
    res.render("main");
})

app.post('/login', (req,res)=>{
    // 로그인을 정상적으로 했다 가정하고 토큰을 발급한다.
    // 유저 정보는 객체로 만들어주자.
    const name = "user1";
    const KEY = process.env.KEY;
    // sign()메소드로 JWT 토큰을 생성
    // 첫 번째 매개변수: payload 객체
    // 두 번째 매개변수: 비밀 키
    // 세 번째 매개변수: options (자세한건 인터넷 검색)
    let token = jwt.sign({
        // 타입은 JWT
        type : "JWT",
        // 유저 이름
        name : name
    }, KEY, {
        // 토큰을 유지시킬 유효시간, 만료시간.
        expiresIn : "5m",        // 5분 유지시킬 토큰
        // 토큰 발급한 사람
        issuer : "user1" 
    })
    res.send(JSON.stringify(token));
    // 결과: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwibmFtZSI6InVzZXIxIiwiaWF0IjoxNjgzODU4NTcwLCJleHAiOjE2ODM4NTg4NzAsImlzcyI6InVzZXIxIn0.ygd2xoVm2kX_y5ikXxAfUIupDsYa7MH7a5T_oPJePJQ"
        // 점( . )을 기준으로 나뉜다.
        // header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        // payload: eyJ0eXBlIjoiSldUIiwibmFtZSI6InVzZXIxIiwiaWF0IjoxNjgzODU4NTcwLCJleHAiOjE2ODM4NTg4NzAsImlzcyI6InVzZXIxIn0
        // 서명(signature): ygd2xoVm2kX_y5ikXxAfUIupDsYa7MH7a5T_oPJePJQ
})


app.listen (8080,()=>{
    console.log("서버가 잘 열렸어요!")
})

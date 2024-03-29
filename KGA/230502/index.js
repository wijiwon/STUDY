// http 요청과 응답을 좀 더 편하게 사용할 수 있도록 도와주는 모듈
// express: nodejs에서 제일 인기가 많은 모듈
// nodejs 프레임워크
// http 요청과 응답을 더 쉽게 작성할 수 있도록 도와준다.
// 기본적인 기능만 포함하고 있어서 자유도가 높고 라우팅 미들웨어 등등 
// 개발자가 원하는 방식으로 구성할 수 있다.
// 본인만의 보일러 플레이팅이 가능하다.
// 보일러 플레이팅 : 반복적인 작업을 피할 수 있도록 미리 개발자가 작성을 하고 개발의 생산성을 향상 시킬 수 있다.
// express를 사용해보자.



// express를 설치부터 받자

// 프로젝트 시작할 때 npm init -y 로 npm을 먼저 설치받자

// 설치 명령어
// -----------------------------------------------------------------------------------------
// npm i express
// npm install express
// -----------------------------------------------------------------------------------------
const express = require("express");

//서버 객체가 생성
const app = express();


// //메소드를 사용해서
// app.get()
// //요청의 내용이 get인지 post메소드인지
// app.post()

// 우리가 어제 한 내용 http 모듈을 사용해서
// http.createServer((req,res)=>{
//     URL
//     switch (key) {
//         case "/":
            
//             break;
//         case "/list":
            
//             break;
//         case "/add":
            
//             break;
    
//         default:
//             break;
//     }
// })

app.get('/',(req,res)=>{
    // send 메소드로 응답하고 종료
    res.send("hello nodejs");
})


app.listen(5000,()=>{
    console.log("서버 잘 열림")
})


// package.json 에 스크립트 명령어 작성
// "test": "echo \"Error: no test specified\" && exit 1",
// "start": "node index.js",
// "dev" : "node index.js"

// start 명령어는 === npm start
// 별도의 네이밍으로 우리가 작성한 스크립트 명령어 실행
// 예) dev 가정하면 npm sun dev 이렇게 실행하면 된다.

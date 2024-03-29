// 이미지 업로드
// 이미지 파일을 서버 측 컴퓨터의 폴더에 저장하고
// 파일의 경로를 설정하고 서버측에서 이미지 파일을 가져와서 보여준다.

// 사용할 모듈
// express path multer cors
// multer 모듈을 사용해서 이미지 업로드 할 것. 
// 파일이 저장될 경로나, 파일의 이름, 확장자 등을 설정해서 파일을 저장한다.

// 프로젝트 시작 package.json
// 서버 대기상태

const express = require("express");
const path = require("path");
// cors 도메인 허용하기 위해서 
const cors = require("cors");

const uploadRouter = require("./routers/upload");

const app = express();

app.use(cors({
    // 허용할 도메인을 기입한다. 현재는 라이브서버의 도메인
    origin: "http://127.0.0.1:5500",
    // 요청에서 쿠키를 포함시킬지
    credentials : true,

}))

// body객체 사용할지
app.use(express.urlencoded({extended:false}));

// 정적 파일 경로 추가했던것 처럼
// 폴더명까지 경로 기입
// console.log(" ㅠ퐁경로",path.join(__dirname, "uploads"));
app.use("/img", express.static(path.join(__dirname, "uploads")))

// 요청과 응답에서 json 형식의 데이터를 전달 받았을 때
// 요청과 응답에서 json 파싱을 해서 자바스크립트 객체로 변환시켜주는 미들웨어
// json메서드로 json파싱
app.use(express.json());
app.use("/upload", uploadRouter);


app.listen(8000, ()=>{
    console.log("서버열림")
})

array.forEach(element => {
    
});

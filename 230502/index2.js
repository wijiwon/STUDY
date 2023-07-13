// 여기서 사용할 모듈 express path
// path는 내장모듈
// path 모듈은 경로에 대한 조작을 도와주는 모듈
// 파일 시스템의 경로들을 상대경로나 절대경로를 설정 할 수 있도록 도와주는 모듈
// 상대경로나 절대경로를 쉽게 연결할 수 있도록 메서드를 지원해준다.

const express = require("express");
const path = require("path");

//서버 인스턴스 생성
const app = express();

// get빙식: 요청해서 데이터를 가져오는 메서드
// get 방식으로 / url로 요청을 하면

//메인 페이지
app.get('/',(req,res)=>{    // 루트 경로의 처리
    // join 메서드가 전달받은 경로를 합쳐주는 동작을 해준다.
    const body = path.join(__dirname, "views", "index.html");
    // 파일까지의 경로를 만들어주고
    console.log(body);
    //결과: D:\경일_블록체인\강의\230502\views\index.html
    console.log(__dirname);
    //결과: D:\경일_블록체인\강의\230502
    // res.send("");
    // sendFile: html 파일을 브라우저로 보내줌 브라우저에서 읽을 수 있도록
    res.sendFile(body);
})

// 직접 리스트 페이지와 마이페이지 브라우저에서 확인 가능하도록 라우팅 설정하기!

// 리스트 페이지
app.get('/list',(req,res)=>{    // /list 경로의 처리
    //파일을 가져오는데 path.join 메서드를 사용해서 경로를 만들어주고 가져올 파일의 경로
    const body = path.join(__dirname, "views", "list.html");
    // C\:dsfgrgewr\views\list.html

    // 브라우저로 파일 보내준다.
    res.sendFile(body);
})
// 마이 페이지
app.get('/my',(req,res)=>{
    const body = path.join(__dirname, "views", "my.html");
    res.sendFile(body);
})

app.listen(3000,()=>{
    console.log("서버 열림")
})


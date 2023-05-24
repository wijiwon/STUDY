// 웹 소켓
// 시용하는 이유?
// 양방향 통신을 위해 사용한다.

// 단 방향으로 요청 응답을 받는 구조였는데
// 서버에서 데이터를 푸쉬하는 경우

// 웹 소켓의 장점
// 헤더의 값이 같이 넘어가는데
// 웹 소켓은 한 번 연결할 때 헤더 값을 전송하기 때문에
// 오버헤드(많은 데이터)가 전송되지 않는다.

// 실시간으로 채팅을 구현하거나, 실시간으로 해야하는 작업이 있을 경우 사용

// 가상화폐 거래소의 경우 데이터 전송이 자주 일어나기 때문에 웹 소켓을 사용해서 구현 하는 것이 좋다.

// 효율적인 제이터 통신

// soket.io 라는 라이브러리를 사용해보자
// 페이지에서 덧글을 달았다고 가정했을 때
// 페이지를 새로고침해야 글이 다시 보이는 현상같은
// 웹소켓으로 양방향 통신을 이용해서 실시간으로 글이 보이게 처리를 할 수 있다.

// express socket.io ejs
// 서버 대기
// view엔진 경로
// view ejs

const express = require("express");
const path = require("path");
const socketIo = require("socket.io");

const app = express();

app.set("views", path.join(__dirname,"page"));
app.set("view engine", "ejs");

// 만들어 볼건. 유저가 접속을 한다. 또 다른 유저가 접속을 한다.
// 유저끼리 채팅을 실시간으로 할 수 있도록 제작할 것이다.
app.get('/', (req,res)=>{
    res.render("main");
})


const server = app.listen(6767, ()=>{
    console.log("서버열림")
})


// 대시 시켜놓은 서버 객체를 매개변수로 전달
// 소켓이 서버에 연결된다.
const io = socketIo(server);

let userId = [];

// 소켓들에게 이벤트를 등록한다.
io.sockets.on("connection", (socket)=>{
    // connection: 접속 시, 실행되는 이벤트
    // 접속한 클라이언트의 socket이 매개변수로 들어온다.
    // 유저 한 명이 접속했다느 얘기이다.
    console.log("유저 접속")
    console.log(socket.id);
    // 유저 아이디를 배열에 담아놓는다.
    userId.push(socket.id);
    console.log(userId);

    // 클라이언트 측에서 이벤트가 푸쉬되면 실행시킬 이벤트
    socket.on("hi", (data)=>{
        // 자기 자신에게 이벤트 푸쉬
        console.log(data, "이벤트를 클라이언트에서 보냄")

        // 모든 대상에게 이벤트 푸쉬
        //io.sockets.emit("hi", "모두에게")
        
        // 자신제외 모든 대상에게 이벤트 푸쉬
        socket.broadcast.emit("hi", data.msg)
        // 비밀대화 방을 파서 채팅할 때 하자

        // 대상에게 보낼 예정
        // 이벤트를 푸쉬할 유저의 id\값울 to 메서드의 매개변수로 전달
        io.sockets.to(data.id).emit("hi", data.msg);
    })
    // 유저가 나갔을 때
    socket.on("disconnect", ()=>{
        // 유저가 접속을 해제했을 때 실행되는 이벤트
        console.log("유저 나감");
        userId = userId.filter((value)=> value != socket.id);
        console.log(userId);
    })


})
// 채팅방 만들기
// 방을 따로 나눠서 
// 유저간에 귓속말 제작
// 사용할 모듈 express socket.io ejs
// 서버 대기상태
// view엔진 세팅
// socket 연결

const express = require("express");
const path = require("path");
const socketIo = require("socket.io");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

const server = app.listen(8000, ()=>{
    console.log("서버열림");
})

app.get('/',(req,res)=>{
    res.render("main")
})

// 로그인 시 socket의 아이디 값을 넣어줄 배열 선언
let userId = [];

// 로그인 시 사용자가 입력한 아이디 값을 넣어줄 배열 선언
let username = [];

const io = socketIo(server);

// on 메소드: 현재 접속되어 있는 클라이언트로부터 메시지를 수신한다.
// connection: socket.io의 기본 이벤트, 사용자가 웹사이트에 접속하면 자동으로 발생하는 이벤트이다.
io.on("connection",(socket)=>{ 
    // 유저가 접속 시
    console.log("유저 접속");
    // 유저 접속 시 배열에 유저의 아이디를 추가한다.
    userId.push(socket.id);
    // 현재 접속중인 유저 아이디
    console.log(userId);

    socket.on("joinRoom", (room, name)=>{
        // 방에 유저가 접속 하면
        // join 메서드로 방에 입장 시킨다.
        // 방의 개념
        // .join(): room에 들어가 있는 사람들끼리만 소켓 통신할 수 있도록 지원하는 메소드이다.
        socket.join(room);
        // 현재 방에 있는 클라이언트에게 이벤트 푸쉬
        io.to(room).emit("joinRoom", room, name);
    })



    socket.on("leaveRoom", (room, name)=>{
        // 유저가 방에서 나가면
        // .leave(): 유저가 room에서 제외되게 해주는 메소드이다.
        socket.leave(room);
        // 어느 방에서 누가 나갔는지 해당 방에 있는 유저들에게 push
        io.to(room).emit("leaveRoom", room, name);
    })


    socket.on("disconnect", ()=>{
        console.log("유저 나감")

        let index = userId.findIndex((i)=>{
            return i == socket.id

        })



        // 나간 유저를 제외한 배열을 userId에 넣는다.
        userId = userId.filter((value)=> value != socket.id);
        // 현재 접속중인 유저 아이디
        console.log(userId);

        username.splice(index,1);

        io.emit("user", userId, username)
        // username = username.filter((value)=> value != so)

    })

    socket.on("chat", (room, name, msg)=>{
        io.to(room).emit("chat", name, msg);
    })

    socket.on("chat2", (id, name, msg)=>{
        io.to(id).emit("chat", name, "귓속말: "+msg);
    })

    
    socket.on("user", (name)=>{
        username.push(name)
        console.log(username)
        io.emit("user", userId, username);
    })

    // console.log("-------유저목록--------", userId)
    // console.log("-------유저아이디--------", socket.id)
})
const express = require("express");
const socketio = require("socket.io")
const path = require("path")
app = express();

app.set("views", path.join(__dirname,"page"));
app.set("view engine", "ejs");

const server = app.listen(6767,()=>{
    console.log("서버열림2")
})

// socket 객체 생성
const io = socketio(server);

app.get ('/',(req,res)=>{
    res.render('main2');
})

io.sockets.on("connection", (socket)=>{
    // 클라이언트 접속 했을 때
    socket.on("message", (data)=>{
        // 모든 클라이언트에게 이벤트 푸쉬
        io.sockets.emit("message", data);
    })
})
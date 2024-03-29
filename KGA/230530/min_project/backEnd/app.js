const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dot = require("dotenv").config();
const { sequelize } = require("./models");
const path = require("path")
const app = express();

const signUpRouter = require("./routers/signUp");
const loginRouter = require("./routers/login");
const mypageRouter = require("./routers/mypage");

// app.use(cors({
//     origin : "http://127.0.0.1:5501",
//     credentials : true
// }))


app.use(session({
    secret : process.env.ACCESS_TOKEN_KEY,
    resave : false,
    saveUninitialized : false
}))

app.use(express.urlencoded({extended:false}))

sequelize.sync({forse : false}).then(()=>{
    console.log("시퀄 연결성공")
}).catch((err)=>{
    console.log(err)
})

app.use(cors({
    origin: "http://127.0.0.1:5501",
    credentials : true
}))

app.use("/img", express.static(path.join(__dirname, "upload")))

app.use("/signUp", signUpRouter);
app.use("/login", loginRouter);
app.use("/mypage", mypageRouter);

app.listen(8080, ()=>{
    console.log("서버열림")
})
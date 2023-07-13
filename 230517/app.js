const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const dot = require("dotenv").config();


const loginRouter = require("./routers/login");
const joinRouter = require("./routers/join");
const boardListRouter = require("./routers/boardList");

app.set("views", path.join(__dirname,"page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));

app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false
}))

app.use("/login", loginRouter);
app.use("/join", joinRouter);
app.use("/boardList", boardListRouter);

app.listen(8080,()=>{
    console.log("서버 열림")
})
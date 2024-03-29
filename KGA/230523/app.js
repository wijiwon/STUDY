// npm i express express-session dotenv jsonwebtoken bcrypt mysql2 ejs sequelize

const express = require("express");
const path = require("path");
const dot = require("dotenv").config();
const session = require("express-session");

const app = express();

const { sequelize } = require("./models");

const signUpRouter = require("./routers/signUp");
const loginRouter = require("./routers/login");
const PostListRouter = require("./routers/postList");
const adminRouter = require("./routers/admin");
const insertRouter = require("./routers/insert");
const viewRouter = require("./routers/view");
const deleteRouter = require("./routers/delete");
const updateRouter = require("./routers/update");
const userUpdateRouter = require("./routers/userUpdate");
const userDeleteRouter = require("./routers/userDelete");

app.set("views", path.join(__dirname,"pages"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));

app.use(session({
    secret : process.env.ACCESS_TOKEN_KEY,
    resave : false,
    saveUninitialized : false
}))

sequelize.sync({force: false})
.then((e)=>{
    console.log("sequelize 연결설공");
}).catch((err)=>{
    console.log(err);
})

app.use('/signUp',signUpRouter);
app.use('/login',loginRouter);
app.use('/postList',PostListRouter);
app.use('/admin',adminRouter);
app.use('/insert',insertRouter);
app.use('/view',viewRouter);
app.use('/delete',deleteRouter);
app.use('/update',updateRouter);
app.use('/userUpdate',userUpdateRouter);
app.use('/userDelete',userDeleteRouter);


app.listen(8080,()=>{
    console.log("서버열림")
})
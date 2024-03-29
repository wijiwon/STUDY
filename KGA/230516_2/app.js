// express path mysql2 ejs

const express = require("express");
const path = require("path");
const app = express();

const loginRouter = require('./routers/loginRouter');
const joinRouter = require('./routers/joinRouter');

app.set("views", path.join(__dirname,"pages"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}))

app.use('/login',loginRouter);
app.use('/join',joinRouter);



app.listen(8000,()=>{
    console.log("server on")
})
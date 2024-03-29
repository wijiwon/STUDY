const mysql = require("./config");

exports.UserInit = async()=>{
    try {
        await mysql.query("SELECT * FROM users");
    } catch (error) {
        await mysql.query("CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(128), refresh VARCHAR(256), )");
    }
}

exports.UserSelect = async(user_id)=>{
    try {
        const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?",[user_id]);
        // console.log(result[0])
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

exports.UserInsert = async(user_id,user_pw)=>{
    try {
        const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?",[user_id]);
        console.log(result.length)
        if(result.length !== 0){
            let err = new Error("중복 가입");
            console.log(err);
            return err;
        }
        await mysql.query("INSERT INTO users (user_id,user_pw) VALUES (?,?)",[user_id,user_pw]);
    } catch (error) {
        console.log(error);
    }
}

exports.UserRefresh = async(user_id,refresh)=>{
    try {
        await mysql.query("UPDATE users SET refresh = ? WHERE user_id = ?",[refresh,user_id]);
    } catch (error) {
        console.log(error);
    }
}
const mysql = require("./config");

// 테이블을 생성해주는 함수
exports.userInit = async ()=>{
    try {
        // users 테이블이 있는지 확인
        await mysql.query("SELECT * FROM users");
    } catch (error) {
        const sql = "CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(20), refresh VARCHAR(255))"
        await mysql.query(sql);
    }
}

// 
exports.userList = async ()=>{
    try {
        const [result] = await mysql.query("SELECT * FORM users");
        return result;
    } catch (error) {
        console.log(error);
    }
}

exports.userSelect = async (user_id)=>{
    try {
        const [result] = await mysql.query("SELECT * FROM users WHERE user_id = ?",[user_id]);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

exports.userInsert = async (user_id, user_pw)=>{
    try {
        // 이미 가입한 아이디인지 확인
        const [user] = await mysql.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
        if(user.length != 0){
            // 이미 가입한 아이디임
            // new 동적 할당으로 에러객체 생성
            let err = new Error("중복된 아이디임");
            console.log(err);
            return err;
        }

        // 조건문 통과했으면 해당 아이디가 없는거니까 회원가입 시켜주자
        await mysql.query("INSERT INTO users(user_id, user_pw) VALUE(?,?)",[user_id,user_pw]);
    } catch (error) {
        console.log(error);
    }
}

exports.userPwUpdate = async (user_id, user_pw)=>{
    try {
        await mysql.query("UPDATE users SET user_pw = ? WHERE user_id = ?", [user_pw, user_id]);
    } catch (error) {
        console.log(error);
    }
}

exports.userRefresh = async (user_id, refresh)=>{
    try {
        await mysql.query("UPDATE users SET refresh = ? WHERE user_id = ?", [refresh,user_id]);
    } catch (error) {
        console.log(error);
    }
}

exports.userDelete = async(user_id)=>{
    try {
        await mysql.query("DELETE FROM users WHERE user_id = ?; SET @CUN = 0; UPDATE users SET users.id = @CUN:=@CUN+1; ALTER TABLE users AUTO_INCREMENT = 0;",[user_id])
    } catch (error) {
        console.log(error);
    }
}
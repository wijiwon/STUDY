const {userInit, userList, userInsert, userSelect, userRefresh, userDelete, userPwUpdate } = require("./usersModel");
userInit();

// async function test(){
//     userDelete("aaa");
// };

// test();

module.exports = {userList, userInsert, userSelect, userRefresh, userDelete, userPwUpdate}
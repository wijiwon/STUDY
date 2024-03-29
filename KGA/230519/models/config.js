const dot = require('dotenv').config();

const config = {
    dev: {
        // env에서 USERNAME으로 사용하면 로컬 환경에서의 username을 가져오기 때문에 USERNAME을 사용하면 안된다.
        username: process.env.USERNAMES,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        // dialect: 사용하는 데이터 베이스
        dialect: "mysql"
    }
}
console.log(config);

module.exports = config;
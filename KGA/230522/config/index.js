const config = {
    dev : {
        username : process.env.DATABASE_USERNAME,
        passwoed : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME,
        host : process.env.DATABASE_HOST,          // 나중에 배포를 하게 된다면 데이터베이스 주소를 입력해 줄 예정이다.
        dialect : "mysql"
    }
}

module.exports = config;
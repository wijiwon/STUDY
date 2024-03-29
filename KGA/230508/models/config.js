const mysql2 = require("mysql2/promise");

// 우리가 전에 사용했던 createConnection 메서드는 콜백함수 기반이고
// promise를 반환하지 않았어요
// createConnection : 기본적인 연결을 해주는 메소드. 테스트할 때 사용한다. 단일 클라이언트 접속에 용이.

// 커넥션 풀을 생성하고 관리할 수 있는 메서드
// createPool 메소드로 연결을 관리 할 것.
// promise 객체를 반환한다.
// 많은 클라이언트가 데이터베이스와 통신할 때 요청이 많이 들어와도 성능이 유지되고 여러개의 요청을 처리하는데 좋다.
// 쉽게 말해서 여러명이 동시에 요청해도 성능이 유지된다.

const mysql = mysql2.createPool({
    user : "root",
    password : "980214",
    // 다중 쿼리문 사용할 예정
    // 다중 쿼리문 설정 - 다른 쿼리문을 실행해서 글 번호를 다시 순서대로 적용하도록함
    multipleStatements : true,
    database : "test1"
})

//연결 확인 메서드
mysql.getConnection((err,res)=>{
    // 연결이 정상적으로 되지 않으면
    console.log(err);
    // 정상적으로 연결되면 res객체에 연결 인스턴스가 넘어온다.
})

// 외부파일에서 mysql의 내용을 받을 수 있도록 내보낸다.
module.exports = mysql;

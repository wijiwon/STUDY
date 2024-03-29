// Mysql에 연결 해볼것임

// 외부모듈을 설치 받아서 사용할 것이다.
// npm 모듈을 설치받는 방법

// 이번에 설치받아서 사용할 모듈은 mysql2 모듈을 설치 받아서 사용할 예정이다.

// mysql2 설치 명령어
//--------------------------------------------------------------------------------
// npm install mysql2
// npm i mysql2

//--------------------------------------------------------------------------------

// 노드모듈은 올리면 정말 오래걸리니 깃 등에 올리거나 공유할때는 같이 포함시키지 않는다.
// 누군가에게 넘겨줄 때 mysql2 모듈이 없을테니 프로젝트가 실행되지 않을텐데...
// 다른 작업자는 설치된지도 모를 수 있다.
// 우리는 일일이 npm i mysql2 를 하나하나 설치받을 필요없이
// package.json에 있는 dependencies이 내용의 모듈을 다 설치받는 방법
//--------------------------------------------------------------------------------
// npm install
// npm i
//--------------------------------------------------------------------------------

// "dependencies": {
//     "mysql2": "^3.2.4"
//   }
// ^3.2.4- 버전인건 알겠는데 왜 ^가 있지?
// ^이게 왜 있냐. 이 버전이 없으면 다른 버전을 찾아서 설치받는다는 내용이다.
// 실제 설치된 버전은 lock.json에 있음

// Mysql 모듈도 있어요. 왜 mysql2을 사용하지?
// 차이점.
// mysql모듈은 콜백 기반으로 promise기반으로 사용하기가 힘듬
// mysql2가 promise 기반을 지원하기 때문에 사용하기 편하다.
// mysql2을 사용하라고 공식문서에서도 권장한다.

// mysql2 모듈 가져오기
const mysql = require("mysql2");

// mysql을 연결해보자.
// createConnection 메소드로 연결시켜준다.
// 매개변수로 연결하는 mysql의 옵션을 전달해줘야 한다.
// host: 연결할 호스트를 나타냄 root
// port: 연결할 포트. 3306포트에 기본적으로 열림
// user: 사용자의 이름
// password: 사용자 비밀번호
// database: 어떤 데이터 베이스를 연결 시킬건지
const temp = mysql.createConnection({
    user : "root",
    password : "980214",
    database : "test6"
})
// temp에 연결한 mysql 객체를 반환
// 이 객체안에는 쿼리문을 작성해서 데이터베이스 쿼리 작업을 시켜줄 수 있는 메소드가 있다.

// query 메소드: 쿼리문을 매개변수로 전달해서 데이터베이스의 쿼리 작업을 시킬 수 있다.
// "SELECT * FROM products": products 테이블이 있는지 확인하고 값을 가져온다. 값을 가져오는 것은 콜백 함수의 두번째 매개변수로 가져온다.
temp.query("SELECT * FROM products", (err,res)=> {
    if(err){
        // 테이블이 없다는 얘기겠죠?
        console.log("테이블이 없어")
        const sql = "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))"
        // 쿼리문 내용
        // products 이름의 테이블을 만드는데
        // id 컬럼은 INT 숫자형 / AUTO_INCREMENT: 자동으로 값이 증가할 수 있도록 설정. PRIMARY KEY에 주로 사용
        // PRIMARY KEY: 테이블에는 고유한 값을 가지고 있는 컬럼 하나 무조건 필요한데, 고유한 값을 설정하는데 PRIMARY KEY로 설정한다.
        // name, number, series 이런 컬럼에는 VARCHAR - 문자열이고 괄호에 글자 수를 정해줄 수 있다. (20) 20자까지 허용시켜 놓았다.
        temp.query(sql)
        console.log("테이블이 없어서 만들었어.")
    }
    else{
        console.log(res);
        console.log("테이블이 있어")
    }
})
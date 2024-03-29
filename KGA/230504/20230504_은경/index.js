// 처음 프로젝트 만들었으면
// 이제 npm init -y
//package.json 만드는 거


// 사용할 모듈
// express ejs mysql path
// body-parse는 express에서 지원을 해주니까 body-parse는 필요 없다.

const { urlencoded } = require("body-parser");
const express = require("express")

// ejs 설치
// express에서 지원을 해주기 때문에 가져올 필요는 없고 설치만 해두면 된다.

// mysql2 설치
const mysql2 = require("mysql2")

//path 가져오자
const path = require("path")


// 서버 인스턴스 만들어서 app에 바운딩
const app = express();
// console.log(app);
// 여기서 찍어보면 지정을 안 해주면 views로 잡혀있다.

const mysql = mysql2.createConnection({
    // 뭘 연결할 건지
    user : "root",
    password : "dmsrud816@",
    database : "test8",

    // 다중 쿼리문 사용할 수 있는 옵션
    // multipleStatement : true
    multipleStatements : true
})

// express의 views 속성을 설정(파일들의 경로)
// express에서 서버 사이드 렌더링을 지원하기 위해 view엔진을 사용한다.
// view 엔진이 html 템플릿 파일을 보여주는 역할을 한다.
app.set("views",path.join(__dirname,"page"))

// console.log(app);
// 우리가 설정한 경로로 바뀌어 있다.

// view엔진으로 ejs를 사용할 수 있게 설정
app.set("view engine", "ejs");

// express에서 body-parse를 지원한다.
app.use(express.urlencoded({extended : false}));
// extended : 깊은 객체를 지원할지 안 할지 
// 권장하는 것은 false

app.get("/", (req,res)=>{
    // render 메서드로 view엔진이 문자열을 html로 브라우저에 전달해준다. 렌더링 해준다.
    // 첫 번째 매개변수 : 파일의 이름
    // 두 번째 매개변수 : 전달할 데이터
    res.render("main");
})

app.get("/signup", (req,res)=>{
    res.render("signup");
})

app.get("/login", (req,res)=>{
    res.render("login");
})

app.post("/login",(req,res)=>{
    // 요청에 대한 내용은 req 객체에 들어 있다.
    // 그 요청 값에 대한 내용을 받으면 body 객체 안에 들어있다.
    //  바디 파서가 요청과 응답 사이에서 작용하는 거라서..
    // req.body === {user_id : "", use_pw : ""}
    const {user_id,user_pw} = req.body;
    console.log(user_id,user_pw)

    // res.send("user_id : " + user_id + "user_pw : " + user_pw);
    //send는 매개변수를 하나만 받는 애라서 ,가 아니고 +
    // 로그인 되면 얘는 그냥 아이디 비번만 보여주게 했음
    
    // 로그인 하면 그냥 아이디 비번 보여주는 거 말고
    // 데이터 베이스에서 가져와서
    // 데이터 베이스에 아이디와 비밀번호가 동일한 내용이 있으면 
    // 사용자가 회원가입을 진행 했다는 내용이니까
    // 로그인 시켜주자. 

    // user_id랑 user)pw를 가지고 데이터를 조회
    const sql = "SELECT * FROM users WHERE user_id = ? AND user_pw = ?"
    
    // 조회 결과가 나오면 아이디 비번 있는 거니까 로그인 시켜주자
    mysql.query(sql,[user_id,user_pw],(err,result)=>{
        if(err){
            // 로그인 실패
            res.render("mypage");
        }else{
            // 로그인 성공
            console.log(result);
            res.render("mypage",{data : result[0]})
        }
    })
    // 로그인에 대한 처리는 아디 비번 확인하고 여기서 하는데
    // 로그인 유지 사항은 세션이나 쿠키를 주면 그 뒤부터 로그인이 유지되는 것
    
})

// 회원가입
app.post("/signup",(req,res)=>{
    const {user_id, user_pw} = req.body;
    // 요청한 데이터는 바디 안에 들어 있으니까 req.body
    console.log(user_id, user_pw)
    // 이게 콘솔에 들어오는 건 확인 했으니 데이터 베이스에 추가해보자
    // 테이블은 워크밴치에서 만들었으니 테이블에 값을 넣어보자
    // mysql 커넥션부터하고
    // 입력받은 아이디 비밀번호를 추가
    const sql = "INSERT INTO users (user_id,user_pw)VALUE(?,?)"
    // 얘는 데이터 베이스에 만든 테이블 컬럼인 것

    // 저 물음표 부분에 값을 넣을 거다
    mysql.query(sql,[user_id,user_pw],(err)=>{
        // 
        //err가 있다면 err의 내용이 들어오는 객체
        if(err){
            res.render("signupERR");
        }else{
            // 브라우저 url을 login 페이지로 url 변경
            // 회원가입 되면 로그인 페이지로 보내버리자
            res.redirect("login");
        }
    })
    // res.send();
    // 응답이 두 번 가면 터진다. 그래서 지우자
});

// 게시판의 글목록 페이지
app.get("/list",(req,res)=>{
    const sql = "SELECT * FROM products";
    mysql.query(sql,(err,result)=>{
        console.log(result);
        res.render("list",{data : result});
        
    })
})

// 게시판 등록 페이지를 만들자
app.get("/insert",(req,res)=>{
    res.render("insert");

})
app.post("/insert",(req,res)=>{
    const {name, number, series} = req.body;
    const sql = "INSERT INTO products (name, number, series)VALUES(?,?,?)"
    mysql.query(sql,[name,number,series],()=>{
        res.redirect("/list");
    })
})

// 삭제
app.get("/delete/:id",(req,res)=>{
    // /delete/2 == req.params = {id : 2}
    // /delete/:__ : __는 키 값인 것 
    // 이렇게 되니까 파람스의 값을 뽑을 수가 있는 것
    // req.prams.id == 이 값을 가지고 데이터 베이스에 글 조회를 해서 보여줄 수 있겠지
    // 글 목록이 쭉 있고 1번 글 2번 글 3번 글 중에 글의 아이디를 조회해서 글의 내용을 페이지에 보여줄 수 있다.

    const sql = "DELETE FROM products WHERE id = ?; SET @CNT = 0; UPDATE products SET products.id = @CNT:=@CNT+1; ALTER TABLE products AUTO_INCREMENT = 0; ";
    // 삭제하면 번호를 재정렬 시키기 위해서 쿼리문을 추가해줘야하는데
    // 그러려면 ; 하고 쿼리문을 뒤로 더 넣을 수 있다. ;는 코드의 구문이 끝났다는 걸 알려주는 거
    // 근데 mysql에 뭐가 추가되어야 한다.

    // "DELETE FROM products WHERE id = ?; SET @CNT = 0; UPDATE products SET products.id = @CNT:=@CNT+1; ALTER TABLE products AUTO_INCREMENT = 0;
    // DELETE FROM products WHERE id = ?
    // : 값을 제거하라는 명령어인 쿼리문
    // 테이블 products의 행에서 ?에 값을 넣어줄거고
    // 우리가 넘겨준 id값을 가지고 있는 행을 찾아서 제거시킨다.

    // SET @CNT = 0;
    // 이 구문으로 카운트를 0으로 초기화

    // insert가 수정 delete가 삭제 update가 수정
    // UPDATE products SET products.id = @CNT:=@CNT+1;
    // products 테이블의 행의 아이디를 다시 갱신시켜줌

    // ALTER TABLE products AUTO_INCREMENT = 0;
    // mysql 기능인데
    // 자동으로 증가하시키는 속성을 0으로 변경

    // 지금 이 구문은 신경쓰지 말고
    // 인서트 딜리트 업데이트만 잘 공부하면 된다.

    mysql.query(sql,[req.params.id],()=>{
        res.redirect("/list");
    })

})

// 수정하는 페이지
// 수정 버튼을 누르면 수정 페이지로 이동해서
app.get("/edit/:id", (req,res)=>{
    const sql = "SELECT * FROM products WHERE id = ?"
    const id = req.params.id;
    mysql.query(sql,[id],(err,result)=>{
        res.render("edit",{data : result[0]})
    })
})

// 수정 요청
app.post("/edit/:id",(req,res)=>{
    const {name,number,series} = req.body;
    // 바디 안에 네임 벨류로 들어있다...
    const sql = "UPDATE products SET name = ?, number = ?, series = ? WHERE id =?";
    // 어떤 애를 수정 시킬 건지? id를 찾아서
    const id = req.params.id;
    mysql.query(sql,[name,number,series, id], ()=>{
        res.redirect("/list");
    })
})


// port를 지정해야하니까
const PORT = 8080;

app.listen(PORT,()=>{
    console.log("서버 열림");
})



// 오늘은 인서트 딜리트 업데이트
// 직접 게시판 만들어봤으면 좋겠다

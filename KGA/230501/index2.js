// fs 모듈 : 파일 시스템. 파일을 생성, 삭제, 읽기, 쓰기 등 작업을 할 수 있다.
const fs = require("fs");

// 폴더가 있는지 확인을 하는 메소드
// existsSync : 메소드 폴더가 있는지 확인을 해주는 메소드. 
// 반환값이 true와 false. 폴더가 있는지 없는지 확인해준다.
// 동기적으로 작동한다. ('Sync' 구문이 있는 메소드는 동기적으로 작동한다.)
// 매개변수 폴더의 경로를 작성해준다.
let folder = fs.existsSync("./Test");
console.log(folder);

// 폴더를 생성해보자.
// mkdir 메소드: 폴더 생성
// 첫 번째 매개변수: 생성할 폴더의 경로를 입력.
// 두 번째 매개변수: 폴더 생성 시 호출할 콜백함수
// 콜백함수 첫 번째 매개변수로 에러의 내용의 객체를 전달받는다.
if (!folder) {
    // mkdir: 비동기적으로 실행
    fs.mkdir("./Test", (err) => {
        if (err) {
            console.log(err)
            console.log("에러남");
        }
        else {
            console.log("Test 폴더 잘 만들어짐")
        }
    })
    // mkdirSync: 동기적으로 실행
    // fs.mkdirSync("./Test");
    // console.log("폴더 잘 만들었음")
}

// 폴더는 만들었고 폴더 안에 파일을 추가해보자.
// writeFile: 파일 쓰기. 파일에 데이터를 작성할 수 있다.
// 첫 번째 매개변수: 파일의 이름 경로
// 두 번째 매개변수: 파일에 작성할 내용
// 세 번째 매개변수: 콜백 함수
// 콜백 함수의 매개변수는 에러 내용의 객체를 전달 받는다.

// 비동기적으로 들어간다.
// fs.writeFile("./Test/temp.txt", "Hello nodejs", (err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("파일이 잘 만들어졌다.")
//     }
// })

// 동기적으로 실행되는 메소드
fs.writeFileSync("./Test/temp.txt", "Hello nodejs")


// 폴더도 만들고 파일도 만들고 파일의 내용도 작성해 봤으니까.
// 파일의 내용을 읽어와보자

// readFile: 파일을 읽어온다.
// 첫 번째 매개변수: 파일의 경로
// 두 번째 매개변수: 인코딩의 내용
// 인코딩 내용을 작성하지 않으면 null로 들어간다.
// null이면 buffer 객체로 읽어온다.
// 세 번째 매개변수: 콜백함수
// 콜백 함수의 첫 번째 매개변수: 에러의 내용 객체
// 콜백 함수의 두 번째 매개변수: 읽어온 파일의 내용
fs.readFile("./Test/temp.txt", "utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})

// 동기적으로 파일을 읽어오는 메소드
// 동기적으로 실행하기 때문에 콜백이 필요없다.
// 메서드의 반환값으로 파일을 읽어온 data가 나옴
let data = fs.readFileSync("./Test/temp.txt","utf-8");
// 여기에 동작이 끝날 때까지 기다린다. (동기적)
console.log(data)


// 폴더를 제거 해보자.
// rm 메소드: 폴더 삭제
// 첫 번째 매개변수: 삭제할 폴더의 경로
// 두 번째 매개변수: 옵션 객체를 전달하는데 {recursive : true}
// recursive키의 값에 따라 true나 false를 전달해주는데 폴더안의 내용까지 제거할 것인지를 결정한다.
// 세 번째 매개변수: 콜백함수
// 콜백 함수는 매개변수로 에러 내용의 객체를 전달 받는다.
fs.rm("./Test",{recursive : true},(err)=>{
    if(err){
        console.log("err")
        console.log("에러났음")
    }
    else{
        console.log("폴더 잘 삭제함")
    }
})
// TCP server, Client를 둘 다 만들어보자

const net = require("net");
const PORT = 8080;

// 클라이언트와 서버가 요청 응답으로 주고 받는 메시지는
// 헤더랑 바디로 나눠지고 헤더의 내용은 전달하는 메시지의 정보를
// 헤더: 전달한 데이터의 정보   
    // HTTP 1.1: 기본 버전 프로토콜
    // GET /URL HTTP 1.1
    // host : 127.0.0.1:8080
    // ....
    // Content-type : text/html

    // 요청 메소드  (자주 사용하는 것은 GET, POST이다.)
    // GET: 데이터의 요청을 의미 (필요한 데이터를 응답 받는 것), 데이터를 가져오는 것
    // POST: 데이터의 입력을 의미 (데이터를 추가 해주기 위해서 사용), 데이터를 보내기 위해서 사용
    // PUT: 데이터의 수정을 의미
    // DELETE: 데이터를 삭제 하기 위해서 사용
    // OPTIONS: 웹 서버가 지원하는 메소드의 종류를 요청할 때

    // HTTP 프로토콜 버전
    // HTTP 버전은 1.0, 1.1, 2.0이 있는데
    // 우리가 배울 건 1.1 버전이다.
    // 1.1 www 에서 사용되는 기본 프로토콜이다.
    // HTTP 버전이에요
    // 1997년도에 도입이 되었고 지금까지도 많이 사용중이다.


// 바디: 전달할 데이터의 실질적인 내용
    // body의 내용
    // Buffer.from 메서드를 사용해서 문자열을 바이트 데이터로 변환해준다.
    // 변환하는 이유는 HTTP 응답은 바이트 데이터로 전송되기 때문이다.
    // body 문자열을 그대로 작성해버리면 인코딩에 문제가 생길수가 있기 때문이다.

// 전달하고 바디에는 전달하는 데이터의 내용을 들어있어요

// 바디
const body = Buffer.from("<div><p>hello nodejs</p></div>")

//Header, body로 구분해서 읽는다.
//response header + body = request

// 헤더 코드
const response = `HTTP/1.1 200 OK
Connection : Keep-alive
Keep-Alive : timeout=4
Content-type : text/html
Content-length : ${body.length}

${body.toString()}`


// 상태 코드
// 요청에 대한 응답의 결과를 나타내는 숫자 코드이다.
// 1xx(1백번 대) : 거의 없어요...
// 2xx(2백번 대) : 성공에 대한 내용
// 3xx : 리다이렉트
// 4xx : 페이지가 없을 때 (예를들어, 요청한 페이지가 없을 경우 404)
// 5xx : 서버가 터진 것

// 가장 많이 사용하는 상태코드는 200번과 404이다. (성공과 실패)
// Connection: 클라이언트와 서버의 연결 상태 Keep-alive 속성은 클라이언트가 다음 요청을
// 보낼 때까지 연결을 유지시켜준다.

// Keep-Alive: 연결을 유지하는 시간을 지정. timeout=4 == 연결을 4초동안 유지하고 연결을 종료

// Content-type: 전송되는 데이터의 타입 text/html == HTML 타입의 데이터 전송 

// Content-length: 전송되는 데이터의 길이. 데이터의 끝을 알려주는 역할을 한다.

//서버 객체 생성
const server = net.createServer((client)=>{
    // 클라이언트가 접속 시 실행
    // 인코딩 설정
    // setEncoding 메서드: 인코딩 방식을 설정할 수 있다.
    client.setEncoding('utf8');

    //클라이언트가 데이터를 보내서 데이터를 받으면 실행되는 콜백 함수
    client.on("data",(data)=>{
        console.log(data)   //데이터의 타입 buffer
        
        // write메서드로 클라이언트에 응답을 보냄
        client.write(response);
    })

    // 클라이언트와 연결이 종료되면 실행되는 이벤트
    client.on('close',()=>{
        console.log('접속이 종료됨')
    })
})

server.on("connection",()=>{
    console.log("client가 접속했어")
})

server.listen(PORT,()=>{
    console.log("server 잘 열림 포트는 : " + PORT);
})
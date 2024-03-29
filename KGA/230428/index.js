//TCP server 만들어 봅시다~

//nodejs로 만들거임

//내장 모듈로 사용할 건 net 

//net 이라는 모듈을 사용하면 TCP 소켓을 만들어서 사용할 수 있어요
//TCP 연결을 맺어주는 프로토콜
//TCP 소캣을 생성하고 서버와 클라이언트간의 응답 요청을 맺을 수 있다.

//내장 모듈 net을 가져옴
const net = require("net");
// const { json } = require("stream/consumers");
const PORT = 8080;

//서버 객체를 생성
//createServer 메서드로 콜백함수를 전달함
//클라이언트가 접속 시 콜백함수 실행
const server = net.createServer((client)=>{
    //클라이언트가 접속 시 실행

    //클라이언트가 데이터를 보내서 데이터를 받으면 어떻게하지??
    client.on('data',(data)=>{
        //클라이언트가 보낸 데이터

        //네트워크를 통해 전송되는 데이터
        //바이너리 형식으로 전송된다.. 즉
        //클라이언트가 보낸 데이터는 Buffer 형태로 전송이 되며
        //서버는 해석해서 문자열로 변환 해주면 된다.
        //출력된 데이터는 buffer형식으로 인코딩해서 우리가 보낸 데이터처럼 보이는 것이다.
        //예를들어, <Buffer 47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 6c 6f 63 61 6c 68 6f 73 74 3a 34 30 30 30 0d 0a 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 ... 625 more bytes>
      
        console.log(data);
        // <Buffer 47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 6c 6f 63 61 6c 68 6f 73 74 3a 38 30 38 30 0d 0a 43 6f 6e 6e 65 63 74 69 6f 6e 3a 20 ... 651 more bytes>
      
        // console.log(data.toString());
        // GET / HTTP/1.1
        // Host: localhost:8080
        // Connection: keep-alive
        // Cache-Control: max-age=0
        // sec-ch-ua: "Chromium";v="112", "Microsoft Edge";v="112", "Not:A-Brand";v="99"
        // sec-ch-ua-mobile: ?0
        // sec-ch-ua-platform: "Windows"
        // Upgrade-Insecure-Requests: 1
        // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.58
        // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
        // Sec-Fetch-Site: none
        // Sec-Fetch-Mode: navigate
        // Sec-Fetch-User: ?1
        // Sec-Fetch-Dest: document
        // Accept-Encoding: gzip, deflate, br
        // Accept-Language: ko,en;q=0.9,en-US;q=0.8


        // console.log(JSON.stringify(data));
        // {"type":"Buffer","data":[71,69,84,32,47,32,72,84,84,80,47,49,46,49,13,10,72,111,115,116,58,32,108,111,99,97,108,104,111,115,116,58,56,48,56,48,13 ... }
    })
})      //TCP의 내용을 만들어 준 것이다.

//서버를 대기 상태로 만들어준다.
server.listen(PORT, ()=>{
    console.log("서버 잘 열렸음");
})
//node 파일의 경로
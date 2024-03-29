import Block from "@core/block/block";
import Chain from "@core/chain/chain";
// npm i @types/ws ws 설치
// ws : 기본적인 연결 관련 작업만 있는 모듈
import { WebSocket, WebSocketServer } from "ws";

// enum : 상태를 지정할 때 사용 (ex. run, state, work)
enum MessageType {
  // 알기 쉽게 사용하기 위해.
  // 0, 1, 2 상태를 지정한다 했을 때
  // latestBlock: 마지막 블록을 요청할 때
  latestBlock = 0, // string 문자로 해도 되는데, 문자로 설정할 경우 오타가 발생할 수 있어 오류를 최소화하기 위해 number로 지정.
  // allBlock: 전체 체인을 요청할 때
  allBlock = 1,
  // addBlock: 블록이 추가되서 알려줄 때
  addBlock = 2,
}

interface IMassage {
  // 메시지의 타입
  type: MessageType;
  // 메시지에 대한 값. 데이터
  payload: any;
}

// P2P 클래스는 Chain의 메소드를 상속받아, Chain의 메소드를 사용할 수 있다.
class P2P extends Chain {
  private sockets: Array<any>; // 연결된 socket들 확인

  constructor() {
    super();
    this.sockets = [];
  }

  getSockets(): Array<any> {
    return this.sockets;
  }

  connectSocket(socket: any, type?: MessageType): void {
    // 소켓을 연결하면
    // 하나의 포트가 동적으로 생기고 그 포트에서 소켓을 들고 있는데
    // socket에는 고유의 포트가 들어있는 상태. 충돌방지를 위해 애플리케이션 or 서비스 연결을 하면
    // 동적으로 포트를 지정해준다. (고유포트)
    this.sockets.push(
      `${socket._socket.remoteAddress} : ${socket._socket.remotePort}`
    );
    // socket.send() 메서드를 호출하면 message 이벤트가 실행된다.
    socket.on("message", (_data: string) => {
      const data = JSON.parse(_data.toString());
      switch (data.type) {
        case MessageType.latestBlock:
          // 0이 들어오면 여기
          const message: IMassage = {
            // type
            type: MessageType.latestBlock, // 모든 블록 타입이  실행되는지 확인
            payload: [this.latestBlock()], // 마지막 블록은 patload에 담아서
          };
          // 완성한 객체를 문자열로 치환해서 보낸다.
          socket.send(JSON.stringify(message));
          break;
        case MessageType.allBlock:
          // 1이 들어오면 여기

          break;
        case MessageType.addBlock:
          // 2가 들어오면 여기
          // 검증 로직은 여기에
          const isValid = this.replaceChain(data.payload);
          // 에러가 트루 == 문제가 있으면 종료
          if (isValid.isError) break;

          const message2: IMassage = {
            type: MessageType.addBlock,
            payload: data.payload,
          };
          this.sockets.forEach((item) => {
            // 현재 접속한 유저들에게 메시지를 전송한다.
            item.send(JSON.stringify(message2));
          });
          break;

        default:
          break;
      }
    });
  }

  listen(port: number): void {
    // 현재 로컬에서 서버 생성
    // 웹 소켓 포트 오픈 대기상태
    const server: WebSocketServer = new WebSocket.Server({ port });
    server.on("connection", (socket: WebSocket) => {
      // 소켓 연결 시도하면
      console.log("new socket connection");
      // 연결한 소켓을 배열에도 추가해주고 message 이벤트도 등록해준다.
      this.connectSocket(socket);
    });
  }
  addToPeer(peer: string): void {
    // 상대방이 내 ip에 접속했을 때
    // 소켓을 생성하고 연결한다.
    const socket: WebSocket = new WebSocket(peer);
    // 상대 소켓의 서버 주소를 받아서 연결을 시도한다.
    socket.on("open", () => {
      // 연결이 성공하면 open 이벤트가 실행된다.
      console.log("연결 성공");
      this.connectSocket(socket, MessageType.addBlock);
    });
  }
}

export default P2P;
// 이후에는 ip 주소 연결해서 data를 받을 것이다.

// 방화벽 헤제???? 로컬에서 배포하기 전에 같은 네트워크상에서 소켓 접속 확인해보기
//  네트워크 보안/고급설정/인바운드규칙/새규칙/특정포트접근 가능(8080)/

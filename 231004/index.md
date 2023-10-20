# 솔리디티

1. 절차적 프로그래밍 언어
2. 컴파일 언어

## SPDX License Identifier

- 스마트 컨트랙트 신뢰성
- 저작권 문제를 방지하기 위해 코드의 최상단에 주석으로 작성한다.

## Pragma

- 컴파일러의 기능을 사용하기 위해 작성하는 구문
- 솔리디티 버전 작성 명시

## Contract

- 객체 지향 언어의 class와 유사하다.
- Contract의 내부에 상태 변수를 보관한다.
- 상태변수를 조회 또는 변경을 하기 위한 함수도 포함을 하고 있다.

# 솔리디티 코드를 작성할 때

## import

- 외부 파일의 코드를 가져올 수 있다. (모듈화)
- export할 필요 없다. 선언한 Contract를 바로 사용 가능하다.

```javascript
import "파일의 경로";

import {"Contract 이름"} from "파일의 경로";
```

## 상태 변수

- Contract 내부에 선언한 변수이다.
- Contract storage에 저장

1. Storage : 블록체인에 기록되는 영구적인 값이 유지되는 공간이다.
2. Memory : 프로그램이 동작하는 동안에만 값을 기억한다. 동작하고 종료되면 해제시키는 데이터 공간이다.
   - function 등

## 데이터의 타입

```javascript
contract Counter {
    // 상태변수 선언
    // [타입] [변수명]
    bool _bool;
    // 참과 거짓의 값을 저장하는 변수이다. 값을 지정해주지 않는다면 기본이 true 값이다.

    uint256 _uint;
    // uint : 부호가 없는 정수형. -가 붙지 않는 정수형이라 음수가 될 수 없다.
    // 정수형 타입. uint는 uint 자료형 뒤에 숫자를 붙이면 메모리 영역의 크기를 지정할 수 있다.

    int256 _int;
    // int : 부호가 있는 정수형. -가 붙을 수 있어 음수가 될 수 있다.
    // 정수형 타입. int는 int 자료형 뒤에 숫자를 붙이면 메모리 영역의 크기를 지정할 수 있다.

    // int, uint의 데이터 범위를 지정할 수 있는 이유는 작업을 할 때 어떤 코드를 작성하느냐에 따라 효율적으로 데이터 공간을 줄이기 위해서이다.
    // 8 ~ 256bit 까지 지원을 한다.
    //// 예) int8 === -128 ~ 127
    //// 예) uint8 === 0 ~ 255

    // enum : 개발자가 가독성을 높이기 위해서 사용하는 자료형이다.
    // 상수를 사용하면서 가독성을 높이기 위해서 사용한다.
    enum Status {
        Pending,    // 0
        Accapted,   // 1
        Rejected,   // 2
    }

    // status 초기값은 0
    Status public status;
    // status.Pending === 0
    // status.Accapted === 1
    // status.Rejected === 2

    // enum의 상태를 조회
    function get() public view returns(Status){
        return status;
    }

    // enum의 상태를 변경
    function set(Status _status) public {
        status = _status;
    }

    // string 문자열 자료형
    string Str = "hello sol";

    // address 주소형
    // 우리가 지갑을 만들 때 봤던 주소
    // 주소의 크기는 20바이트 크기의 자료형이다. 컨트랙트 주소를 저장할 때 사용하는 변수이다.
    address sender = 0x0000000000000000000000000000000000060000;
    // sender.balance === 해당 주소의 이더 잔액을 조회할 수 있다.
    // sender.transfer("보낼 금액");
    // sender.send("보낼 금액");

    // balance property가 있어서 주소의 이더 잔액을 확인 가능하다.
    // 메서드 transfer, send 메서드를 사용해서 이더 전송이 가능하다.

    // 배열의 타입
    // 배열의 크기가 실행중에 변경이 가능하다.
    string[] strArr = ["1", "2", "3"];

    // 배열의 크기 지정
    // 배열의 크기가 선언 시 지정이 된다. 해당 크기와 맞지 않으면 오류.
    string[2] strArr2 = ["1", "2"];

    // 구조체 struct
    // 구조를 정의한다.
    struct Struct {
        string name;
        uint number;
    }

    // 매핑 : key-value. 키와 값을 저장할 때 사용하는 데이터 타입이다.
    mapping (address => uint256) tokens;
    tokens {
        address : 10000
    }
    // adress => key
    // uint256 => value

    mapping (string => mapping(adress => uint256)) token2;
    // string이 key이고 mapping(adress => uint256)이 value이다.
    // address가 key이고 uint256이 value이다.
    // 따라서,
    token2{
        string : {
            address : 10000,
            adress2 : 10000
        }
        string2 : {
            address : 10000,
            adress2 : 10000
        }
    }

    // 글로벌 변수
    // address payable _to => address payable(타입 선언식) _to(매개변수 이름)
    function global(address payable _to) public payable {
        // payable : 이더리움을 보낼건지, 결제를 할건지. 결제 처리를 한다는 처리문이다.

        // 이더리움 블록체인의 정보를 가지고 있는 글로벌 변수가 있다.
        // block
        block.coinbase;     // 현재 블록을 채굴한 account의 주소
        block.difficulty;   // 현재 블록의 난이도
        block.gaslimit;     // 현재 블록이 사용 가능한 최대 gas값
        block.number;       // 블록의 높이
        block.timestamp;    // 블록 생성 시간

        // msg : 컨트랙트에서 message call 했을 때, 컨트랙트에 전달된 메시지 정보를 가지고 있는 객체
        msg.sender;     // 컨트랙트를 호출한 account의 주소
        msg.value;      // 메시지로 전달받은 이더리움의 단위. wei단위로 담겨있다.
        msg.data;       // 컨트랙트 call로 실행할 때 보낸 데이터의 내용
        msg.sig;        // 전달받은 데이터의 첫 4바이트 === 어떤 메소드를 실행시켰는지 확인할 수 있다.

        // address
        _to.balance;            // 계정의 잔고

        uint amount = 10**18;
        _to.transfer(amount);   // 이더를 해당 주소에 보냄
        _to.send(amount);       // 이더를 해당 주소에 보냄
    }

    // 함수의 구조
    function name(uint a) public view returns (uint) {

    }

    // name : 함수명.
    // uint a : uint(타입) a(매개변수 이름)

    // 접근자의 타입
    // 1. public : 외부에서 호출이 가능하다. 외부 컨트랙트나 계정에서 호출이 가능하다. EOA나 CA에서 호출이 가능하다.
    // 2. private : 현재 컨트랙트(contract) 내부에서만 호출이 가능하다.
    // 3. Internal : 내부 함수는 컨트랙트에서 접근을 할 수 있고, 외부에서는 직접 접근할 수 없다. 하지만 다른 컨트랙트에서 상속받아서 호출할 수 있다.
    // 4. External : public같은 타입이다.

    // 접근 지정자 : 상태 변수를 변경 선언 부분이다. 솔리디티 언어의 특징이다.
    // 1. view : 상태변수 읽기 전용이다. 상태변수를 변경할 수 없다.
    // 2. pure : 상태변수를 읽을 수도 없고, 변경할 수도 없다. 말 그대로 순수하게 전달받은 매개변수로만 함수를 동작하고 싶은 경우에만 사용한다.
    // 3. payable : 결제를 처리할 수 있다는 선언. 이더를 전송하는데 선언을 하지 않으면 거부된다.(reject)

    // 조건문 작성
    // 1. require : 주어진 조건을 검사해서 만족이 되면 구문을 통과하고 만족되지 않으면 reject이 발생된다.(이전 상태로 되돌린다.) 이전 상태로 되돌아가기 때문에 가스비를 반환해서 소비되는 가스비가 없다.
    //// if문 같이 조건처리를 할 때 사용한다.
    require(조건문);
    조건문이 잘 통과되면 동작해야 할 구문;

    // 컨트랙트 배포자가 계약을 파기하고 싶을 때
    // sender : 배포자의 주소를 받을 변수. payable을 선언했기 때문에 이더를 전송받을 수 있다.
    address payable sender;

    require(msg.sender == sender);

    // selfdestruct(지갑 주소) : 현재 계약을 파기하고, 전달받은 매개변수 주소로 CA의 잔액을 전송한다.
    // selfdestruct(CA 주소) : 계약을 파기하고 전달된 CA에 잔액을 전송할 수 있다.
    selfdestruct(sender);       // 지갑의 주소를 입력해 배포자에게 CA의 잔액을 전송한다.
}
```

# Truffle

- Dapps 개발을 쉽게 할 수 있도록 도와주는 프레임워크.
- 스마트 컨트랙트 컴파일, 배포 및 테스트 기능을 쉽게 할 수 있도록 도와준다.

1. 리액트 설치

```sh
npx create-react-app test
cd test
```

2. truffle 설치

- 리엑트 밖에서다가 설치해도 무관하다.
- npx truffle init : 초기 세팅을 도와준다. 3개의 폴더가 생긴다.
  - ./contracts : 솔리디티 코드를 작성한 sol 파일들을 담을 폴더이다.
    - 컴파일을 진행하면 이 폴더에 있는 sol 파일을 읽어서 컴파일을 진행한다.
    - build 폴더가 생기고 컴파일된 내용이 json 파일로 생성된다.
  - ./migrations : 컨트랙트 배포를 진행할 js코드를 작성한다.
    - 이더리움 네트워크에 배포하는 내용을 작성할 js를 이 폴더에 작성한다.
  - ./test : 테스트 파일을 작성할 폴더이다.
  - truffle-config.js

```sh
npm i truffle
npx truffle init
```

3. truffle-config.js 파일 수정

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
  },

  compilers: {
    solc: {
      version: "0.8.13", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};
```

4. 컴파일

- 솔리디티 코드를 작성하자. contracts 폴더에 sol 파일을 만들자
- 컴파일 명령어

```sh
npx truffle compile
```

- build 폴더가 생기고 컴파일된 내용이 생성된 json 파일에 작성되어 있다.
  - "networks": {}, : 해당 부분은 현재 비어있지만, 배포하면 CA의 내용이 들어간다.

5. 배포

- ganache-cli 실행

```sh
npm i ganache-cli
npx ganache-cli
```

- 실행 내용

```sh
Available Accounts
==================
(0) 0xc749895DE43CFee67B987d89f96b189Fa26f0633 (100 ETH)
(1) 0x37Aa989E9c2fDD75Cd1A0B0a451fe03DD36856B6 (100 ETH)
(2) 0x716d99dc9C9372549FE6F88c7f35feDbe128e34d (100 ETH)
(3) 0x79F6a9a396ce843698D90ebbDF5aCB80BD2316b8 (100 ETH)
(4) 0x622Fc42FDF5CA780298B8a0b5CA90b3FD3aC1517 (100 ETH)
(5) 0x1e186C0D7F98F3E9f9a13C35779E82ee9799aCd8 (100 ETH)
(6) 0x008839Bbb1714B3E09455b1a5382b8C5Ea77C90a (100 ETH)
(7) 0xe1A1454B2e2Afd697F57bF9DeC6cf1e839133f36 (100 ETH)
(8) 0x14C911A3525A967b6C2435158a6F9695e5608118 (100 ETH)
(9) 0x90eE99500B7b6cB6B1beff65e8e6299a665BD4c1 (100 ETH)

Private Keys
==================
(0) 0x16e4d5f692f61c47f81efa87587ccb6de86ef0b4b8bc2e016d6f552e94ceb63f
(1) 0x6dcd38ed0a536eaefca4cc8a0a5fd7d177e1fa5708c111e4e8e9b821712161ba
(2) 0xb366ad0d56b1ba66fff0e27552f012d77a78ddda478d012849db98b688f9198c
(3) 0x504277d766af6016fb389af002c8f541bc28ce7520b103bcf8fe4bf7987a2231
(4) 0x18779f4f4b0eee203a86d4e31f1a7a5e88d25843b6ca617ce68c9e8da3e969e4
(5) 0xd6d7d73e0b97290eabe43f0e1d71670a4cfd4052402c16e48f69701d5ec255d2
(6) 0x0c1f4413bdb7e757dc7631fdec0720ff886fdb476b3906cbf57e1d1b61269c1d
(7) 0xf3f80d3668485bc6af06a966476e0cca7cec6bcc441038bd305a9e2ad4714a71
(8) 0xd4258b0777557e32b235bbf2240cf62eb8d158f9799d518c8b66aa1a716c52f9
(9) 0x4642b9e886b5ed23b9e305876c46bcfac303fda584bad10e658e0d1af679a0f6
```

- migrations 폴더 안에 배포 코드 작성
- 파일명에는 규칙이 있다.

  - 파일명 : [번호]_[내용]_[컨드랙트 이름].js
  - 1_deploy_Counter.js

- 배포 명령어 : migrations폴더에 있는 코드를 현재 네트워크에 배포를 진행한다.

```sh
npx truffle migrate
```

- 실행결과

```sh
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'development'
> Network id:      1696397703744
> Block gas limit: 6721975 (0x6691b7)


1_deploy_Counter.js
===================

   Deploying 'Counter'
   -------------------
   > transaction hash:    0xaf76ba92b2f5d08d4b9524cceb57eaee32a5ee5db9cc92ed9c06d3ee70cac26c
   > Blocks: 0            Seconds: 0
   > contract address:    0xd33316B50E9E2c2abcddf47C67d33BEB38766588
   > block number:        1
   > block timestamp:     1696397840
   > account:             0x88188f2367C147b93f7bd6E62ec7541e07d875Ef
   > balance:             99.99689726
   > gas used:            155137 (0x25e01)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00310274 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00310274 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.00310274 ETH
=======
> Total deployments:   1
> Final cost:          0.00251354 ETH
```

- 배포한 CA 확인

  - 0xd33316B50E9E2c2abcddf47C67d33BEB38766588
  - CA로 요청을 보내서 call, send를 통해 원격 프로시저를 실행할 수 있다.

- truffle 콘솔에서 확인하는 방법

```sh
npx truffle console
```

- 콘솔창에 코드를 작성해서 call, send를 테스트 해볼 수 있다.

- 배포된 컨트랙트에 접근하는 방법

```javascript
// Counter라는 컨트랙트가 배포된 것에서 마지막으로 배포된 컨트랙트를 접근
// 접근하는 동안 비동기 처리한다.

// instance === 배포한 Counter 컨트랙트에 접근해서 인스턴스를 매개변수로 받는다.
// counter 변수를 선언하고, instance를 담아준다.
Counter.deployed().then((instance) => (counter = instance));
// counter 배포된 컨트랙트의 인스턴스가 담겨있고 call과 send가 메서드로 포함되어 있다.
/*결과
TruffleContract {
  constructor: [Function: TruffleContract] {
    _constructorMethods: {
      configureNetwork: [Function: configureNetwork],
      
      ......

    send: [Function (anonymous)],
    allEvents: [Function (anonymous)],
    getPastEvents: [Function (anonymous)]
}
*/

counter.getValue();
// call 요청을 보내자
/* 결과 
    BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
    
    BN객체는 매우 큰 숫자를 명시한다. 매우 큰 숫자를 다룰때 사용된다.
    특히 블록체인 같은 분산 원장 기술에서 자주 사용한다.

    [ 0, <1 empty item> ] : 아이템이 하나 있고 값은 0이다.
*/

counter.setValue(20);
// send 요청을 보내자
/* 결과
{
  tx: '0xec2e2be4aa1cf39fa5703d15c20eaf6b64f679e19dbe63fc80e203530a1418ac',
  receipt: {
    transactionHash: '0xec2e2be4aa1cf39fa5703d15c20eaf6b64f679e19dbe63fc80e203530a1418ac',
    transactionIndex: 0,
    blockHash: '0xae61e83a8c269f3d51c75050c8d56683975cd71a3d459f16c44116e22f759a26',
    blockNumber: 2,
    from: '0xee41fad846200a51ca27edd9b760ca949eb4f5fb',
    to: '0xa7314bd3e8df84cfbe95b775167564b163e44cee',
    gasUsed: 41624,
    cumulativeGasUsed: 41624,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: []
  },
  logs: []
}

// 다시 값을 확인(counter.getValue())하면 해당 결과값을 확인할 수 있다.
// [ 20, <1 empty item> ] : 값이 수정되어서 20으로 변경되었다.
// BN { negative: 0, words: [ 20, <1 empty item> ], length: 1, red: null }
*/
```

# 테스트 코드 작성

```sh
# 테스트 코드 실행
npx truffle test
```

- 실행결과

```sh
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.
[
  '0xeE41fad846200a51ca27eDD9b760Ca949eb4f5fB',
  '0x6D0387dE1Bc1EAF61c003F8706530975F0A6F031',
  '0xCD771ceA03c56E723C06654f574e03EDF7d8DC41',
  '0xBC903032f7e1de34b285cAabEF330B5428A7C2Df',
  '0x5a103E3D0FaE640D0b3f4c7305d1c9C982B5cD18',
  '0xf21336AD1AaD23471ae2e96f45EC9f649eB8D054',
  '0xAfE0E9b9Ad301448d7dbF3D94FeD48544bEDa365',
  '0xeE068dF741cA1113C6a4eca1eaaBC5a9e6791E58',
  '0x81660A66F896B8f7487745C5d285D5b4340980bb',
  '0xD6c1dBB3C909251A82F43F6ab5a31b7950665A51'
]


  Contract: Counter
    counter contract
      ✔ counter 1
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
      ✔ counter 2
BN { negative: 0, words: [ 20, <1 empty item> ], length: 1, red: null }
      ✔ counter 3 (39ms)


  3 passing (69ms)
```

- 가스비가 지불이 되기 때문에 테스트코드로 먼저 진행을 해서 동작시킨다.

- sol 파일 수정 후 동작한 명령어
  - npx truffle complie
  - npx truffle migrate
    - CA: 0x78Fe7f7a14cCaE62870f2C5a70560A4119EdFF79

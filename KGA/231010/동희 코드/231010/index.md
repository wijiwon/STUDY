# 토큰

- 표준규칙이 정해져있는 토큰이라 규칙을 알아야됨

# ERC20 토큰

- ERC(Ethereum Request for Comments)
- 20 : 특정 제안에 번호를 매긴 토큰의 생성이나 발행등의 규칙을 의미
- 이 숫자는 식별하기 위한 숫자 큰 의미는 없다

```sh
# 토큰과 코인의 차이 (= 메인넷 유무의 차이)
# 코인: 메인넷이 있다
# 토큰 : 메인넷이 없다

# => 토큰을 만들면 네트워크 안에 포함되어 있지만, 토큰자체의 메인넷이 구현되어 있지 않기 때문에 코인이 아니다

# ERC20 :
# 이더리움 네트워크에서 가장 표준이 되는 토큰, 대체 가능 토큰, 가장 기본적인 상호 교환 가능한 토큰의 기능을 정의하고 있다
# 토큰 전송 및 잔액조회 토큰의 소유자 등을 관리하기 위한 메서드와 이벤트가 정의 되어 있는 토큰, 탈중화된 금융 (Defi 등)에서 사용한다
# ex) heetoken {0x15165165 : 100}

# ERC721 :
# 대체 불가 토큰(1개)을 나타내고
# 각각의 고유한 특성을 가지고 있고, 그 토큰의 소유권을 가질 수 있는것 (ex 게임아이템, 미술품, 부동산 등의 소유권을 나타낼수 있다)
# 토큰의 소유권 이전(판매 및 경매), 토큰의 메타데이터 조회등의 메서드와 이벤트를 정의하고있다
# ex) ERC721{0xasdfasd : 0x123234}
```

````sh
# 트러플 설치
npm i truffle
# 트러플 폴더구성 설치 (=truffle project를 생성)
npx truffle init

# // contracts 폴더에 ERC20.sol 파일 생성 // IERC20.sol (I : interface) 인터페이스 규격 작성해보기위해, 파일 생성 (손으로 코드작성해보기)
# // IERC20.sol : ERC20 인터페이스 작성하기 (~55줄까지)
# // ERC20.sol : 작성

# react 설치
npx create-react-app erc20

#packjson 만들기
npm init -y
# npm 사이트에서 오픈제플린(프렘임 워크)다운
# 오픈제플린에서 제공하는 ERC20, ERC821 등 표준 토큰을 가지고 상속을 시켜서 토큰을 사용
# 설치후 확인 경로 : node_modules > @openzeppelin/contracts > token 폴더에 토큰의 내용이 담겨있다 확인해보면 우리가 작성한 interface 내용과 비슷하게 구성돼있는걸 확인할수있다
npm i @openzeppelin/contracts

# 배포 migrations > 1_deploy_ERC20.js 폴더 작성 (~12줄까지)
# truffle-config 파일 수정

# // 새 터미널 열어서
# truffle 로 배포해서 테스트
npx truffle compile
# 😩 오류 : build/contracts 가 생성안됨-> Mint 때문인듯.. -> 해결완료 (build/contracts 에 ERC20.json IERC20.json 파일 생성됨)

# 🚀 토큰의 량을 확인하려면, networkID 도 같은 식별자인데, 디폴트 값이 설정될 수 있어서 옵션으로 추가를 해주자 (1337 로 열어주자 default 값으로 설정되지 않게! 임의값 배정)
npx ganache-cli --chain.chainId 1337 --chain.networkId 1337
```sh
# 결과화면
Available Accounts
==================
(0) 0xf920ea2c6252fE565953b4808c0d853c3Fb1aC6f (1000 ETH)
(1) 0x204009691AB7d1ecee8286cc01caCC4da27d73d7 (1000 ETH)
(2) 0x5f795939459D08029822C21659FbA953A9dD0B03 (1000 ETH)
(3) 0xbfF6230d29a99592B8d12aCA6217fe78787E36a3 (1000 ETH)
(4) 0x62E05AFE1106Ced8C2d1E81462b9251CE88A18f0 (1000 ETH)
(5) 0x35e7c6d343bA7972229C332810Cf442EefF3bED8 (1000 ETH)
(6) 0xe74c3157533d2e49F595E90355AC652fE2C8a50b (1000 ETH)
(7) 0x3482C62B8E9C514723443476A991D6E6162383B0 (1000 ETH)
(8) 0xfECD46A0eC176864d0015d1a9Dc63DEa022cb02e (1000 ETH)
(9) 0xfc2179C88315F02bb007717d8dF7cFE49F96f1d9 (1000 ETH)

Private Keys
==================
(0) 0xa6a80620e274c85bbe8bd55a87d7fb72bca32d7a78daf6c36a438f68125ea121
(1) 0x960e1872db09cade9de73badf8602612cd7332cba03f8cf0d66d9fc4e7580b49
(2) 0xc5257ef0ffc7b16ceb7676b3bdc3d9c31639b9f6d027a226f557b771154005b7
(3) 0x85abf87be7fddab718102c36abeeab7c02e22180de551c0cfcc924ae72a0d695
(4) 0x628bcaaa1111ea42cee338c21349c84703a7d9316c5528e66d6c8636fe6c9bb9
(5) 0xbee374e7ca606ee2a954181b4f78c1bc5e281ff103daff011c13e4023f444740
(6) 0x51ec3e8e4519ea5f2f3fe9eaa74ccc34ac6307cc172e30fbeca0a81461f0e84b
(7) 0x1fc69876488da88d719b828b14c8145f3d93f843a53756494975a4a3aab69e75
(8) 0x24df73b184f58f0c4ac9fe1e6889a20cd71fd6acb6f7f2def77da2e030db6a63
(9) 0x4b6037b6d8a88d0a09869e83e9828ae1488e387e9c2dfec613c8b8d2fc9227a6
````

npx truffle migrate

# remix :

# 배포 및 테스트 환경을 지원하는 웹 IDE : https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js

# remix 웹페이지 에서 workspace 에 우리의 작업내용 vscode 를 가져와서 작업을 진행할수있다

# // 새 터미널 열어서

# 1. npm 전역으로 설치후

npm i -g @remix-project/remixd

# 2. 페이지에서 요청을 보냄

remixd -s . --remix-ide https://remix.ethereum.org

😩 오류 : path 환경변수에 npm 전역패키지의 실행파일 경로가 포항되어 있지 않아, remix 명령어를 찾을수 없었다

# remix IDE 페이지에서 요청을 받아주길 대기중인 상태

# 사이트 -> WORKSPACES > defalut_workspace -> connect to localhost 로선택 -> 사이트에선 실시간 수정하면 사이트나 vsc 에서 확인가능! vsc 에선 저장하면 사이트에서 refresh 할꺼냐고 물어봄

```

```

- solidity 버전이 안맞는 오류 -> 세번째 아이콘에서 버전 맞춰준다 -> 컴파일 ERC2.sol -> 네번째아이콘에서 metamask 연결하기 -> 프라이빗 계정 생성 후 연결 -> // 캡쳐해놓음 -> 캡쳐한 내용 확인하기!
- ganache 에서 private 로 지갑 연결해주기 (비밀키로 계정 생성)-> 다시 네번쨰아이콘 metamask 클릭하고 계정 연결(account 맞으면 연결된거임!) -> deploy 에서 name, symbol, amount 임의값 넣어주고 transact 하면 완료! (완료되면 deployed contracts 에 ca 추가됨!) -> deployed 에 토큰 주소 복붙해서 토큰생성하기에 넣기 ! -> 토큰생성 완료!

  ## deployed > totalSupply 등등의 탭들을 누르면 잘 작동되는거 확인할수있음

- transfer 탭에서
  to: 9번지갑 //입력
  amount : 300000000000 //입력
- transact 누르기

## 오타로 인한 사이트내 배포 이슈 (캡쳐로 정리해놓음)

## 사이트 에서 작업해봤음 HeeToken 파일 생성

- 하드코드로 생성했던 토큰 숨기고
- artifacts 폴더에서 > HeeToken.sol 파일 생성 -> 코드 컴파일!

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// 0.8.20 서버로 맞춰주고!

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SoonToken is ERC20 {
    // 상속 받은 부모 생성자 호출 ERC20 생성자 호출
    constructor() ERC20("SoonToken", "STK") {
        // 상속받은 ERC20생성자 함수 내용 추가
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}
```

---------react 에서 해보기--------
// 🧐 오늘 할 내용
// 1. 웹 메타마스크 지갑 다뜰거고
// 2. 그 지갑에 있는 토큰 량을 다 보여줄거고
// 3. 컨트랙트를 배포한 네트워크가 맞는지 or 네트워크 변경할수있게 함수실행
// 4. 지갑을 바꾸면 바꾼 지갑 내용으로 브라우저에 보일수있게
erc20 > src > abi 폴더, hooks폴더 추가
hooks 폴더 추가 > web3.hook.js 파일 생성 및 코드 작성

App.js 파일에서 작성

// 열려있으면 안열어도됨
ganache 열기 아까랑 똑같은 터미널 명령어
remix 연결 요청하기

remix 사이트에서 아까랑 똑같이
connect localhost -> 우리가 만든거 Compile -> 첫번째 지갑 계정 추가해주기 -> 사이트에서CA 확인하고 복사 -> app.js "ca" 부분에 복붙
-> artifacts > ERC20_metadata.json 파일 -> abi 복사 -> abi 폴더 > ERC20.json 파일 생성후 abi 복붙 -> app.js 에서 Import 하고 코드 마저 작성

// react 실행해보자!
erc20 경로 이동
cd erc20
npm start

// 버튼누르면 다른 네트워크에서 -> 가나시로 배포했으면 가나시로 연결시켜줌!!

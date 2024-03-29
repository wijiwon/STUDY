# 토큰

# ERC20 토큰

- ERC는 Ethereum Request for Comments의 약자
- ERC 20에서 20은 특정 제안에 번호를 매긴 토큰의 생성이나 발행 등 규칙을 의미
- 이 숫자는 식별하기 위한 숫자. 큰 의미는 없음

```sh
# 토큰과 코인의 차이
# 코인은 메인넷이 있고 토큰은 메인넷이 없는 것
# 토큰을 만들면 네트워크 안에 포함되어 있지만 토큰 자체의 메인넷이 구현되어 있지 않기 때문에 코인은 아니다.

# ERC20
# ERC20은 이더리움 네트워크에서 가장 표준이 되는 토큰, 대체 가능 토큰. 가장 기본적인 상호 교환 가능한 토큰의 기능을 정의하고 있다.
# 토큰 전송 및 잔액 조회 토큰의 소유자 등을 관리하기 위한 메서드와 이벤트가 정의되어 있는 토큰. 탈중앙화된 금융(Defi)등 사용

# soontoken {0x232323232 : 100} (100개)

# ERC721
# ERC721 대체 불가 토큰을 나타내고
# ERC721 토큰은 각각의 고유한 특성을 가지고 있고 그 토큰의 소유권을 가질 수 있는 것. 게임 아이템, 미술품, 부동산 등의 소유권을 나타낼 수 있음
# 토큰의 소유권 이전(판매 및 경매), 토큰의 메타 데이터 조회 등의 메서드와 이벤트를 정의하고 있음
# {0xsdfkjslfdf : 0x342324342} (0x342324342가 가지고 있음)
```

```sh
npm i truffle
npx truffle init

npx create-react-app erc20

# 오픈 제플린(프레임워크)에서 제공하는 ERC20, ERC721 등 표준 토큰을 가지고 상속시켜서 토큰 사용
npm init -y
npm i @openzeppelin/contracts

# 설치되면
# node_modules 폴더 안에 @openzeppelin/contracts 안 token 폴더에 토큰의 내용이 담겨 있다.

# truffle로 배포해서 테스트
# truffle-config 수정
npx truffle compile
# 토큰의 량을 확인하려면 networkId도 같은 식별자인데 디폴트 값이 설정될 수 있어서
# 옵션으로 추가를 해주자
npx ganache-cli --chain.chainId 1337 --chain.networkId 1337
npx truffle migrate

# remix
# 배포 및 테스트 환경을 지원하는 웹 IDE

# remix 웹페이지에서 workspace에 우리의 작업 내용 vscode를 가져와서 작업을 진행할 수 있다.
npm install -g @remix-project/remixd
remixd -s . --remix-ide https://remix.ethereum.org

# remix IDE 페이지에서 요청을 받아주길 대기중인 상태
# connect to localhost 클릭하면

# remix 세번째 탭에 컴파일 버전 확인하고

```









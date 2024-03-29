# ERC721 - NFT

- NFT 대체 불가능한 토큰이다.
- Non-fungible Token
- 고유의 값을 가지고 있는 토큰이다.
- 디지털 자산의 소유권을 보장한다.
- 토큰의 내용이 대체 불가능한 것이 아니고, 토큰 자체가 고유의 값을 가지고 있어서 대체 불가능이라는 뜻이다.
- NFT를 생성했을 떄 내용이 같아도 각각의 고유성을 가지고 있어 대체가 불가능하다는 의미이다.

# NFT

```javascript
const nft = {
    tokenId ; "0x11111111111111111111",     // 토큰의 고유값. 고유 식별자이다.
    url : "https://nfturl.com/data.json",   // nft에 어떤 내용을 담을지 객체 경로를 담는다. json객체로 들어간다. (ex. 사진, 동영상 등)
}
```

## url의 NFT의 내용

```json
{
  "name": "NFT의 이름",
  "description": "NFT의 설명",
  "image": "이미지 경로. NFT에 포함할 이미지 경로",
  "attributes": [
    // 원하는 추가 속성.
  ]
}
```

- url의 객체의 내용을 DB에 저장해도 NFT 민팅할 순 있지만, 이 경우에는 탈중앙화로 보기 어렵다.
- 분산 파일 시스템 IPFS에 객체의 내용, 이미지를 저장하고 URL을 전달해 NFT를 조회하면 분산 파일 시스템에 저장된 객체의 내용으로 NFT를 보여준다.

- IPFS에 파일을 업로드 하면 분산 네트워크, 중앙화 서버 없이 여러 노드들이 분산 네트워크에 파일을 저장한다.
  - 안정성
  - 무결설 및 보안 유지
  - 업로드하면 파일의 경로는 고유한 주소를 가진다.
    - 해시 기반의 주소(해시값으로 나타낸다.)
  - NFT에 담을 객체의 내용을 IPFS 저장소에 저장을 하고 URL값을 NFT 객체에 담아놓는다.
  - 분산 파일 시스템 데이터를 저장하는 프로토콜 P2P 네트워크

nft 민팅할건데 오픈제플린에서 ERC721을 받아올 것

# 오픈제플린 설치

```sh
npm init -y
npm i @openzeppelin/contracts
```

# pinata

- IPFS Provider로 사용
- pinata로 IPFS에 직접 파일을 업로드하고 업로드한 파일의 해시 주소를 가져올 것이다.
  - 이 해시 주소로 IPFS에 업로드된 파일을 다운로드하거나 확인할 수 있다.
- 이미지를 올리면 다음의 링크가 생성
  - https://black-elderly-wolverine-685.mypinata.cloud/ipfs/QmRjcxrqcdEqYDfftfadq68on7ghytLy5g3VQthx9rmWdS?_gl=1*1h9vxqb*_ga*NDU2NDY2MzQ4LjE2OTc0MjE5Nzc.*_ga_5RMPXG14TE*MTY5NzQyMTk3Ni4xLjEuMTY5NzQyMzA5My42MC4wLjA.
  - 고유의 해시값 : QmRjcxrqcdEqYDfftfadq68on7ghytLy5g3VQthx9rmWdS


# react 설치

```sh
npx create-react-app test
```

# axios 설치

```sh
cd test
npm i axios
```

# remix

```sh
remixd -s . --remix-ide https://remix.ethereum.org/
```

<과제>

- ERC 배포할 때 하나의 json으로 작업 했었는데
- 같은 내용으로 NFT를 발행하고 있었는데
- 리엑트에서 파일을 생성해서 json을 업로드하고
- 객체 만들기전에 이미지 먼저 올리고 해시주소 갖고

- NFT 이름 입력
- NFT 설명 입력
- NFT 이미지 경로
- 새로운 NFT 민팅

<+a 너무 쉬우면 opensea 제작>

- 리엑트 페이지에 본인의 NFT 내용도 같이 보여줘볼까요?
- 본인이 가지고 있는 tokenId 조회해서
- tokenURI 함수를 실행시키면 ipfs json의 경로가 뜨고
- json의 값을 요청보내서 가져오면 그 안에 NFT의 내용이 포함되어 있으니까 화면에 뿌려주면 끝

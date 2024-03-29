# 컨트랙트 복습

```sh
npx create-react-app test

cd test

npm i truffle web3 ganache-cli

# truffle init
npx truffle init

# truffle compile
npx truffle compile

```

## migration 작성

- contracts 폴더에 sol 파일에다 컨트랙트 코드 작성
- 트러플 컴파일 진행 후
- migratins 폴더에 배포 내용 코드 파일 추가
  - 파일명 = [번호]_[내용]_[파일명].js
    - 1_deploy_Counter.js
- truffle config 파일 내용에 지정한 네트워크로 배포를 진행한다.

```sh
npx truffle migrate
```

- 실행결과

# Compiling your contracts...

> Everything is up to date, there is nothing to compile.

# Starting migrations...

> Network name: 'development'
> Network id: 1696467331959
> Block gas limit: 30000000 (0x1c9c380)

# 1_deploy_Counter.js

Deploying 'Counter'

---

> transaction hash: 0x184b8cdb1dec6a5c1e539f075d6b8bb888bd2bb4afec571d7345684d7bdbd553
> Blocks: 0 Seconds: 0
> contract address: 0x05A3DfFec7A833ddd7501F58010D9E152faD52da
> block number: 1
> block timestamp: 1696467678
> account: 0xa796b78546223385037a2f9916e28B781DB95952
> balance: 999.999476304625
> gas used: 155169 (0x25e21)
> gas price: 3.375 gwei
> value sent: 0 ETH
> total cost: 0.000523695375 ETH

> Saving artifacts

---

> Total cost: 0.000523695375 ETH

# Summary

> Total deployments: 1
> Final cost: 0.000523695375 ETH

- 0x05A3DfFec7A833ddd7501F58010D9E152faD52da

### CA를 잊어버렸다면 조회할 수 있다.
- truffle console을 활성화 시키고
```sh
npx truffle console

# 배포한 컨트랙트의 이름
Counter.address

# Counter 컨트랙트의 마지막으로 배포한 CA가 나온다.
# 조회된 값 : '0x05A3DfFec7A833ddd7501F58010D9E152faD52da'
```

# solidity 계약을 작성할 것이다.
# 숫자 야구 게임을 제작할 예정.

Available Accounts
==================
(0) 0x544e691B2CBBFDBc912020bEA6B5E143E60C874d (1000 ETH)
(1) 0x6FeeBFFA07DeED9aBbB410Aa1782aaA81B403aB9 (1000 ETH)
(2) 0x185ccA7C826B494048C194bE6ca2e7f58248F073 (1000 ETH)
(3) 0xc97a1184D710D9883DB892011641517CB7A0BD99 (1000 ETH)
(4) 0xf3b00b915367733b41aD06112F88ac42C2983a76 (1000 ETH)
(5) 0xeFFE1030053fb58b26527b80F06924f262e34B0d (1000 ETH)
(6) 0x8938C2BEE46d84689e28208E72a2537d5940ed0C (1000 ETH)
(7) 0x6521E4e3a321fb85941C61B71A8437d823c2633d (1000 ETH)
(8) 0xE550E6282Ba25fef70c6d6Eb189E4Eb32C3953F0 (1000 ETH)
(9) 0xfE4A5C12773416e0a2200086e3cD8E871409ED2F (1000 ETH)

Private Keys
==================
(0) 0x5882b14f04a479f2066f740fa8c2f23aa158bc83ec6260da5b6aa525a1763230
(1) 0xce651be985d20b98defde467af9739ad5a54642318b0f49cac9032a4a9345f9c
(2) 0xaa476be1c91092027debc75ac0020e00899089c5028bef4007dd82bfe0c4128b
(3) 0xcb97ec09511b44dde8acc7d1c92735821f46931a7dce46f41fa86cee6004a781
(4) 0x46e7fbd9323c8de4cb51dcc5d3a34ef60fa5e223dd2e51e13437de1b5584d4cd
(5) 0x41bd9fcfa14123e02fd290c3e9e5b1f02fbfe41bfec5972ac081652bdae50d44
(6) 0x0fec5913a9aba533d487f78c7ec59b55e91e9c94bec7ec3f59c5ac524b6afdb9
(7) 0x2a94f15ad9e4e1ccdf478e4f9989596a8798c6bc91eadb25d3fbf1a9888d4fa4
(8) 0x11172ea477afadfc30a4ce6e760972b329ee45b7866de119de5bead5243634bc
(9) 0xa7875bf8dfd38fa3df3ebab1ae21e96e170be8c05fb4da06ed3ab9e30e0265ab




1_deploy_Counter.js
===================

   Deploying 'Counter'
   -------------------
   > transaction hash:    0x55252d8b0f863c8cdc140363d139daabbbc74974af2a4543c5b82b830e6e2ddc
   > Blocks: 0            Seconds: 0
   > contract address:    0xdE785285D2Dd6229Bf1Ad4271e5dd37307BDA1a8
   > block number:        1
   > block timestamp:     1696482793
   > account:             0x544e691B2CBBFDBc912020bEA6B5E143E60C874d
   > balance:             999.999337430125
   > gas used:            196317 (0x2fedd)
   > gas price:           3.375 gwei
   > value sent:          0 ETH
   > total cost:          0.000662569875 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:      0.000662569875 ETH


2_deploy_Baseball.js
====================

   Deploying 'Baseball'
   --------------------
   > transaction hash:    0x10d9c8fc656d6298cf0d94d8a1fa4cf556abc89c8f2afe9a3649166eac55e5dd
   > Blocks: 0            Seconds: 0
   > contract address:    0x37c8Fe8b3432AA4Cf8336118B96de537B2266B2A
   > block number:        2
   > block timestamp:     1696482793
   > account:             0x544e691B2CBBFDBc912020bEA6B5E143E60C874d
   > balance:             999.997757096099091078
   > gas used:            483718 (0x76186)
   > gas price:           3.267056479 gwei
   > value sent:          0 ETH
   > total cost:          0.001580334025908922 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:     0.001580334025908922 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.002242903900908922 ETH



- 게임 재시작
- 어드민만 답을 확인하는거
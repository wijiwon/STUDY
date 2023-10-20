# 포켓몬 뽑기 컨트랙트

# 리액트 설치
```sh
npx create-react-app erc20
```

# 리믹스 설치
```sh
npm install -g @remix-project/remixd
remixd -s . --remix-ide https://remix.ethereum.org
```

# 가나슈 열기
```sh
npm i ganache-cli
npx ganache --chain.chainId 1337 --chain.networkId 1337
```
- 실행결과
~~~
Available Accounts
==================
(0) 0x66e2Ffd26bAd701C9473f0E5E9f634111275680f (1000 ETH)
(1) 0x488f059779c9D09A8b80b591ff77e417677317F3 (1000 ETH)
(2) 0x13F0C71E3861fDf39d2f20cfF3b0AD4E72F50156 (1000 ETH)
(3) 0x9381FF0467EB6c04783438924Fa958020D9Ca933 (1000 ETH)
(4) 0x5f49a643C76b081a7b572c29c7B68033323c3ebC (1000 ETH)
(5) 0x4fB1973b1c51bB8a9125844730343E00A5348C26 (1000 ETH)
(6) 0xa3647BD1D1F0f74a52B88829f27c2856dB5f1318 (1000 ETH)
(7) 0x404F61179Fb1EfE851BE78fE2887374e01091190 (1000 ETH)
(8) 0x648be5d909Afd5D33C871eD94878c17FBc30462c (1000 ETH)
(9) 0x5b6B26fC9C5cE2Ef2D1Ea65b9d24E4bC3EF45958 (1000 ETH)

Private Keys
==================
(0) 0x016d1007506655368a5adb8f702f313921028f03e88ca6935179ac7859cdc921
(1) 0x0d77d868e104215b488b08518e8e9b8458b63a3ec982cec9b47df4a39055e0fd
(2) 0x958dc0c31e0232e6fd5e185a7b21c07d7eb10a596894c50d472a4c573d39039a
(3) 0x5e5a84dbb709e9ee5f339b820939a27bd6738af7e72b9f3a79d4588055287cd6
(4) 0x50143ae929e68ec304409501eaf4bf5a95a803e2181a90c2bf63c5178c369a17
(5) 0x897ee14dbbb47ecf714ae5b0c7a0bf66a744e0c1af888ca6434e1b1c42df62b7
(6) 0x4a2dd88019c6e184a26e53a857dd8b85c59dc357b9b25d5cb0cff8ef6b3e668e
(7) 0xbb1546fa03485fbb5cbdec811b2b54ed1daa59ce4cd86f5531c0d6252f4068e6
(8) 0xe0478341ebb2f9f1e3eff3c9c9058a3e9fa9846e46a6af09845a5f77f26202ef
(9) 0xbf4750dea83738c671ee20679403075a4a17b831dc9cb57d09ef0ba0bb3466a7

HD Wallet
==================
Mnemonic:      hockey unveil fiber wet fun decorate can clutch palace metal diesel rug
Base HD Path:  m/44'/60'/0'/0/{account_index}

Default Gas Price
==================
2000000000

BlockGas Limit
==================
30000000

Call Gas Limit
==================
50000000

Chain
==================
Hardfork: shanghai
Id:       1180

RPC Listening on 127.0.0.1:8545
~~~


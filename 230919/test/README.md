# 사용할 모듈 (merkle, crypto-js)
``````sh
npm init -y

npm i -D typescript ts-node

npm i -D @types/merkle merkle
npm i -D @types/crypto-js crypto-js

# tsc-alias tsconfig-paths : node 환경에서 실행을 할 때 우리가 정해준 별칭을 경로로 변환해서 실행기키기 위해 사용
npm i -D tsc-alias tsconfig-paths
``````

``````sh
npx tsc --init
``````

``````sh
npm i -D @types/jest jest
npm i -D ts-jest
npm i -D crypto-js
``````

## jest.config.ts
- jest로 테스트 코드를 실행할 때 옵션설정 파일
- 


# 실행
``````sh
npm run test
``````

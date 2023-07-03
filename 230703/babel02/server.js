// 모듈 시스템 변환 ES5

// # babel02 만들고
// npm init -y
// npm install @babel/core @babel/cli @babel/preset-env
// npm install @babel/plugin-transform-modules-commonjs

// ES6 문법으로 작성
import express from "express";

const app = express();
app.listen(3000, () => {
  console.log("server on~");
});

// .babelrc 설정
// .babelrc : "plugins": ["@babel/plugin-transform-modules-commonjs"]

// babel 실행
// npx babel server.js --out-file dist/server.js

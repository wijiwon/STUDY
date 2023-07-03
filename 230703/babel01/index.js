// babel

// 자바스크립트 코드의 변환을 도와주는 도구이다.
// 자바스크립트를 컴파일 해주는 도구이다.

// 자바스크립트 문법이 계속해서 진화해왔고
// ES5에서 ES6로 문법이 개발되고
// ES6 문법이 개발되었는데 ES5에서 개발한 것들을 모두
// 변환하기 힘들어서
// babel로 문법을 쉽게 고쳐서 쓰려고 변환시켜준다.

// 모듈 시스템

// --------------- commonjs = (require, module.exports) ------------------- //
// a.js
// const text = "하이하이";
// module.exports = text;

// b.js
// const { text } = require("a.js");
// console.log(text);
//------------------------------------------------------------------------- //

// --------------------- ES6 = (import, export) --------------------------- //
// a.js
// const text = "하이하이";

// 1. export {text}         : 여러 개를 내보낼 경우
// 2. export default text   : 단일로 내보낼 경우

// b.js
// 1. import {text} from "a.js"     : 여러 개를 받을 경우. 구조분해 할당으로 받기 때문에 키 값을 맞춰주어야 한다.
// 2. import text from "a.js"       : 단일로 받을 경우. 키 값을 원하는 이름으로 바꿀 수 있다.
// console.log(text)
// ------------------------------------------------------------------------ //

// babel 기본 사용법

// babel은 기본적으로 자바스크립트로 구성되어 있다.
// npm을 통해서 설치가 가능하다.

// 1. babel 기본 구성 설치
// npm init -y <= 기본설정 package.json
// npm install @babel/core @babel/cli @babel/preset-env <= babel 구성 설치

// 2. babel 환경 구성
// .babelrc 파일 만들기
// rc = Run Commands, Run Controll 등등의 의미

/* 
    JSON으로 설정\
    {
        "presets" : ["@babel/preset-env"]
    }
*/

// 3. babel 실행
// npx babel [변환할 파일 명] --out-file [내보낼 경로]
// npx babel app.js --out-file dist/app.js

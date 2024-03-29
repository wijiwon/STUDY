// npm init
// package.json 파일을 만들어준다.
// 파일을 만들 때 속성들을 입력하라고 함..

// 메타데이터: 데이터들을 설명해주는 데이터(속성)
// 예) 책이 한 권 있다고 가정하면, 제목, 저자, 출판사 등의 책의 정보

// 우리의 프로젝트 정보를 가지고 있는 json 파일이다.
// 메타데이터 설명을 가지고 있는 json 파일. 초기화 명령어
// npm init
// 패키지 이름 뭐야 등등 질문을 해서 패키지 설정을 직접 입력해주어야 한다.

// npm init -y
// 모든 설정에 기본 값으로 설정하는 명령어

// {
//     "name": "230501",                                            패키지의 이름
//     "version": "1.0.0",                                          패키지의 버전
//     "description": "",                                           패키지의 설명: 무슨 무슨 작업을 진행한 프로젝트다
//     "main": "index.js",                                          모듈화 시킬 때 메인 파일
//     "scripts": {                                                 우리가 실행시킬 때 스크립트의 명령어
//       "test": "echo \npm"Error: no test specified\" && exit 1"
//     },
//     "keywords": [],                                              검색 키워드 배열의 형태로 넣어주면 된다.
//     "author": "",                                                제작자. 패키지의 저자
//     "license": "ISC"                                             패키지의 라이선스. ISC: 공개
//   }
  

// name: 프로젝트의 이름이다.
// version: 프로젝트의 버전을 정의한다.
// description: 프로젝트의 설명. 문자열로 작성하면 된다.
// keywords: 프로젝트를 검새갈 때 참조하는 키워드들을 배열로 전달 해주면 된다.
// author: 패키지 만든 사람. 작업자 정보
// license: 패키지 라이선스
// main: 이 값을 작성해주면 패키지를 require 함수로 불러올 때 이 파일을 불러올 수 있다.
// scripts: 우리가 자주 실행할 것 같은 명령어를 작성해두고 npm 명령어로 실행할 수 있다.
    // 예) npm run test
    // "scripts" : {start : "node index4.js"} === npm start == node index4.js
// Web Pack

// babel: 단일 파일을 코드 자체를 변환할 때 사용한다.
// web pack: 모듈 번들러 = 여러 파일을 하나의 파일로 구성해주는 것이다.
    // js 1, js 2, js 3, js 4 가 있다고 하면 빌드 시 이 여러 파일을 하나의 파일로 구성해주는 것이라고 생각하면 된다.

// 모듈
// 모듈 : 프로그램을 구성할 때 구성 요소로, 관련된 데이터나 함수를 하나로 묶은 단위이다.
    // user
    // user.controller
    // user.service
    // user.view
    
// 번들러
// 번들러: 의존성을 가지고 동작하는 모듈 코드를 하나의 파일로 만들어 주는 것

// web pack의 속성
// entry : 진입점을 지정한다. 시작점으로 사용할 모듈을 webpack에 알려준다.
// output :  내보내는 번들링 방법을 결정한다. 생성한 번들링 파일의 위치, 이름
// loaders : 번들링 중에 모듈의 소스 코드에 적용되는 자바스크립트나 css 이미지 파일을 처리한다.
// plugins: 추가 기능 사용 시 번들 최적화. html파일 생성이나 환경변수 삽입 등

// babel 속성은
// presets / plugins


// 1. web pack 기본 사용 -----------------------------------------------------

// 패키지 설치
// npm init -y
// npm install webpack webpack-cli

// 2. 프로덱트 생성 ----------------------------------------------------------
// src 폴더를 생성
// 번들링 진행을 해봅시다.

// webpack의 설정파일
// webpack.config.js

// 3.webpack 실행 ------------------------------------------------------------
// npx webpack 
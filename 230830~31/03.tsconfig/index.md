# tsconfig.json

- compilerOptions : typeScript 파일을 컴파일 진행 시 어떤 형태로 컴파일을 진행할 지 속성 정의하는 부분
- include : 컴파일을 진행할 폴더를 지정
- exclude : 컴파일에서 제외할 폴더 지정

## compilerOptions 자주 사용하는 속성

- module : 모듈 시스템 지정
- outDir : 내보낼 경로 지정
- target : 번들링 문법 지정
  - 예) es5, es6 ... 등의 문법을 지정한다.
- esModuleInterop : true
  - (import/export 문법을 자연스럽게 변경 해주는 행위)
  - 주로 true로 설정한다.
  - (CommonJS 형식과 ES6 형식의 혼용을 자연스럽게 통합 해주는 속성이다.)
- strict : true로 두자. 엄격
- baseUrl : 모듈의 상대 경로를 지정한다.
- paths : 'baseUrl' 경로를 기준으로 상대 위치를 가져오는 매핑 값 (경로를 변수처럼 사용한다.)

```sh
npm init -y
npm tsc --init
```

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "outDir": "./dist",
    "target": "ES6",
    "esModuleInterop": true,
    "strict": true,
    "baseUrl": "./src",
    "path": {
      "@user/*": ["user/*"]
    }
  },
  "include" : ["src/**/*"],
  "exclude" : ["**/*.test.ts"]  // 모든 폴더의 모든 파일에서 '.test.ts' 확장자가 붙은 파일은 모두 제외
}
```

``````json
// package.json 추가
{
  "build" : "tsc"
}
``````

### 문제! 경로가 @user 이 부분이 컴파일 되고나서 변환이 되지 않았다.
- 이 경우 JS에서 경로를 읽지 못한다.

## tsc-alias
### 빌드시에 별칭 그대로 경로가 들어가는데 별칭 그대로 경로지정 되어있으면 문제가 생기겠죠? 이 별칭을 경로로 변환 해주는 패키지이다.

``````sh
npm install -D tsc-alias
``````

``````json
// package.json 추가. 별칭 수정 경로 추가
{
  "build" : "tsc && tsc-alias"
}
``````
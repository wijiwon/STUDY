const path = require("path");

// webpack 구성 객체를 만들어서 내보내주자
module.exports = {
    // 진입점 시작점 설정
    entry: "./src/index.js",

    // 번들된 파일의 내보낼 파일 옵션
    output : {
        // 파일 이름 설정
        filename : "bundle.js",
        // 파일의 폴더 설정
        path : path.join(__dirname, "dist"),
    }
}
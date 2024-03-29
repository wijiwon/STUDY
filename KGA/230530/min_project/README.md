# 이슈사항

## .env 파일의 값이 불러와지지 않는 에러
- 에러 메세지
    - parent: Error: Access denied for user ''@'localhost' (using password: YES)
- 해결방법
    - config/index.js 파일에 dotenv.config를 불러와 선언하여 해결
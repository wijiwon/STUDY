// 오늘은 도메인이랑 https 설정까지 진행할 예정
// Nginx 사용할 예정이다.

// 



// nvm 노드 버전 매니저
// nodejs 설치하고 다른 버전 설치할 때
// 삭제 하고 다시 설치할 필요 없이 버전 관리가 편하다.
// 원하는 버전을 설치받고 바로 스위치 가능

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash 

// 소스 파일 적용
// source ~/.bashrc

// 전체 목록 확인
// nvm list-remote

// 원하는 버전을 선택하고 설치
// nvm install 16(여기에 숫자 버전)

// 인스턴스에 v4 주소는 우리가 인스턴스를 실행하거나 다시 실행하면
// 동적으로 ip 주소가 할당된다.
// 예) ec2-43-201-113-223.ap-northeast-2.compute.amazonaws.com

// 도메인 연결을 해당 v4로 연결해놓았는데
// 이 주소가 바뀌면 연결이 끊기게된다. 이러한 일이 발생하면 안되니, 탄력적 ip를 설정하면
// 고정 ip를 할당 받을 수 있다.



// Nginx를 사용해서 프록시 설정
// 프록시는 말 그대로 대신이라는 뜻이다.
// 통신을 할 때 중간에서 대신 통신을 해주는 역할을 한다.
// 중계역할을 해주는 것이 프록시 서버이다.
// 클라이언트와 서버 사이의 중계 서버

// 클라이언트는 프록시 서버를 서버로 알고있다.
// 서버는 프록시 서버를 클라이언트라고 알고 있다.

// 프록시는 위치에 따라 포워드 프록시 와 리버스 프록시로 구부된다.

// 리버스 프록시를 사용할 예정
// 리버스 프록시: 프록시 서버가 서버의 앞에 위치하고 클라이언트가 서버에 요청을 하면
// 리버스 프록시가 호출되고 리버스 프록시는 서버에게 요청해서 응답을 받고 클라이언트한테 전송한다.
// 클라이언트가 서버에 직접 요청하는게 아니고 프록시 서버가 요청을 받고 서버로 요청해서 서버의 응답을 받게 된다.
// 프록시 서버가 서버를 감춰주기 때문에 보안에 좋다.
// Nginx를 사용해서 리버스 프록시를 만들어보자

// 클라이언트 -> 인터넷 -> 프록시 서버 -> 서버
// 서버 -> 프록시 서버 -> 인터넷 -> 클라이언트

// 그림 설명
// 클라이언트가 Nginx로 80번 포트로 요청을 보냄 => Nginx에서 express 서버에 8080포트로 요청을 보낸다.
// express 서버에서는 응답의 내용을 Nginx로 보냄 => Nginx는 클라이언트에게 응답의 내용을 전송한다. 

// aws 인스턴스 접속하고

// nginx 설치
// sudo apt install nginx

// nginx 시작
// sudo service nginx start

// nginx 상태확인 
// sudo service nginx status

// sudo service nginx stop

// 웹 사이트 호스팅을 할 때 설정에 대한 값이
// default 파일이 생성된다.
// cd /etc/nginx/sites-enabled/

// sudo vi default

// 설정파일 수정
// try_faile 주석
// proxy_set_header HOST $host;
// proxy_pass http://127.0.0.1:5697;
// proxy_redirect off;

// 예 )
// location / {
//     # First attempt to serve request as file, then
//     # as directory, then fall back to displaying a 404.
//     # try_files $uri $uri/ =404;

//     proxy_set_header HOST $host;
//     proxy_pass http://127.0.0.1:8080;
//     proxy_redirect off;
// }


// proxy_set_header : 요청이 들어온 브라우저의 host내용을 넘겨준다는 뜻
// proxy_pass 80으로 포트를 듣고 들어온 요청을 8080포트로 전달하겠다는 뜻
// proxy_redirect off : SPA일 경우 redirect 없애겠다는 의미. SPA가 아니면 굳이 써줄 필요는 없다.
// SPA 싱글페이지 어플리케이션 react vue 등

// 설정 파일을 수정했으면
// 설정 파일이 정상적인지 확인을 먼저 해주자
// 문법에 오류가 있는지 체크

// sudo nginx -t

// 경로 원래 경로로 가자
// cd /home/ubuntu/

// nginx 재실행

// sudo service nginx restart

// 탄력적 ip주소를 도메인으로 교체하자
// 가비아에서 도메인을 구입해서 사용할 예정이다.

// 이 도메인을 사용해서 탄력적 아이피로 요청이 갈 수 있게 한다.
// AWS route 53을 사용할 것
// 호스팅 영역 클릭
// 도메인 입력 후에 호스팅 영역 생성

// 상세 정보를 보면 레코드
// DNS 레코드는 도메인의 이름과 관련된 정보를 나타내는 데이터이다.
// NS(네임서버): 인터넷에서 도메인을 ip주소로 변환하는 역할을 담당한다.
// 도메인을 입력하면 네임서버에게 도메인 ip 주소를 요청한다.
// 그래서 웹 사이트에 접근을 할 수 있게 해준다.


// 레코드 추가
// A 레코드: 도메인 이름을 v4주소로 매핑
// A 레코드에 탄력적 아이피를 값으로 작성

// CNAME 레코드: 서브 도메인으로 설정
// www.weeeji.site로 접속했을 때 weeeji.site로 이동하게끔 해주는 개념

// https로 보안이슈 해결
// 검증된 사이트라는 것이고
// https를 요청할 때 인증서를 발급받아서 인증을 요청하는데
// https설정
// 배포한 서버에 https를 설정해서 보안 이슈를 해결한다.
// 인증서를 발급받을 곳은 무료로 인증서를 3개월짜리 발급받을 것이다.
// 3개월마다 발급을 받으면 무제한으로 무료이용이 가능하다.
// 모질라 라는 곳에서 certbot이라는 친구를 사용해서
// https를 간편하게 설정할 수 있다.
// 3개울마다 우리가 직접 인증서를 재발급 받을 필요가 없이
// 알아서 3개월마다 재발급 받고 우리 메일로 알려준다.

// certbot: nginx랑도 호환이 좋고 간단하게 인증서 발급 갱신이 가능하다.
// https://certbot.eff.org/

// 설명대로 설치를 하자
// sudo snap install core
// sudo snap refresh core

// sudo snap install --classic certbot

// certbot 실행파일에 링크 설정
// sudo ln -s /snap/bin/certbot /usr/bin/certbot

// nginx관련 certbot 실행
// sudo certbot --nginx     => 도메인 작성(weeeji.site) 

// nginx에 default파일을 수정
// cd /etc/nginx/sites-enabled/에 있는 파일

// location 위에
// server_name 도메인/

// 문법 오류 확인
// sudo nginx -t

// 경로 원래 경로로 가자
// cd /home/ubuntu/

// nginx 재시작
// sudo service nginx restart

// 3깨월마다 재발급 해주는 명령어
// sudo certbot renew

// 인증서 재발급 체크
// 실제로 인증서를 갱신하지 않고 시뮬레이션으로 체크한다.
// 발급할 때 사전에 문제가 생길지 여부를 체크한다.
// sudo certbot renew --dry-run                 
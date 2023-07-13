// 웹 서비스를 개발하고 완료되면 배포를 해서 사용자에게 소프트웨어를 전달해야하는데
// 배포를 하기 위해 필요한게 제 3자가 접속할 수 있는 서버 컴퓨터가 필요하다.

// 365일 내내 24시간 켜져있어야 하는데
// 이 과정을 수행할 수 있는 서버 컴퓨터를 대여해주는 호스팅 업체를 통해 배포를 진행한다.
// 호스팅은 2 가지로 나뉜다.
    // 서버 호스팅: 물리 서버를 단독으로 임대 및 구매
    // 웹 호스팅: 서버의 일부 공간을 임대하는 개념이다. (컴퓨터를 잘게 쪼갠 것이라고 보면 된다.)
        // 웹 호스팅의 장점: 서버나 인프라 구축이 필요 없고 비용이 저렴하다는 장점이 있다.
        // 웹 호스팅의 단점: 웹 호스팅은 단독 서버(서버 호스팅)에 비해 자원(사용량)이 한정적이다.

// 우리는 웹 호스팅 업체 중 하나인 AWS를 통해서 서버를 배포할 것이다.

// IaaS(Infrastucture as a service) : 컴퓨터 자원만 제공하는 형태이다. (AWS가 해당된다.)
// PaaS: 헤로쿠 등 넷플리파이 등등 기존 환경에서 서버스를 올려주는 형태

// 인스턴스 만들기 전에 오른쪽 상단에 리전(국가) 확인. 서버 컴퓨터가 가깝게 설정해야 한다.
// 인스턴스 생성 -> 인스턴스의 사용 운영 체제 선택 
// 우리가 사용할 os는 우분투 프리티어

// 키 페어는 절대 잃어버려도, 깃에 올려도 안된다. 보관을 잘하자
// 혹시나 전달해야 할 경우, 저장매체(USB 등)을 사용하자
// 키 페어 : wiiiiiiji

// ssh TCP 프로토콜. 포트범위 22 -> 기본으로 가지고 있는 디폴트 포트라고 생각하면 된다.
// 인스턴스에 접근하기 위해서

// 보안규칙을 추가한다. SSH, HTTP, HTTPS, MYSQL
// 각 규칙별 원본 란에서 '0.0.0.0/0'를 선택한다.

// 인스턴스에 mysql을 설치한다.


// 업데이트
// sudo apt-get update
// sudo apt-get install mysql-server

// mysql 설치 명령어
// sudo mysql -u root -p
// 비밀번호는 그냥 엔터누르자

// 데이터베이스 세팅
// 우리가 사용할 데이터베이스를 하나 만들어보자
// 쿼리문 그대로 사용해서 만들자
// create database 이름;

// 데이터 베이스 확인
// show databases;

// 데이터 베이스를 사용할 때 우리가 사용할 유저를 만들어주자
// 사용할 유저 생성
// create user '여기에 유저 이름 '@ '%' 'identified by '여기에 사용할 비밀번호';
// 예) create user 'admin'@'%' identified by 'admin1234';

// 만든 유저에게 권한 설정
// grant all on 데이터베이스 이름.(데이터 베이스이름 뒤에 점)* to '유저이름'@'%';
// 예) grant all on test.* to 'admin'@'%';

// 권한이 주어졌는지 확인
// show grants for '여기에 유저 이름';
// 예) show grants for 'admin';

// 외부에서 인스턴스의 mysql에 접속을 해보자
// mysql 나가고 exit
// sudo service mysql restart;
// sudo mysql -u admin -p
// 비밀번호는 입력하는게 보이지 않는다. admin1234

// 보안 그룹에 mysql을 허용해놓은 이미?
// mysql 외부 접근 허용
// sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf;  (mysql 에서 작업하는 것이 아닌, 리눅스에서 작업하는 것.)
// 키보드로 쭉 내려서 bind-address 수정
// 파일을 열고 i를 눌러서 수정 모드 진입한다.
// 0.0.0.0으로 수정한다.
// esc를 눌러서 수정모드를 푼다.
// :wq! : 저장 후 종료한다.
// :q! : 저장 X 종료
// :w! : 강제 저장
// :wq!로 저장 후 종료를 해준다.

// Mysql 워크벤치를 켜서 새로운 커넥션을 생성한다.
    // name: 임의의 값으로 입력.
    // Hostname: aws의 인스턴스에서 "퍼블릭 IPv4 DNS"의 주소를 복사하여 넣는다.
    // Username: mysql을 연결하여 생성한 이름을 넣는다. 지금의 경우는  "admin"
    // Password: 'Store in Vault ...' 을 클릭하여 mysql 생성 후 입력한 비밀번호를 입력해준다. 지금의 경우 "admin1234"
    // 'Test Connection'을 클릭하여 생성가능 여부를 확인하고 'OK'를 눌러 생성한다. 

// 프로젝트를 설치받자
// git에 올린 프로젝트를 설치
// git init
// git remote add origin "깃 레퍼스토리지 주소 (HTTP)"
// git pull origin master

// nodejs 설치
// sudo apt-get update
// sudo apt-get install -y build-essential
// sudo apt-get install curl
// 원하는 노드 버전을 적어주면 된다.
// curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash --

// nodejs 설치합니다.
// sudo apt-get install -y nodejs

// node 버전 확인 node -v
// npm 버전 확인 npm -v

// vi "파일명" : 해당 파일의 내용을 확인할 수 있다.
// :q!로 종료해서 나온다.

// package.json의 모듈들을 npm i 로 저장


// git에 올라가 있는 .env의 정보를 ASW와 연결된 mysql 정보로 저장되어 있는지 확인한다.
// AWS의 인스턴스에서 보안 -> 보안그룹 -> 인바운드 규칙 편집 -> 규칙추가 -> 소스유형(사용자지정 TCP)/포트범위 (서버번호)/소스(0.0.0.0/0) -> 규칙저장 
// npm start로 서버 실행
// 인스턴스 -> 퍼블릭 IPv4 DNS 복사
// "퍼블릭 IPv4 DNS":포트번호/경로 로 접속 시 접속완료
    // http://ec2-3-34-47-240.ap-northeast-2.compute.amazonaws.com:5697/signUp


// 포트 포퉈딩을 해서 포트 80 http로 접속했을 때 5697포트로 재 매핑 시켜주자
// sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5697;
    // --dport 80 접속 했을 때 --to-port 5697 이 포트로 재매핑
    // http://ec2-3-34-47-240.ap-northeast-2.compute.amazonaws.com/signUp 포트 번호 없이도 접속이 잘 이루어짐
    // http : 80번 포트
    // https: 443 포트

// 포트 포워딩 확인 명령어
// sudo iptables -t nat -L --line-numbers

// 포트 포워딩 삭제 명령어
// sudo iptables -t nat -D PREROUTING 인덱스 번호

//그리고 서버대기가 종료되는데
// 백그라운드에서 서버를 대기시켜서 계속 동작하게
// pm2설치
// npm i pm2
// package.json 부분에서 실행 스크립트 명령어를 npde app.js로 실행했을텐데
// pm2 start app.js로 수정하면 된다.
// 서버가 종료되어도 백그라운드에서 노드 서버 실행
// 서버 종료는 npx pm2 kill : 종료
// 리스트 확인 npx pm2 list : 리스트

// vi package.json 로 package.json을 수정한다.
// 터미널에서 npm start로 실행하면 백그라운드에서 서버를 열어준다.

// 인스턴스 작동을 완료하면 해당 인스턴스를 클릭하고 상단의 "인스턴스 상태"를 클릭-> "인스턴스 중지"를 실행한다.
// "인스턴스 종료"를 선택하면 해당 인스턴스가 삭제된다.
// 프리티어라도 너무 많은 데이터베이스를 사용하면 요금이 청구될 수 있으니 사용 후 꼭 중지시킬것!
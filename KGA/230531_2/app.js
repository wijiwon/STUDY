// AWS 연결
    // ssh -i "testkey.pem" ubuntu@ec2-3-39-190-99.ap-northeast-2.compute.amazonaws.com

// 업데이트
    // sudo apt-get update

// mysql 설치
    // sudo apt-get install mysql-server

// mysql 접속
    // sudo mysql -u root -p

// test 데이터베이스 생성
    // create database test;

// 데이터베이스 확인
    // show databases;

// mysql에서 사용할 유저 생성
    // create user 'testadmin'@'%' identified by '1234';

// 유저에게 권한을 설정한다.
    // grant all on test.* to 'testadmin'@'%';

// 해당 유저에게 권한이 주어졌는지 확인한다.
    // show grants for 'testadmin';

// 외부접속 허용을 위해 "mysqld.cnf"파일을 열어준다. 단, mysql이 아닌 리눅스에서 작업을 진행해야 한다.
    // sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf;

// 열린 파일을 마우스 휠이 아닌 키보드 방향키로 내려서 "bind-address"를 찾는다.
// "i" 를 눌러 수정모드로 설정하고 해당 값을 "0.0.0.0"으로 수정한다.
// "esc"를 눌러 수정모드를 나가고, ":wq!"를 입력하여 저장 후 종료한다.


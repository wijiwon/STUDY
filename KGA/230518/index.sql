-- 데이터 베이스
-- 단순하게 데이터를 저장하는 공간으로 보면되고,

-- sql 명령어를 사용해서
-- 데이터베이스에 구현된 기능을 실행시키기 위해서 사용하는 특정한 언어이다.
-- 데이터를 보관하거나 저장하거나 삭제 또는 수정을 할 수 있다.

-- 관계형 데이터베이스
-- mysql, oracle, mariaDB 등

-- 비관계형 데이터베이스
-- MongoDB


-- CLI로 mysql에 접속하는 방법
-- mysql -u root -p
-- 비밀번호 입력

-- 스키마 전부 확인
-- show databases;

-- sql문은
-- 데이터 정의어 (DDL)
-- 데이터 조작어 (DML)
-- 데이터 제어어 (DCL)

-- 데이터 정의어
-- CREATE
-- SHOW
-- DROP
-- ALTER

-- 데이터베이스 만들어보자
CREATE DATABASE testmysql;

-- 데이터베이스들 확인하는 명령어
SHOW DATABASES;

-- 데이터베이스를 삭제하는 명령어
DROP DATABASE testmysql;

-- 사용할 데이터베이스 지정
USE testmysql;

-- 데이터베이스 안에 있는 테이블 확인
SHOW TABLES;

-- 테이블 생성
-- 테이블에 고유키(PRIMARY KEY)는 한 개만 들어갈 수 있고 중복이 되지 않는 값이다.
CREATE TABLE store(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tel VARCHAR(20)
);

CREATE TABLE store2(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tel VARCHAR(20)
);

-- 테이블에서 필드명과 타입을 확인할 수 있는 명령어
DESC store;

-- 데이터 타입
-- 숫자형, 문자형, 날짜형, 이진데이터 타입이 있다.ADD

-- 숫자형
-- INT: 4byte - 범위: 21억

-- 문자형
-- VARCHAR: 255byte - 가변 데이터: 우리가 선언한 범위보다 작으면 알아서 해당 데이터의 크기만큼으로 맞춰준다.
-- CHAR: 255byte - 고정 데이터: 우리가 선언한 범위를 다 차지한다. 선언한 범위가 작으면 남은 공간은 빈 공간으로 놔둔다.
-- TEXT: 65535byte

-- 날짜형
-- DATE: ' 년 월 일 '을 표시할 수 있다.
-- TIME: 시간을 표시
-- DATETIME: ' 년 월 일 시간 '을 표시한다. 형식은 (YYYY-MM-DD-HH:MM:SS)으로 구성된다.
-- TIMESTAMP: ' 년 월 일 시간 '을 표시한다.(INTEGER) 4byte

-- 이진 데이터 타입
-- BLOB: 이미지

-- KEY
-- PRIMARY KEY: 중복 입력 안되고, 테이블에 하나씩만 사용할 수 있다. NULL값도 안된다.(고유키)
-- UNIQUE: 중복 입력 불가. 키를 여러 개 줄 수 있다. NULL값도 사용이 가능하다.

CREATE TABLE user(
    user_id VARCHAR(20) PRIMARY KEY,
    -- NOT NULL: 빈 값이 들어가면 안된다.
    user_pw VARCHAR(20) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    -- DEFAULT: 따로 추가한 값이 없으면, 기본 값을 지정해준다.
    gender CHAR(4) DEFAULT "남자",
    -- now(): 현재 시간을 만들어주는 함수
    date DATETIME DEFAULT now()
);

DESC user;

-- 데이터 조작어
-- SELECT
-- INSERT
-- UPDATE
-- DELETE

-- 테이블에 값을 추가
INSERT INTO user(user_id, user_pw, user_name, gender)VALUES("userid3","userpw1","weee","w");

SELECT * FROM `user`;

-- -- NULL 값이 들어가면 안되기 때문에 해당 구문은 실행할 수 없다.
-- INSERT INTO user(user_id, user_name)VALUES("123","jiiii");

-- 테이블 열 검색
-- WHERE문으로 테이블을 조회해서 해당 필드가 'userid1'인 값을 찾아서 조회한다.
SELECT * FROM user WHERE user_id = "userid1";
SELECT * FROM user WHERE gender = "w";

-- 테이블 열 수정
-- SET: 해당 값을 수정할 때 사용
-- UPDATE문과 짝으로 사용한다.
UPDATE user SET gender = "m" WHERE user_id = "userid2"; 
UPDATE user SET user_pw = "234", user_name = "jiiii" WHERE user_id = "userid2"; 

-- 테이블 열 삭제
DELETE FROM user WHERE user_id = "userid3";

-- 게시판 테이블 만들기
-- 이름은 boarder
-- 컬럼: id, content, writer, date, likes
-- id = int 11자 자동증가, 고유키
-- content = text타입 null도 추가 가능
-- writer = varchar 40자 null 안되게
-- like = int 11자 기본값 0

-- row를 6개 추가하기

CREATE TABLE boarder(
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    writer VARCHAR(40) NOT NULL,
    likes INT DEFAULT 0
);
DROP TABLE boarder;

DESC boarder;

INSERT INTO boarder (content, writer, likes) VALUES ("내용6","작성자6","7"), ("내용8","작성자8","8");

SELECT * FROM `boarder`;

-- 교수님이 어케 하는지 보여줄게여 ^_-
-- mysql -u -p: CLI 환경에서 mysql 접속
-- create database [데이터베이스 이름]: 데이터베이스 생성(엑셀파일 생성같은)
-- drop database [데이터베이스 이름]: 데이터베이스 삭제
-- create table[테이블 이름] ([필드명 데이터 타입][필드명 데이터타입]): table 생성
-- show databases: 모든 데이터베이스 조회
-- show tables: 모든 테이블 조회
-- use[데이터베이스 이름]: 사용할 데이터베이스 선택(엑셀파일 열기 같은)
-- DESC [테이블 명]: 테이블의 필드를 한 줄로 확인(엑셀과 비교)
-- SELECT 필드1,필드2 FROM [테이블 명] : 필드 1, 필드 2에 대한 테이블 전체 조회
-- DELETE FROM [테이블 이름] WHERE [필드명] = "값" : 테이블의 필드가 == 값인 친구를 삭제
-- SELECT * FROM [테이블 이름]: 테이블 전체 값을 조회
-- INSERT INTO [테이블 이름] (필드 1, 필드 2) VALUES(필드 1의 값, 필드 2의 값): 테이블에 값 추가. 필드 1에 값 1을 넣고, 필드 2에 값 2를 넣고...
-- UPDATE [테이블 이름] SET [필드명] = "수정할 값" [필드명 2] = "수정할 값2" WHERE 필드 = "값" : 테이블 명에서 필드명을 새로운 값으로 바꾸고 필드명 2를 새로운 값2으로 바꾼다.
-- SELECT * FROM [테이블명] WHERE [필드명] LIKE "%AB" : 필드에 해당되는 내용 중 AB로 시작하는 데이터 조회
-- SELECT * FORM [테이블명] WHERE [필드명] LIKE "AB%" : 필드에 해당된는 내용 중 ~AB로 끝나는 데이터 조회
-- ALTER TABLE [기존 테이블명] RENAME [새로운 테이블 이름]: 테이블 이름 바꾸기
ALTER TABLE user RENAME user2;
-- ALTER TABLE [테이블 이름] CHANGE [기존 컬럼 이름] [새로운 컬럼 이름] type: 컬럼의 이름 바꾸기
ALTER TABLE user2 CHANGE user_name newcal VARCHAR(20);
-- ALTER TABLE [테이블 이름] MODIFY [컬럼이름] TYPE: 컬럼의 타입을 변경
AFTER TABLE user2 MODIFY newcal CHAR(20);   --안에 데이터가 있으면 안바뀜... 형식이 같던지..
-- DELETE FROM [테이블 이름] WHERE [필드 값] = "값": 조건에 맞는 모든 값 삭제
SELECT * FROM `user2`;
DELETE FROM user2 WHERE gender = "m";
-- ALTER TABLE [테이블 이름] DROP [필드이름]: 해당 필드를 테이블에서 제거한다.
-- ALTER TABLE [테이블 이름] AUTO_INCREMENT = 0, 1: 해당 테이블의 AUTO_INCREMENT를 초기화 시켜준다.
-- ALTER TABLE [테이블 이름] ADD [필드이름] TYPE: 해당 테이블 맨 뒤로 필드를 추가한다.
-- ALTER TABLE [테이블 이름] ADD [필드이름] TYPE first: 해당 테이블 맨 앞으로 필드를 추가한다.
-- SELECT * FROM [테이블 이름] ORDER BY [필드 이름] DESC | ASC : ORDER BY 필드명 기준으로 DESC (내림차순), ASC(오름차순)으로 정렬


SHOW TABLES;

DESC user2;


-- SELECT id, likes FROM boarder;
SELECT id, likes FROM boarder WHERE id = 1;


CREATE Table user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(20)
);

CREATE Table post(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title  VARCHAR(20)
);

-- post 테이블에 userID 키 추가 타입은 int
ALTER TABLE post ADD COLUMN userID INT;

-- CONSTRAINT: 제약 조건 명령어. 오류가 나면 확인하기 위해서 추가한다. 임의로 지정할 수 있다.
-- FOREIGN KEY: 참조키를 지정한다. userID
-- REFERENCES: 참조키가 참조하는 테이블의 열을 지정한다.
-- 참조할 테이블을 지정한다. user의 id로
ALTER TABLE post ADD CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user (id);

INSERT INTO user (name) VALUES ("dd");

INSERT INTO post (title,userID) VALUES ("123",4);

-- INNER JOIN 테이블을 조회하는데 참조키를 가지고 관계가 맺어져있는 테이블 조회
SELECT * FROM user INNER JOIN post ON user.id = post.userID WHERE user.id = 1;

-- 원하는 컬럼의 값을 가져올 수 있다.
SELECT user.id, post.title FROM user INNER JOIN post ON user.id = post.userID WHERE user.id = 1;

SELECT * FROM post;

-- 과제입니다.

-- 오늘 잠시 간단하게 만들어볼 것.
-- 게시판 만들었는데 user가 글을 등록하고
-- 해당 유저가 작성한 글을 볼 수 있는 페이지







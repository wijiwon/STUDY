# 20230307

<!--md 문서 작성-->
<!--#: 제목 작성-->

## 230307
### 230307
#### 230307
##### 230307

<!--h1~6 태그와 비슷한 형태-->


<!--'-'으로 리스트 형태 작성-->
# git 프로젝트
- git?
1. 형상 관리 도구 중 하나
    형상관리 도구: 버전 관리 시스템
    작업하면서 작업의 리스트를 관리할 수 있다.

- git의 장점
1. 협업하는 단계에서 소스 코드 파일로 주고 받을 필요가 없이 같은 파일을 팀원과 병렬로 작업이 가능하다.
2. 협업과정 중 수정사항을 눈으로 보고 찾는 것 보다 효율이 좋고 작업이 편하다.
3. 코드의 다른 부분을 바로 찾을 수 있다.


- git 설치

- git 사용자 설정
1. 윈도우 하단에 'git bash'검색 or 비주얼 코드에서 ctrl+'~' 후 
    우측 상단 '+' 옆 화살표 클릭하여 'git bash'클릭
2. git config --global user.name "본인 깃 네임"
3. git config --global user.email "본인 깃 이메일"
4. 설정 정보 조회: git config --global --list

- git 저장소 초기화 (저장소를 생성하는 명령어)
1. 해당 프로젝트의 경로에서 git init을 작성

- 경로 지정
1. cd ..: 한 폴더 위로 이동
2. ls -a: 경로의 파일을 전부 노출
3. cd 폴더명: 해당 폴더로 경로 이동
4. cd 앞부분 폴더명: 일부 폴더명이 기억나지 않을 경우 기억나는 만큼의 폴더명 앞 부분을 쓰고 teb을 누르면 비슷한 폴더명 확인 가능


-  git graph 설치
git 저장소 초기화 저장소를 생성하는 명령어
해당 프로젝트 경로에서 
저장소와 파일의 내용이 다를 때 컬러로 표현 해준다.

- 스테이징 저장소에 올릴 파일들, 업로드 전 업로드할 파일들 정리
- git add 해당 파일 이름 / git add . : 모든 파일 스테이징

- 커밋 메시지 작성
1. git commit -m "메시지 내용" 
2. 파일들을 업로드 할 준비 완료
3. git remote add origin "연결할 원격 저장소 주소"
4. 원격 저장소에 업로드 : git push 
5. git push -u origin master

- 깃을 관리하면서 자리 이동을 했을 때 커밋을 올렸는데 사용자명이 다를 경우, 제어판 > 사용자 계정 > 지격증명관리자 > windows자격증명 관리자 > github.com 탭을 열어 '제거' > 다시 사용자 등록 진행

- pull push 먼저 작업물을 병합하고 작업물을 올리자.
    협업을 할 때는 git push부터 날리면 안되고 pull, push 작성

- 협업을 할 때는 git push 부터 날리면 안되고 a와 b가 있으면 a가 먼저 push를 하고 b가 계속 작업을 하다가 a의 작업물을 병합하지 않고 push를 하게 되면 a의 작업물이 다 날아간다.

- .git 파일을 잘못 만들었을 때 'rm -rf: 폴더 명' 폴더 삭제가 가능하다. ex. rm -rf: 폴더 명

- git의 경로를 추가로 연결하고 싶다면 git remote add origin 경로

- 새로운 환경에서 git 저장소 연결할 때 적용방법
1. git init
2. git git remote add origin 저장소의 주소
3. 저장소의 주소는 해당 깃허브의 저장소에 접속해서 code(초록버튼)을 누르면 볼 수 있다..

4. git pull origin master : 원격 저장소에서 파일을 받아온다.

- 오늘 과제는 지금까지한 과제들이랑 수업자료들을 저장소를 만들어서 업로드하기


# github 새로 작성방법
- 깃허브 홈페이지
1. 우측 상단 프로필 클릭 > your 저장소 > new (초록버튼)
2. 저장소 이름, 설명, 공공의 선택 > 저장소 생성(초록버튼)

- 비쥬얼 코드
1. 깃허브와 연결할 폴더 열기
2. ctrl + '~' 터미널 열기
3. 우측 상단 '+'옆 화살표를 눌러 'git bash' 클릭
4. 'ls -a'를 입력하여 해당 폴더 안에 '.gut' 폴더가 있는지 확인 (git 폴더가 중복되어 있으면 안된다.)
5. 'git init'을 입력하여 '.git'폴더 생성
6. 'git add "해당 파일 이름"(개별 파일 스테이징)' 또는 'git add .(모든 파일 스테이징)'을 입력하여 파일 스테이징 시킴
7. 'git commit -m "커밋 이름"'을 입력하여 연결할 커밋 생성
8. 'git remote add origin "깃허브주소"'를 입력하여 깃허브와 커밋 연결
9. 'git push -u origin master'를 입력하여 깃허브에 파일 등록

# 기존 github 저장소에 있는 파일 수정 등록 방법
1. 'git pull origin master'를 입력하여 기존 프로젝트의 작업물 불러오기 (동기화 작업)
2. 수정 작성
3. 'git add .'입력하여 해당 폴더의 파일 스테이징
4. 'git commit -m "커밋 이름"'을 입력하여 연결할 커밋 생성
5. 'git push -u origin master'를 입력하여 깃허브에 파일 등록

# github 프로젝트 협업자 연결, 작성방법
- 깃허브 홈페이지
1. 공유 할 경우
    1. 깃허브에 새로운 프로젝트 생성
    2. 프로젝트 상단 탭에 'Settings' > 'Collaborator' > 'Add people' > 추가할 협업자의 email 주소 입력 후 선택하여 진행
2. 공유 받을 경우
    1. 초대 알림이 뜨면 초대 수락
    2. 홈페이지 좌측 상단의 로고 클릭 시 연동된 프로젝트 확인
    3. 'code'버튼(초록) 클릭하여 프로젝트 주소 복사

- 비쥬얼 코드
1. 새로운 폴더 생성
2. 'git into'로 폴더에 '.git'폴더 생성
3. 'git remote add origin "깃허브주소"'를 입력하여 프로젝트 깃허브 연결
4. 'git pull origin master'를 입력하여 기존 프로젝트의 작업물 불러오기 (동기화 작업)
5. 'git add .'입력하여 해당 폴더의 파일 스테이징
6. 'git commit -m "커밋 이름"'을 입력하여 연결할 커밋 생성
7. 'git push -u origin master'를 입력하여 깃허브에 파일 등록

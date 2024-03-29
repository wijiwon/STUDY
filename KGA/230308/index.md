# git 다시 해보기
## 새 저장소 만들기
- git init

## 파일 전부 스테이징
- git add .

## 커밋 메시지 작성
- git commit -m "작업 내용"

## github 원격저장소 연결
- git remote add origin "github 원격 저장소 url"
- git push origin master

# 브랜치

## 브랜치란?
- 독립적으로 어떤 작업을 진행하기 위한 개념
- 필요에 의해 만들어지는 각각의 브랜치는 다른 브랜치의 영향을 받지 않기 때문에 여러 작업을 동시에 진행할 수 있다.

## 브런치 영역을 나눠보자
- 브랜치는 저장소의 작업 공간이다.
- master: 기본적으로 만들어지는 브랜치
    - 추가로 만들어진 다른 브랜치들의 작업을 모두 마친 후 master 브랜치에 merge를 시켜 작업한 내용을 모은다.
    - ex 1. master(v0.1) -> dev -> dev -> dev -> master 병합(v0.2)
    - ex 2. master - > dev1, dev2 - > dev1, dev2 -> dev1, dev2 -> dev1 + dev2 - > dev1 + master

## 브런치 목록 확인
- git branch : 로컬 저장소의 브런치 목록 확인
- git branch -a : 원격저장소와 로컬저장소 브런치 목록 확인
- 선택되어 있는 브런치는 *(글자가 초록색)

## 브런치 생성
- git branch "생성할 브런치의 이름"

## 브런치 이동
- git checkout "이동할 브런치의 이름" : 있는 브런치로 이동

## 저장소 병합
- 병합하기 전 master 브랜치로 이동
- git merge "병합할 브런치 이름"
## ! merge 병합중 충돌이 난 파일을 보여주고 선택할수 있게 해준다. !

# 브런치 삭제
- git branch -d "삭제할 브런치 이름"

# 깃 파일 브런치 나누기
* 파일을 만들기 전이나 저장한 후에 브런치를 생성해야 나중에 나누고 병합할 때 오류가 나지 않는다. 
1. 새 폴더
2. git init
3. git add .
4. git commit -m " "
5. 필요한 만큼의 git 브런치 생성
6. 각 브런치에 파일 생성 / 필요한 작업진행
7. 각 브런치 push로 원격 저장소에 등록

# 깃 브런치 병합
* 이름이 같은 파일은 내용이 합쳐진다.
1. 병합전에 마스터 파일로 이동
2. git merge 로 파일 병합
3. 수정 사항 각 파일마다 확인
4. git add .
5. git commit -m " "
6. git push origin master
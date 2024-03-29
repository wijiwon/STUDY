const mysql = require("./config")
// 긓의 내용 작성
// 수정, 추가, 삭제
// 게시판의 기능들이 작성될 공간
const posts = {
    // 테이블을 초기화 해주는 함수
    initTable : async function(){
        try {
            // 배열의 스프레드 연산자. 0 1 2 3 4 이런 식으로 순서대로 담긴다.
            const[result] = await mysql.query("SELECT * FROM posts");
            console.log(result)
        } catch (error) {
            // console.log(error)
            await mysql.query("CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20), content VARCHAR(100))")
        }

    },
    // 글의 리스트를 조회하는 함수
    viewPostAll : async function(){
        try {
            const [result] = await mysql.query('SELECT * FROM posts');
            // posts 테이블의 데이터 전부 조회
            return result;
        } catch (error) {
            console.log("글 전체 조회 에러남");
        }
    },
    // async awaite를 사용하던지, then을 사용하던지 둘 중 하나만 사용. 같이 쓰면 절대 안된다.
    // 글을 선택했을 때 글 하나를 보여줄 함수
    selectPost : async function(id){
        try {
            const [result] = await mysql.query("SELECT * FROM posts WHERE id = ?", [id]);
            console.log("선택한 게시글 : ",result[0]);
            return result[0];
        } catch (error) {
            console.log("글 선택 조회 에러남")
        }
    },
    // 글을 추가 해주는 메서드
    insert : async function(title, content){
        try {
            await mysql.query("INSERT INTO posts (title, content) VALUES (?,?)",[title, content]);
            console.log("글 추가 완료~");
        } catch (error) {
            console.log("글 추가 에러남!");
        }
    },
    // 글 수정하는 메서드 
    update : async function(id, title, content){
        try {
            await mysql.query("UPDATE posts SET title = ?, content = ? WHERE id = ?",[title, content, id]);
            console.log("게시글 수정 완료!")
        } catch (error) {
            console.log(error);
        }
    },
    // 글을 삭제하는 메소드
    delete : async function(id){
        try {
            await mysql.query("DELETE FROM posts WHERE id=?; SET @CNT = 0; UPDATE posts SET posts.id = @CNT:=@CNT+1; ALTER TABLE posts AUTO_INCREMENT = 0;",[id]);
            console.log("게시글 삭제 완료");
        } catch (error) {
            console.log("게시글 삭제 에러남!")
        }
    }
}
posts.initTable();

posts.selectPost(1);    //결과: 선택한 게시글 :  { id: 1, title: 'qweqwe', content: 'qweqwe' }
posts.selectPost(4);    //결과: 선택한 게시글 :  undefined

// posts.insert("추가함","컨텐츠");

// posts.update(1,"수정됨","컨텐츠2");

// posts.delete(3);

module.exports = posts;
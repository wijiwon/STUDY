// 경로를 폴더 까지만 지정을 하면 index.js를 기본적으로 찾는다.
// 경로의 파일이 아니고, 폴더 경로까지만 작성을 하면 기본 설정이 'index.js'를 찾는다.
const { posts } = require("../models");

// 전체 글 조회 메소드
exports.ViewPostAll = async function(q,s){
    try {
        const data = await posts.viewPostAll();
        return data;
    } catch (error) {
        console.log("전체 글 조회. 컨트롤러에서 에러남!");
    }
}
// 글 하나 조회 메서드
exports.SelectPost = async function(q,s){
    // q <- 요청 객체를 메개변수로 전달해 줄 예정
    const { id } = q.params;
    try {
        const data = await posts.selectPost(id);
        return data;
    } catch (error) {
        console.log("글 한개 조회. 컨트롤러 에러남!");
    }
}

// 게시글 등록 메소드
exports.Insert = async function(q,s){
    // 요청 객체를 매개변수로 전달해줄 예정
    const{ title, content } = q.body
    try {
        await posts.insert(title, content);
    } catch (error) {
        console.log("글 추가. 컨트롤러 에러남!")
    }
}

// 게시글 수정 메소드
exports.Update = async function(q,s){
    const { id } = q.params;                // url의 (~/posts/edit/?)에서 ?에 담겨있는 값이 id키의 값으로 대입.
    console.log(q.params);
    const { title, content } = q.body;      // 브라우저에서 수정한 인풋 벨류 값
    try {
        await posts.update(id, title, content);
    } catch (error) {
        console.log("글 수정. 컨트롤러 에러남!");
    }
}

// 게시글 삭제 메소드
exports.Delete = async function(q,s){
    const { id } = q.params;
    try {
        await posts.delete(id);
    } catch (error) {
        console.log("글 삭제. 컨트롤러 에러남!");
    }
}
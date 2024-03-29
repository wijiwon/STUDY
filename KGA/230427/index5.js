// 우리가 window를 생략해서 작성하던 것과 같이
// window.console.log()
// console.log()  윈도우 생략 가능했었다.
// global과  module을 생략해서 작성할 수 있다.

console.log(module.exports === exports);
//결과: true        생략해도 된다.

exports.obj = {a : 1};
exports.add = () => {
    return 2;
}
function add2(){
    console.log("나는 함수임")
}

exports.asd = add2;
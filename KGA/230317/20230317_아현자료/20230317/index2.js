// let a = document.querySelector(".aaa");
// console.log(a);
// null 출력 (스크립트 태그가 body보다 앞??에 있어서)

// 문서를 그릴 준비가 다 끝나고 실행되는 함수
// 이렇게 하면 고장이 안난다.
window.onload = function () {
  let a = document.querySelector(".aaa");
  console.log(a);
  // div.aaa 출력

  // 여기서 작업을 다 하거나 분리하거나
};

console.log(a); // err

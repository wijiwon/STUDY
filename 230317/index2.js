


/* let a = document.querySelector(".aaa");
   console.log(a); */

//문서를 그릴 준비가 다 끝나고 실행되는 함수 (예. html에서 스크립트를 바디 위에 작성해야하는 경우 등)
//이렇게 하면 고장이 안난다.
window.onload = function(){
    let a = document.querySelector(".aaa");
    console.log(a);
    
}

// console.log(a);     // 실행 x 변수 a는 전역변수 이기 때문이다.
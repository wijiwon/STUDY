// 팝업 여는 함수
function openPopup() {
  let popup = document.querySelector(".popup-wrap");
  // 디버깅 습관
  console.log(popup);

  console.log(popup.classList);
  console.log(popup.className);
  // popup.classList
  // popup.className

  // popup.className을 사용하면 문자열을 그대로 대입해주면 되고
  // popup.classList를 사용하면 메소드를 사용하면 된다.
  // 메소드

  // popup.className
  // 클래스 구분을 줘야 하기 때문에 'is-active' 앞에 한 칸 띄워줌
  //   popup.className = popup.className + " is-active";

  // popup.classList
  //   popup.classList.add("is-active");
  // 메소드가 편함

  // 조건문으로 해보자 클래스가 있는지 확인하고 있으면 붙이지 말고
  // 없으면 붙이자
  //popup.classList.contains("is-active") : is-active있는지 확인

  //   // 문자열 버전
  //   let stringArr = popup.className.split(" ");
  //   console.log(stringArr);
  //   if (stringArr.indexOf("is-active") != -1) {
  //     //   class 있으면
  //     //   문자열 제거해서 클래스를 지울수도 있고
  //   } else {
  //     // class 없으면
  //     popup.className = popup.className + " is-active";
  //   }

  // 메소드 사용해서 조건 추가
  if (popup.classList.contains("is-active")) {
    // is-active 있으면 제거
    //   remove 클래스 제거 메소드
    popup.classList.remove("is-active");
  } else {
    // is-active 없으면 추가
    //   add 클래스 추가 메소드
    popup.classList.add("is-active");
  }
}

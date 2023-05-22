// 오늘은 생성 함수
// 객체를 함수로 만들때 많이 사용
// 뭔가를 생성한다..
// 객체를 생성할 때 사용하는 함수
// 모양

// createObj 생성자 함수
function createObj(_name, _atk, _def, _speed) {
  this.name = _name;
  this.atk = _atk;
  this.def = _def;
  this.speed = _speed;
}

// 이런 모양으로 생성자 함수를 만들고
// 이 함수를 가지고 객체를 생성하는 방법
// new 키워드
// (동적 할당) 메모리 공간을 동적으로 사용할 수 있게 해줌(할당해줌)
// 새로운 객체를 생성하기 위한 메모리 공간을
// new 키워드를 사용하면 빈 객체를 만들어주고 생성자 함수를 실행시켜서
// this는 객체를 참조함. this가 빈 객체를 참조(new로 만든 빈 객체)
// 키값들을 추가해주고 객체를 만들어줌
// 객체는 옆에 있는 친구나 본인
// 하나의 객체를 사람이라고 표현했을 때
// 사람에 대한 정보를 객체로 만들어놓고 사람을 생성
// 물건을 생성할 때도 객체에 그 물건의 정보를 키와 값으로 만들어서
// 하나의 오브젝트화 시킨다.
// let temp = {
//   name: "이름",
//   age: 24,
// };

let obj = new createObj("고블린", 100, 100, 10);
console.log(obj);
let obj2 = new createObj("트롤", 200, 100, 10);
console.log(obj2);

// 전역 변수만으로 프로그램을 관리하기에는 너무 힘들기 때문에
// 오브젝트화 객체화 시킨다.
// 개발자는 객체를 잘 다뤄야 한다.
let obj1_name = "rhqmffls";
let obj2_name = "rhqmffls2";

// 첫번째 객체의 이름
// obj.name

// 객체의 값에 접근하는 방법
// obj["name"]
// obj.name
console.log(obj.name);
console.log(obj["name"]);

let arr = [1, 2, 3, 4];
arr.forEach((i) => {
  console.log(i);
});

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// for in
// 자동완성 했을 때 object라고 적혀있는 변수에 우리가 보고 싶은
// 객체를 넣어준다.
for (const key in obj) {
  // 키값이 순서대로 나온다.
  // 키값이 key 변수에 순서대로 담긴다.
  console.log(key);

  // 이렇게 쓰면 안됨
  // 이건 객체 안에 있는 key 키값을 찾는 식
  // console.log(obj.key);

  // 이렇게 작성해야 함
  console.log(obj[key]);
}

// 페이지에 자바스크립트 이용해서 동적인 기능을 넣어보자

// BOM 브라우저 객체
// 브라우저의 기능들을 객체로 사용할 수 있게 해준것
// alert("ㅇㄹㅇㄹ");
console.log(this);

// onload 메소드는 브라우저의 랜딩이 끝나고 보여줄 준비가 되었을때
// 실행되는 함수(문서 랜더링을 끝내고 실행되는 함수) (html 다 그리면 실행..?)
// window onload라는 키값에 함수값을 전달

window.onload = function () {
  console.log("나 다 그렸어 보여줄 준비 끝");
};

// DOM(문서 객체 모델) : 문서를 객체의 모양으로 만든 것
// 문서의 접근을 가능하게 해준다.

// DOM은 페이지에 있는 태그들을 객체로 표현한 것
// document 객체에서 태그를 선택하는 방법
// 객체를 이용해서 찾고 싶은 태그를 자바스크립트로 가져와서
// 사용할 수 있다
console.log(document);

// 태그 선택자들

// ID----------------------------------------------------------
// getElementById 메소드로 태그의 아이디를 찾아서 태그를 가져올 수 있다.
let div2 = document.getElementById("div1");

// 아이디값 이 있는 태그는 그냥 변수처럼 사용해도 된다(html id=div1로 설정한 태그)
// 아이디 중복되지 않게 작성
let div3 = div1; // html에서 id=div1인 태그

// querySelector 만능
// 이것만 사용해도 된다.
// #을 붙여서 아이디라고 알려주고 div1을 찾아줘
let div4 = document.querySelector("#div1");

console.log(div2);
console.log(div3);
// ---------------------------------------------------

// class-----------------------------------------------
// 이거 안됨. 클래스는 중복될 수 있게 만들었기 때문 (아이디는 가능함)
// console.log(class_div2); // html에서 class_div2 클래스를 준 태그를 선택하려고 함
let div5 = document.querySelector(".class_div2");

// 문서를 읽다가 첫번째로 발견된 태그를 하나만 가져온다.
// querySelector (클래스가 class_div2인 태그 여러갠데 첫번째 태그 가져옴)

console.log(div5); // html에서 class=class_div2 태그 출력

// querySelectorAll 해당하는 전체 태그들을 가져온다.
// 배열의 형태로 가져옴
let divArr = document.querySelectorAll(".class_div2");
console.log(divArr);
// ---------------------------------------------------

// 태그 이름 선택자---------------------------------------------------
// querySelector 변수의 내용은 CSS 선택자를 문자열로 넣어주면 됨
let div6 = document.querySelector("div");

console.log(div6);

// let div6 = document.querySelectorAll("div");

// 이제 웹페이지를 만들 수 있는 능력이 생김

// 텍스트를 태그에 넣어주고 싶음
// div1

// div1.innerHTML = "<div></div>";
div1.innerHTML = "<ul><li>나 태그임</li></ul>";
// div1 태그의 내용을 추가할 수 있다. <div>이 공간에 내용이 추가됨</div>

console.log(div1.innerHTML);

let div7 = document.querySelector(".class_div2");
div7.innerHTML = "나 class_div2 태그 중 첫번째야";

let div8 = document.querySelectorAll(".class_div2");
div8[3].innerHTML = "난 class_div2를 가진 4번째 태그야";

// -----------------------------------------------------
// 버튼에 기능을 넣어보자

// 버튼을 누르면 함수를 실행시켜보자
function btnFn() {
  // class_div2 클래스를 가지고 있는 태그들을 class_div 변수에 배열로 담고
  let class_div = document.querySelectorAll(".class_div2");

  // 그 배열을 forEach로 순회하면서 아이템을 매개벼수로 받았다.
  class_div.forEach(function (i) {
    i.innerHTML = "이 문자로 통일 너 버튼 눌렀지";
  });
}

// html에서 함수를 가져가서 사용하자

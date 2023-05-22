// 생성자 함수를 만들고
let objArr = [];

function create(name, age, content) {
  this.name = name;
  this.age = age;
  this.content = content;
}

// 객체를 만들 수 있다

function divBtn() {
  // 버튼 누르면 실행시킬 기능
  console.log("나 눌렸어?");
  addArr();
  render(); // 화면을 업데이트 하기 위해 만든 함수
}

// 배열 추가
function addArr() {
  // input 태그명으로 querySelectorAll 메소드 매개변수로 전달해서
  // input 태그들을 배열로 가져와서 inputs 변수에 담아놓고
  let inputs = document.querySelectorAll("input");
  console.log(inputs);
  // input 태그는 value라는 키값이 있다.
  // input에 입력한 값이 value 키에 담긴다.
  console.log(inputs[0].value);
  console.log(inputs[1].value);
  console.log(inputs[2].value);

  // new 키워드로 빈 객체를 만들고
  // 함수에서 this로 그 객체를 참조해서
  // name 키에는 값을 매개변수로 "이름"
  // age 키에는 값을 매개변수로 10
  // content 키에는 값을 매개변수로 "컨텐츠"
  // 매개변수로 전달해서 키값을 추가해준다. 빈객체에
  // obj 변수에 그 만들어진 객체를 넣어준다.

  let obj = new create(inputs[0].value, inputs[1].value, inputs[2].value);
  objArr.push(obj);
  console.log(objArr);
  // 객체와 배열은 레퍼런스 타입이기 때문에 값이 아니라 주소를 들고 있다
  // 원시타입
  // 저렇게 보이는(여러번 누르고 처음에 버튼 눌렀을때의 콘솔을 봤을때 여러개의 배열이 출력되는) 현상. 일반 변수는 값을 가리키는 주소

  // ----공부해야함-----
  // 주소를 들고 있는 개념
  // 주소를 console에 찍기 때문에
  // 마지막으로 변한 값을 확인할 수 있는 것
  // 값을 가리키는 친구 주소
  // 변수명
}

// 무언가를 그려주는 함수 작성
function render() {
  // 랜더링 하기 전에 문자열 초기화
  let text = "";
  // += 원래 있는 값에 추가시켜준다. 덧붙인다
  objArr.forEach(function (i) {
    text += `<li>이름은 : ${i.name} 나이 : ${i.age} 내용 : ${i.content}</li>`;
  });
  console.log(text);

  // 여기서 사용하고 끝낼것 text 지역변수
  document.querySelector("#tables").innerHTML = text;
}

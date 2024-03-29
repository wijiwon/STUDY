// 스프레드 연산자

let obj = {name : 'jiwon', content : "내용"};
let obj2 = obj;

//객체는 주소를 참조하는 래퍼런스 타입이기 때문에 같은 키의 값이 바뀌게 된다.
obj2.name = "kim"

console.log(obj);
//결과: {name: 'kim', content: '내용'}
console.log(obj2);
//결과: {name: 'kim', content: '내용'}
console.log(obj == obj2);   //주소 참조까지 같다 true

// ... : 스프레드 연산자 구문
let obj3 = {...obj};
//값을 복사해서 새로운 객체를 만들어 준 것
obj3.name = "kim2"
console.log(obj3);
//결과: {name: 'kim2', content: '내용'}
console.log(obj == obj3);   //값만 복사해서 원본을 유지하고 새로운 객체를 만드므로 false

//스프레드 연산자를 사용하면 원본을 유지하고 작업을 진행할 수 있다.
//데이터베이스에서 값을 가져와서 검색기능을 만든다 가정하면
//모든 리스트를 가지고 있는 배열은 유지하되
//검색으로 걸러낸 배열만 사용하고 싶을 때

//리엑트에서 많이 사용할 예정
//옵션 체이닝
//ES11에서 도입되었고
//객체의 값을 호출할 때 안전성을 유지하면서 호출이 가능하다.
//객체의 키 앞에 ? 구문을 추가해서 작성

let obj4 = {name : "wi", content : "내용"};

//obj?.name
//name의 키 값이 있는지 확인. 없으면 undefined를 던집니다.
//오류가 나지 않게 방지해준다.

console.log(obj4?.name);
//결과: wi

//오류가 나지 않는 이유는 객체의 키값을 확인하고
//type에러가 나지 않게 방지해주기 때문이다.
console.log(obj4?.age);
//결과: undefined

let obj5 = {
    name : "wi",
    content : {
        age: 1
    }
}

console.log(obj5.content.key);
//결과: undefined  node환경에서 보여줄 예정
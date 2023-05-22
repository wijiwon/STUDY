let str = "가나다라마 바 사";

// 문자열 함수를 알아보자.
console.log(str.indexOf("다"));     //배열이 아니지만 문자열도 인덱스로 값의 접근이 가능하다.



// 문자열의 길이
console.log(str.length);



// 문자열 함수 slice: 문자열을 잘라주는 역할을 한다.
console.log(str.slice(1,6));     // 매개변수를 두 개 전달해야 한다. 'slice(시작지점 인덱스,끝지점 인덱스)'



// 문자열 함수 split
console.log(str.split(""));         // 구분을 정해주지 않으면 모든 문자열을 한자 한자 잘라서 배열의 형태로 변경해준다.
console.log(str.split("다"));       //매개변수로 전달한 값을 잘라내고 배열의 형태로 변경해준다.
console.log(str.split(" "));        // 공백을 넣으면 공백이 지워지고 모든 문자열이 합쳐져 하나의 배열이 만들어진다.



//문자열 함수 중 대소문자 변경 함수
let str2 = "abcdefg";
let str3 = "QWERTYU";

//toUpperCase: 대문자로 변경하는 함수
console.log(str2.toUpperCase());

//toLowerCase: 소문자로 변경하는 함수
console.log(str3.toLowerCase());



//
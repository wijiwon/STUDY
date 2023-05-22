//정규 표현식(RegExp) 객체
//문자의 패턴을 검색하기 위해 사용하는 문자.

//예) 회원가입 email id 주소 같은 형식으로 입력하기 위해
//문자의 패턴을 정의하는데 유용하다.

//정규 표현식의 메소드
/* 
search(), replace(),
test(): 정규 표현식과 일치하는 문자가 있느면 true 반환 (bool값을 반환)
*/

//정규 표현식
let reg1 = /a/;     //정규 표현식 객체를 선언하는 방법 1
let reg2 = new RegExp('a');     //정규 표현식 객체를 선언하는 방법 2

//위처럼 이렇게 정규표현식을 만드는 이유는 규칙을 가진 문자열을 찾기 위해서

let tmepReg = /[3,6,9]/;
// [ ] 내부 중의 한개 -> 3 or 6 or 9 중의 한 개를 뜻한다.

let tempReg1 = /[0-9]/;
//0-9 이렇게 작성하면
//0부터 9까지의 숫자라는 뜻이다.

let str = "Hello Javascript Program...";
//search 해당 문자열의 위치를 찾는 메소드
//인덱스로
let regExp_search = str.search(/Javascript/);
console.log(regExp_search);
//결과: 6 (Javascript)의 시작 인덱스를 찾아준다.

let RegExp_replace = str.replace(/Javascript/, 'CSS');
console.log(RegExp_replace);
//결과: Hello CSS Program...
//replace 첫 번째 매개변수로 전달한 문자열을 찾아서
//두 번째 매개변술 전달한 문자열로 바꿔준다.

//test
//정규식 패턴에 대한 문자열 검색 반환값은 true false로 반환한다.
let reg3 = /Javascript/;
console.log(reg3.test(str));
//결과: true    (문자열이 있으면 true)

let reg4 = /Javascript2/;
console.log(reg4.test(str));
//결과: false   (문자열이 없으면 false)



//정규식 표현할때 플래그
//검색에 대한 옵션 설정

// i : 대소문자를 구분하지 않고 비교할 수 있다.
// g : 전체 문자열을 정규식과 비교한다. 첫 번째로 일치한 문자열이 있으면 비교를 중지한다.
// m : 줄이 다른 여러 줄의 문자열을 정규 표현식으로 비교한다.

let str2 = 'The best program is \n JavaScript...';

//플래그는 정규식 뒤에 붙인다.
let tmep1 = /javascript/i;
//match: 해당 문자열을 찾고 배열의 형태로 반환해준다.
console.log(str2.match(tmep1));
/*결과
['JavaScript', index: 22, input: 'The best program is \n JavaScript...', groups: undefined]
0: "JavaScript"
groups: undefined
index: 22
input: "The best program is \n JavaScript..."
length: 1
[[Prototype]]
: 
Array(0) 
*/

let temp2 = /Javascript/g;
console.log(str2.match(temp2));
//결과: null (문자열을 찾지 못하면 (Java'S'cript 가 맞음))
let temp3 = /JavaScript/g;
console.log(str2.match(temp3));
/*결과
['JavaScript']
0: "JavaScript"
length: 1
*/

//줄이 다른 문자열을 비교한다.
let temp4 = /JavaScript/m;
console.log(str2.match(temp4));
/*결과
['JavaScript', index: 22, input: 'The best program is \n JavaScript...', groups: undefined]
0: "JavaScript"
groups: undefined
index: 22
input: "The best program is \n JavaScript..."
length: 1
*/



//정규식의 패턴
//[abc]: 대괄호 안에 있는 문자들을 찾늗나.
//[0-9]: 대괄호 사이의 숫자를 찾는다.
//[x|y]: 문자 중에서 ' | '로 분리된 문자중 하나를 찾는다.

let str3 = "The best program id Java123Script and 456HTML..."



//플래그를 여러개 주고싶으면 같이 작성하면 된다.
let tmep5 = /Java123Script/ig;
//플래그 ig를 썼기 때문에 대 소문자 구분없이 'JavaScript'만 가져왔다. 
console.log(str3.match(tmep5));
/*결과
['Java123Script']
0: "Java123Script"
length: 1
*/

let temp6 = /[A-K]/ig;
//문자열 안에 해당하는 알파벳을 다 찾아온다.
console.log(str3.match(temp6));
/*결과
(16) ['h', 'e', 'b', 'e', 'g', 'a', 'i', 'd', 'J', 'a', 'a', 'c', 'i', 'a', 'd', 'H']
0: "h"
1: "e"
2: "b"
3: "e"
4: "g"
5: "a"
6: "i"
7: "d"
8: "J"
9: "a"
10: "a"
11: "c"
12: "i"
13: "a"
14: "d"
15: "H"
length: 16
[[Prototype]]: Array(0)
*/

//분리된 문자열을 가져온다.
let temp7 = /p|x|z/ig;
console.log(str3.match(temp7));
/*결과
(2) ['p', 'p']
0: "p"
1: "p"
length: 2
*/ 

//정규식에서 메타문자
//메타문자는 숫자만 이거나 알파벳만 이거나 숫자를 제외하거나 이런 등등의 속성을
//표현한다.
/*
^문자 : 정규식으로 시작 문자를 찾는다.  ^뒤에 있는 문자로 시작하는 문자를 찾는다.
문자$ : 정규식으로 끝나는 문자를 찾는다. $앞에 문자로 끝나는 문자열을 찾는다.
\w(소문자) : 모든 문자를 찾는다. 속하는 모든 문자를 찾는다.
\W(대문자) : 알파벳 대소문자, 숫자, _(언더바) 를 제외한 모든 문자를 찾는다.
\d(소문자) : 숫자를 찾는다.
\D(대문자) : 숫자를 제외하고 찾는 것이다. (숫자를 제외한 모든 문자를 찾는다.)
\s(소문자) : 공백 문자를 찾는다.
\S(대문자) : 공백 문자를 제외하고 찾는다. 
*/

let temp8 = /^J/ig;
console.log(str3.match(temp8));
//결과: null (전체 문자열이 J로 시작하지 않기 때문이다.)

//문자열이 T로 시작하는지 확인을 하고 T가 맞으니까 맞는 문자열을 반환
let temp9 = /^T/ig;
console.log(str3.match(temp9));
/*결과
['T']
0: "T"
length: 1
*/

let temp10 = /\d/ig;
console.log(str3.match(temp10));
/*결과
(6) ['1', '2', '3', '4', '5', '6']
0: "1"
1: "2"
2: "3"
3: "4"
4: "5"
5: "6"
length: 6
*/

//정규식을 사용할 때 일단 더 저랑 같이 사용할 건데
//정규식을 검색해서 사용



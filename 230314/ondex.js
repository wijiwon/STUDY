// 함수

//함수는 실행할 코드들의 이름을 지어준다. (반복 사용하는 기능들을 묶어서 관리한다.)
//function 함수이름() { 실행시킬 코드들을 작성 }
function fun() {
    console.log("fun 함수 실행됨");     //fun이라는 함수를 선언함. 선언해놓은 함수를 사용하여야 한다.
    console.log("fun 함수 실행됨");    
    console.log("fun 함수 실행됨");    
    console.log("fun 함수 실행됨");    
}

//함수 실행
fun();      // 함수를 실행. ()를 붙여야 함수 실행식이 된다.
/*함수를 실행시키면 스택이라는 곳에 함수 실행이 쌓이고 순서대로 실행이 된다.
실행 컨택스트 들어가면*/

// 변수 <- 원시타입
// 객체, 배열, 함수 <- 래퍼런스 타입

//변수 선언 시 let var 를 안붙이고 사용하면 안된다.

/*변수는 스코프라는 개념이 있다. 스코프: 뱐수는 전역 스코프와 지역 스코프라는 것이 존재한다.
전역 스코프 : 전역(모든 곳)에서 접근이 가능한 범위이다.
                전역 스코프에 너무 많은 변수를 선언하면 관리하기가 힘들어진다.
                접근이 어렵다고 전역변수만 쓰는것이 아닌, 최소한으로 사용하도록 한다.
                예를 들어, 협업 시 A가 play변수를 만들었는데 B가 play라는 변수를 만들어 사용할 수도 있기 때문이다.
지역 스코프 :  특정 영역에서만 접근이 가능한 범위 */

let tmep = "나는 전역변수야";       //전역 스코프에 있는 변수. 따라서 con함수 안에서도 사용이 가능하다.
function con(){ 
    let temp = "나는 지역변수야";   //함수 con안에서 사용할 수 있는 지역변수. 함수의 실행이 끝나면 해제되어 없어진다.
}



let temp2 = "나 접근 되나요?";
function con2() {
    console.log(temp2);
}

con2();         //함수 실행



function con3() {
    let temp3 = "나 접근 되나요?";
}
console.log(temp3);     // temp3이 지역변수로 함수 안이라는 영역에서만 접근이 가능하기 때문에 함수con3의 temp3을 출력할 수 없다.

con3();         //함수 실행.

//호이스팅 : 변수가 선언되기도 전에 호출했을 때 발생되는 에러이다.


function temp4(){
    console.log(x);     // 변수를 var로 선언 시 결과 : undefined
    // 지역변수 선언
    let x = 5;          // 변수를 var로 선언 시 호이스팅이 일어나도 오류를 나타내지 않는다.
    //호이스팅이 발생하기 때문에 예상치 못한 문제가 일어날 수도 있다.
    //변수는 코드를 작성할 때 최상단에 작성한다.
}
temp4();



//함수에는 매개변수가 있다. 
function fun2(v) {
    //전달받은 매개변수를 사용
    console.log(v);
}
//전달받은 매개변수에 따라서 작업을 다르게 하고 싶을 때

function fun3(num){
    console.log(`전달받은 매개변수는 : ${num}`);
}

let a = 1;
let b = 2;

fun3(a);        // 매개변수 num에 전달할 값을 괄호에 입력 
fun3(b);
fun3(3);

/* cup 컵이라는 함수를 만들고 컵은 물, 음료수 등을 따를 수 있는 기능이 있다.
    cup이라는 함수를 만들고 매개변수로 drink 음료수를 따라줘보자 */

function cup(drink) {
    //drink라는 매개변수에 "홍차","포도주스","오렌지주스"라는 값이 들어온 것이다.
    console.log(`컵에 ${drink}를 따랐다.`);
    console.log(`${drink}를 이 컵에 따라서 마시니까 기분이 좋아.`);
}


let c = "오렌지 주스";

cup("홍차");
cup("포도주스");
cup(c);

//전달되는 매개변수에 따라 다른 결과물을 보여줄 수 있다.

//거스름돈 자판기라는 기능을 함수로 만들어보자.
//자주 사용할 것 같은 기능들을 함수로 작성해놓고 재사용한다.

function vending(money, unit) {     //매개변수는 여러개 전달할 수 있다. 구분은 ,로 한다.
    //거스름돈 자판기
    console.log(unit + "원 짜리" + money / unit + "개");

}

vending(1000, 500);     //1000원을 넣고 500원을 거슬러줘
vending(1000, 100);     //1000원을 넣고 100원을 거슬러줘

let e = vending;
console.log(e);         //함수도 값이기 때문에 변수에 함수를 넣을 수 있다.
// 변수e에 함수vending의 값이 들어있기 때문에 변수를 함수 실행식처럼 사용이 가능하다.
e(1000, 100);

let f = vending();      //()는 함수의 실행식이다. 함수를 실행시키는 것이므로 변수에 함수가 담기지 않는다.
console.log(f);         //결과는 undefined
// 변수에 함수를 대입할 때는 함수의 이름을 전달해야 한다.

// return: 함수를 사용할 때 함수안에서 필요한 값을 내보낼 수 있게도와주는 식

function ab(){
    return "나는 반환값이야.";   //함수가 실행하던 중 return식에 도달하면 return뒤에 작성한 값을 반환하면서 함수가 종료된다. 
    console.log("이건 안보일거야, 윗 줄에서 return시켜서 함수가 중지되고 return 값을 내보낼거야.");
}


let g = ab();
console.log(g);         // return 문이 있기 때문에 return 값 뒤에 작성한 값을 반환한 것이다. 따라서 특정 값을 내보낼 수 있다.

// 함수 심화

function sum(num1, num2){
    return num1 + num2;
}

console.log(sum(1,2));

function gg(num){
    for (let i = 0; i < 10; i++) {
        console.log(`${num}단 ${num} x ${i} = ${num * i}`)
    }
}

gg(2);
//코드의 재사용성을 높히자.

//성격유형 검사지 함수버전
function type(value){
    switch (value) {
        case 1:

            return "분노조절 잘해"
        case 2:
            
            return "과묵하지만 상냥해"
        case 3:
            
            return "조용하지만 술마시면 각오해"
    }
}

type(1);        // return으로 결과값이 반환이 되었지만 개발자모드에서는 노출되지 않는다.

console.log(type(1));


// 어제 과제 하던거 그대로 이어서 진행하는데
// 아직 이해 안되는 부분들 쭉 함수를 사용해서 리팩토링 진행
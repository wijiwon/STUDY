// 콜백 함수    : 함수의 매개변수로 함수를 실행시키는 것을 말한다.
// 함수도 값이다.
// 함수의 매개변수로 함수를 전달해서 내가 함수에 코드를 작성하다가 필요한 순간에 매개변수로 받은 함수를 실행시킨다.

function test(callback) {               // 함수를 매개변수로 전달받을 함수 test
    console.log("1번 작업 끝");
    console.log("2번 작업 끝");
    if(true){
        callback();                     // 값이 true일때 매개변수로 전달받은 함수인 test2를 실행한다.
    }
}

function test2() {                      // 매개변수로 전달될 함수 test2
    console.log("나는 콜백함수야!");
}

test(test2);                            //test함수의 실행식. 함수 test2를 매개변수로 받는다.





let arr = [1,2,3,4];
arr.map(function(i){        // map에는 매개변수를 2개 이상 전달할 수 있다.
    console.log(i);

})

arr.map(function(i,v){        // map(함수(값, 인덱스, 배열){})
    console.log(i);
    console.log(v);             // i의 인덱스를 표현

})




//배열 메소드 map을 흉내내보기
//우리가 만든 객체
let arr2 = {
    map : function(callback){                           // 밑의 함수로 매개변수를 받고 올라와서 실행된다.
        //함수의 매개변수 갯수
        //해당 함수의 매개변수가 몇개가 들어가는지 알 수 있다.
        //매개변수 안 받는 함수인데 매개변수를 전달하면 터진다.
        if(callback.length == 1)                        // 매개변수로 받은 값의 길이가 1개일 경우 실행
        {
            let a = 2;
            console.log("나는 map 매개변수는 한 개라고 알고있어." + a + "<- 결과야")
            callback(a);                                // 변수 a의 값을 가지고 객체 map을 실행시킨 함수로 돌아간다. 괄호앞에 이름은 함수의 매개변수 이름과 동일해야 한다.
        }
        else if(callback.length == 2){                  // 매개변수로 받은 값의 길이가 2개일 경우 실행
            let a= 2;
            let b = 3;
            console.log("나는 map함수야 내가 받은 콜백함수에는 매개변수 2개를 넣는다고 전달 받았어.");
            callback(a,b);                              // 변수 a,b의 값을 가지고 객체 map을 실행시킨 함수로 돌아간다.
        }
        else{                                           // 변수의 개수가 2개가 넘어가면 실행한다.
            console.log("너무 많아")
           
        }
    }

}
arr2.map(function(a){                                   // 객체 map의 함수의 매개변수로 a가 대입된다.
    console.log("나는 콜백함수야 전달받은 매개변수는 " + a + "이거야")  //객체 map의 함수에서 돌려받은 a의 값을 대입한다.
})

arr2.map(function(a,b){
    console.log("나는 콜백함수야 전달받은 매개변수는 " + a + "," + b + "이거야")    // 결과값 23. //객체 map의 함수에서 돌려받은 a의 값을 대입한다.
})

arr2.map(function(a,b){
    console.log("나는 콜백함수야 전달받은 매개변수는 ",a + b , "이거야")        // ,를 넣을 경우 타입을 보장해주므로 결과값 5
})

arr2.map(function(a,b,c){
    console.log("나는 콜백함수야 전달받은 매개변수는 ",a + b + c, "이거야")        //별도로 돌려받는 값이 없으므로 실행하지 않는다.
})





function temp(fruit){
    if(fruit.length === 0){         // 전달된 매개변수의 개수가 0개인 경우 실행. temp2
        fruit();                    // temp2로 돌아가서 실행한다.
    }
    else if(fruit.length === 1){    // 전달된 매개변수의 개수가 1개인 경우 실행. temp3
        let temp = "사과";
        fruit(temp)                 // 해당 함수의 변수 temp값을 함수 temp2의 매개변수로 대입시킨다.
    }
    else if(fruit.length === 2){    // 전달된 매개변수의 개수가 2개인 경우 실행. temp4
        let temp = "딸기";
        let temp2 = "바나나";
        fruit(temp, temp2);         // 해당 함수의 변수 temp, temp2의 값을 함수 temp4의 매개변수로 대입시킨다.
        
    }
    else{                           // 전달된 매개변수의 개수가 3개 이상일 경우 실행 temp5
        console.log("너 매개변수 초과야 난 두개만 받을 수 있어. 에러!");
    }
}

function temp2(){                           //함수 temp의 매개변수로 전달할 값이 없다.
        console.log("난 콜백함수야");
}
function temp3(v){                          //함수 temp의 매개변수로 v를 전달한다.
        console.log("난 콜백함수야", v + "를 받았어");
}
function temp4(v,b){                        //함수 temp의 매개변수로 v,b를 전달한다.
        console.log("난 콜백함수야", v + "를 받았어", b + "도 같이 받았어" );
}
function temp5(v,b,c){                      //함수 temp의 매개변수로 v,b,c를 전달한다.
        console.log("난 콜백함수야", v + "를 받았어", b + "도 같이 받았어", c );    
        // 함수 temp에서 매개변수 값을 대입받지 않았으므로 실행되지 않는다.
}

temp(temp2);
temp(temp3);
temp(temp4);
temp(temp5);


//콜백 함수 한 번씩 만들고 넘어가자
//function 함수명: 일반함수
//메소드: 객체 안에 있는 함수
//객체 안에다가 함수를 만들고 콜백함수를 만들면 된다.
//키값은 원하는데로 이름 지정해도 괜찮다
//매개변수 3개까지 받을 수 있는 함수를 만든다.

//연습
//구구단 기능을 보여주는 함수
//매개변수 1개 받으면 2단을 보여주고 2개받으면 2,3단 다 보여준다.
//3개 받으면 2, 3, 4단 다 보여주면 된다.


//실습_ callback 함수 만들기

function first(num) {
    if(num === 0){
        num();
    }   
    else if(num.length === 1){
        let a = "김";
        num(a);
    } 
    else if(num.length === 2){
        let a = "김";
        let b = "이";
        num(a,b);
    }
    else if(num.length === 3){
        let a = "김";
        let b = "이";
        let c = "박";
        num(a,b,c);
    }
    else{
        console.log("매개변수는 3개까지만 받을 수 있어. 개수 초과!")
    }
}


function call1(){
    console.log("콜백함수. 매개변수를 받지 못했어.");
}
function call2(a){
    console.log("콜백함수. 매개변수", a ,"를 하나를 받았어.");
}
function call3(a,b){
    console.log("콜백함수. 매개변수", a , b, "를 두 개 받았어.");
}
function call4(a,b,c){
    console.log("콜백함수. 매개변수", a , b, c, "를 세 개 받았어.");
}
function call5(a,b,c,d){
    console.log("콜백함수. 매개변수 초과!");
}

first(call1);
first(call2);
first(call3);
first(call4);
first(call5);


//구구단 함수

function ggd(num){
    if(num.length === 0){
        console.log("매개변수를 받지 못해 구구단을 띄울 수가 없어")
    }
    else if(num.length === 1){
        let a = 2;
        num(2);
    }
    else if(num.length === 2){

    }
    else if(num.length === 3){

    }
    else{
        console.log("매개변수 갯수초과!")
    }
}

//교수님


//객체 선언
let obj2 = {
    gugu : function(callback){                //객체 gugu안에 메소드 생성
        switch(callback.length) {           //매개변수 callback의 길이가 조건.
            case 1:                         // 콜백함수에서 전달받는 매개변수의 길이가 1개일 경우 실행
                callback(2);                // 콜백함수에 매개변수 값을 2로 전달하여 실행시킨다.
                break;
            case 2:                         // 콜백함수에서 전달받는 매개변수의 길이가 2개일 경우 실행
                callback(2);                // 콜백함수에 매개변수 값을 2로 전달하여 실행시킨다.
                callback(3);                // 콜백함수에 매개변수 값을 3으로 전달하여 실행시킨다.
                break;
            case 3:                         // 콜백함수에서 전달받는 매개변수의 길이가 3개일 경우 실행
                callback(2);                // 콜백함수에 매개변수 값을 2로 전달하여 실행시킨다.
                callback(3);                // 콜백함수에 매개변수 값을 3으로 전달하여 실행시킨다.
                callback(4);                // 콜백함수에 매개변수 값을 4로 전달하여 실행시킨다.
                break;
                
            default:                        //콜백함수에서 전달받는 매개변수의 길이가 4개이상일 경우 실행
                console.log("너 매개변수 갯수 확인해");
                break;
        }
    }           
}

// 어떻게 만들어도 상관은 없지만 기능 단위로 함수를 만드는 습관을 가지는게 좋다.
function temp6(a){                     //객체 gugu의 함수문 안의 switch에서 case 1 실행
    for (let i = 1; i < 10 ; i++){
        console.log(`${a} x ${i} = ${a * i}`);
    }
}
function temp7(a,b){                  //객체 gugu의 함수문 안의 switch에서 case 2 실행
    for (let i = 1; i < 10 ; i++){
        console.log(`${a} x ${i} = ${a * i}`);
    }
}
function temp8(a,b,c){                //객체 gugu의 함수문 안의 switch에서 case 3 실행
    for (let i = 1; i < 10 ; i++){
        console.log(`${a} x ${i} = ${a * i}`);
    }
}
function temp9(a,b,c,d){              //객체 gugu의 함수문 안의 switch에서 default 실행
    for (let i = 1; i < 10 ; i++){
        console.log(`${a} x ${i} = ${a * i}`);
    }
}


obj2.gugu(temp6);
obj2.gugu(temp7);
obj2.gugu(temp8);
obj2.gugu(temp9);

//콜백은 매우 중요한 부분


//함수가 실행되면 스택이라는 곳에 쌀인다고 하였는데
//스텍: 후입선출이다.
//큐: 선입선출이다.

//콜 스텍 개념을 알아보자
//스택은 데이터를 사용하기 위해서 잠시 저장 해놓는것이다.
//데이터들을 쌀아놓는다고 보면 된다.
//후입 선출로 마지막에 추가된 데이터부터 제거한다.
// 함수 실행 컨텍스트 함수를 실행하게 되면 스텍에 추가가되고 반환될 때 스택에서 제거된다.
//함수 실행 컨텍스트: 함수가 실행될 때 마다 생성된다. 함수의 실행 정보를 가지고있다.
//콜 스텍은 함수가 실행되면 실행 컨텍스트 저장하는 스택의 구조이다.
//콜스텍은 컴퓨터의 메모리크기나 운영체제 등에 따라 크기가 다르다. 콜 스텍이 쌓이게 되어 크기가 초과되면 "스텍 오버플로우"라는 에러가 발생(더 이상 실행할 수 없다.)
//예) 함수를 무한으로 실행할 때 나올 수 있다.


function fun1(){
    fun2();
}

function fun2(){
    fun3();
}

function fun3(){
    console.log("난 3번 마지막으로 실행한 함수야");
}

fun1();


//전역실행컨텍스트(자바스크립트 코드 전체를 실행) 가 실행되고
/*fun1 함수 실행 구문에서 fun1 함수의 실행 컨텍스트가 생성되고 
    -> fun2 함수 실행 컨텍스트가 생성된다. -> fun3의 실행 컨텍스트가 실행 */
/*이렇게 스택에 쌀이고 마지막에 추가된 fun3 함수의 실행 컨텍스트 제거한다. - > 
    fun2 함수의 실행 컨텍스트 제거 -> fun1함수의 실행 컨텍스트 제거 */






function dog(){                 // 두 번째 함수 실행
    console.log("dog");         // 첫 번째 console 값 노출
}

function cat(){                 // 세 번째 함수 실행
    console.log("cat");         // 세 번째 console 값 노출
}

function bird(){                 // 첫 번째 함수 실행
    dog();                       // 함수 dog 실행문 실행
    console.log("bird");         // 두 번째 console 값 노출
    cat();                       // 함수 cat 실행문 실행
}


bird();                          // 함수 bird 실행문 실행






// 콜스텍 확인해보자
    /* 브라우저 게발자모드(f12) > 디버깅모드 활성화(ctrl + f8) > 함수나 코드 줄의 옆에 왼쪽 코드줄 번호에 클릭
        브레이크 포인트가 찍히는데 포인터를 찍으면 코드가 실행되다가 그 포인트에 도달하면 잠시 실행을 멈춘다.>
        재생버튼을 누르면 다음 포인트가 있는 곳 까지 실행하다가 또 멈춘다.
        > 작업의 디버깅도 용이하다. >callback(호출스택)탭에서 확인가능 */


// 화살표 함수
// 알번 함수의 경우: function 함수명(){}
// 화살표함수 : ES6에서 새로나온 함수의 방식이다. ES6 템플릿 리터럴
// 우리가 사용하던 일반 함수의 모양과 다르게 생겼다.
// => 화살표 모양으로 함수를 선언한다.

//화살표 함수 선언방식
let temp10 = () => {
    console.log("나는 화살표 함수야");
    return console.log("나는 화살표 함수야");
}

// 화살표 함수 실행
temp10();

// 화살표 함수는 일반함수와 차이들이 있는데
// 함수에서 값을 반환할 때 return식을 사용해서 반환했는데
// return식 없이도 반환 시킬 수 있다.

//함수와 똑같이 매개변수는 괄호에 넣으면 된다.
let temp11 = () => {
    return 5;           // return 값이 없으면 값이 반환되지 않는다.

}
let temp12 = () => {
    return 5;           // return 값이 없으면 값이 반환되지 않는다.

}

// let temp8 = () => 3;             반환이 가능하다.
// let temp8 = () => 3 + 5;         반환이 가능하다.

let ab = temp11();
console.log(ab);


// 연결된 개념
// 제일 중요하고 큰 차이점. 면접에서 질문으로 나올 수도 있다.
// this라는 개념.
// this 키워드: 자바스크립트 객체를 참조하는 특별한 구문
// 일반 함수와 화살표 함수의 차이는 this의 차이이다.
//this가 가리키는 대상이 다르다.
//일반함수 this: 함수가 실행될 때 실행하는 위치(스코프)에서 this를 가져온다.(다이나믹 스코프)
//화살표함수 this: 화살표 함수 내부의 this는 화살표 함수를 선언한 위치에서 this를 가져온다.(렉시컬 스코프)
let d = () => {
    console.log(this);                  // 변수 d의 화살표함수 내에서 선언된 this는 전역범위를 가진다.
}
let obj = {
    a : function(){
        b();
        console.log(this);              // 변수 a의 this가 obj객체 안에 있는 메소드 a안에서 선언되므로 객체가 노출
        let c = () => {
            console.log(this);          // 변수 c의 화살표 함수가 obj객체안에 있는 메소드 a안에서 this가 선언되었기 때문에 객체로 노출
        }
        c();
        d();                            // 변수 d의 this가 전역공간에서 선언되었으므로 window가 객체로 노출된다.
    }
}

function b() {
    console.log(this);      // this가 객체를 가리키려면 객체 안에 있는 메소드안에서 this가 선언되어야 한다.
                            // 전역공간에 있는 해당 THIS는 WINDOWS 객체를 가리킨다.
}

obj.a();



//전역 공간에서 this를 쓰면 
//window 객체: BOM(브라우저 오브젝트 모델) 브라우저를 객체 모델로 표현한 것이다.
// BOM은 브라우저 기능들을 접근할 수 있는 객체

console.log(this);


//비동기: 다른 코드들과 함께 동기적으로 실행되지 않는다. 순차적으로 실행되지 않고 작업을 하는 도중에도 다른 작업이 가능하다.
        // node.js -> 예) 서버에서 값을 가져오는 동안 웹페이지가 멈춰있지 않고 다른 작엄들은 정상적으로 돌아간다.
        //서버에서 값을 가져오는 작업이 비동기. 페이지가 돌아가는게 동기
//동기: 순차적으로 실행된다. 작업이 끝나고 다음작업 진행. 끝나고 다음작업 진행

// 비동기함수:
//setTimeout : 매개변수를 2개 받는다. (함수, 시간값을 숫자타입으로 1000 == 1초)
setTimeout(function(){
    console.log("나는 1초 뒤에 실행 돼. 나는 비동기 함수에서 실행됐어.");   //동기적인 작업과 다르게 따로 작업이 들어간다.
}, 1000);

console.log("나는 동기임");


//let, var, const꼭 써야 한다고 했는데 쓰지 않을 경우 자동으로 window 객체가 된다.
//window객체


let a = "";
function temp6(){
    let g = "";
    c = "aa";       // 변수 타입을 선언하지 않으면 window객체의 키값으로 추가된다. 이러면 큰일나고 찾을 수가 없다.

}

temp6();

console.log(window.c);      // window의 키값이므로 변수 c의 값인 'aa'가 잘 확인된다.


console.log(c);             // window는 전역 객체이므로 노출에 문제는 없다.
console.log(g);             // 함수 temp6에 있는 지역변수 g는 전역범위에서 접근할 수 없다.



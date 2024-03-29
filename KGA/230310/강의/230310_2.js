//제일 많이 사용힐 구문
//개발자는 객체를 잘 사용하면 된다.

// if문(비교문)
if(false){
    //여기 있는 구문을 실행시키는 조건은
    //if () 괄호 안에 true냐 false냐에 따라서 실행을 시킨다.
        console.log()       // 글씨에 불이 꺼져 있으면 실행될 일 자체가 없다. 불이 켜져 있으면 실행될 가능성이 있다.
    //여기 내용을 실행시키고 싶을 때도 있고, 실행시키고 싶지 않을때도 있는데 
    //괄호에다가 연산자를 넣어주면 값을 비교하면서 실행시키거나 실행이 되지 않도록 할 수 있다.
}

let age = 1;
let age2 = 10;

//age = 나
if(age < age2) {
    console.log("내 나이가 작구나")     //괄호 안에 조건이 true이므로 조건이 실행된다. (false는 조건이 실행되지 않는다.)
}


//if ~ else문: false의 결과가 나와도 실행시키는 방법
if(age > age2) {
    console.log("내 나이가 작구나")     //if문의 조건이 true인 경우 실행
}
else{
    console.log("네 나이가 크구나")     //if문의 조건이 false인 경우 실행
}


let b = 5;
let c = 5;

//참과 거짓 말고 비교할 수 있는 다른방법

if(b < c){
    console.log("c가 b보다 크다")        //if문이 true면 실행
}
else if(b > c){
    console.log("c가 b보다 작다")        //if문이 틀리면 해당 조건에 비교하고 true일 경우 실행, else if는 여러 개를 쓸 수 있다.
}
else{
    console.log("c와 b가 같다")        //else if문이 false일 경우 실행
}

// 반복문 for문 : 반복문 중에 하나
//여러번 반복 실핼해야 활 구문이 있을 때 사용한다.

let e = 5;

// for(변수 선언; 값을 확인;for문 안에 있는 구문을 실행하고 나서 값을 증가 > 비교를 하고 true면 구문 다시 실행)

//선언 > 비교 ture > 실행 > 증가 > 비교 ture > 실행 > 증가 ..... 비교문이 false가 되면 for문 종료
//무한으로 반복시키면 사이트가 터지므로 조심할 것.
for(let f=1; f < e; f++){
    console.log(f);
}


//과제
/*구구단 만들기*/


let ga;
let na;

for(let ga=1; ga < 10; ga++){
    for(let na=1; na < 10; na++){
        console.log(ga,"X",na,"=",ga*na);
    }
}

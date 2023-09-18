//재귀함수
//함수가 함수 자신을 호출하는 함수

//쓸일은 그렇게 많지않은데
//알고리즘 문제 풀 때 가끔 사용한다.
/*
function add(){
    add();
}
*/
//임시로 데이터베이스에 추가할 때 라든지 사용할 수 있다.

//재귀함수에는 매개변수를 넣어준다.
function add(n){
    //함수가 자기 자신을 호출하기 때문에 무한으로 돌지 않으려면 
    //얼마나 반복 실행 시킬건지 명시해주어야 한다.
    if(n < 5){
        add(n + 1);
        console.log(n);
        //결과: 4 3 2 1 0
    }
}

add(0);

//함수의 실행 컨택스트
// add -> add2 -> add3 -> add4
// add4 -> 실행이 끝나고 -> add3 -> 실행이 끝나고 -> add2 -> 실행이 끝나고 -> add1 -> 실행이 끝나고 -> add 실행 끝
//n에 0의 값이 주어지고 if 문이 돌면서 0, 1, 2, 3, 4의 값이 생기고, stack 구조로 가장 나중의 값이 console로 호출되면서
//4, 3, 2, 1, 0의 순서로 값이 호출된다.

//함수가 호출되면 실행 컨텍스트가 생성되고
//함수안에서 함수를 호출하면서 실핼 컨텍스트가 쌓이고 뒤에서부터 실행하고 실행 컨텍스트 제거

//실행 컨텍스트 중요한 부분이므로 꼭 숙지하도록 하자


//재귀 함수 좀 더 써보자

//피보나치 수열을 재귀로
//피보나치 수열 : 수학적인 성질
//황금비 연속된 두 항의 비율
//0, 1, 1, 2, 3, 5, 8 ... 
//이전 두 항의 합으로 만들어진 수열
// 재귀 함수를 사용해서 피보나치 수열을 만들었다.
function fibonacci(n){
    if(n < 2) return n;
    //이전 두 항을 더해서 반환
    //(n - 1) 이전 항 / (n - 2) 이이전 항
    return fibonacci(n - 1) + fibonacci(n - 2);
}
for (let i = 0; i < 20; i++) {
    console.log(fibonacci(i));
}
0
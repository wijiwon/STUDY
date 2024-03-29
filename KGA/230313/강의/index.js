
for(let i = 0; i <10; i++){
    if(i % 3 == 0){
        console.log(i);
        console.log("주말 잘 쉬었니?")
    }
}

// 컴파일 언어와 인터프리터 언어
// 개념

/* 컴파일러 언어 : 프로그램 코드를 컴파일해서 컴퓨터가 알아들을 수 있는 기계어로 번역해준다. 
                    소스코드 전체를 한번에 번역하고 실행파일을 만들어서 실행해준다. */
        // 장점: 파일의 크기가 큰데 실행속도가 빠르다.
        // 실행하기 전, 전체코드를 번역해서 오류를 미리 알 수 있다. 컴파일 시 오류를 잡을 수 있다.
        // 대신 번역 과정 시간이 좀 걸린다.
        // C, C++, Java, Python 등

/* 인터프리터 언어: 프로그램 코드를 한 줄씩 읽으면서 번역과 실행을 한다.
        // 장점: 프로그램 실행 도중에 동적으로 소스코드를 수정이 가능하다.
        // 실행하는 크기가 작고 소스 코드의 수정이 용이하다. 그래서 디버깅 하기가 편하다.
        // 소스코드가 실행될 때마다 번역과 실행을 반복해서 속도는 좀 느리다.
        // 오류를 실행 중에 발견할 수 있다.
        // Javascript 등


// 논리 연산자 ||, &&

/* 
    || : 논리 합(OR)
    a || b --> a나 b 둘 중 하나라도 참이면 참
    0    0 --> false
    1    0 --> true
    0    1 --> true
    1    1 --> true

*/ 
let a = true;
let b = false;
console.log(a || b);    // a가 true이기 때문에 결과가 true로 나온 것.

console.log(false || false);        //flase
console.log(true || false);         //true
console.log(false || true);         //true
console.log(true || true);          //true


/*
    && : 논리 곱(AND)
    a && b --> a와 b 둘다 참 이어야 참
    0    0 --> false
    1    0 --> false
    0    1 --> false
    1    1 --> true

*/
let c = true;
let d = false;
console.log(c && d);
console.log(false && false);        //false
console.log(true && false);        //false
console.log(false && true);        //false
console.log(true && true);        //true


let text = "집에 가고싶다";
let age = 20;

//true && false
if(text === "집에 가고싶다" || age === 20){         // 텍스트의 조건과 나이의 조건이 둘 다 맞을 경우 if문 실행
        console.log("집에도가고 나이도 20이야.");
 }


 // 삼항 연산자
 // 한 줄로 코드들을 표현할 수 있고 잘쓰면 편하지만 가독성이 떨어질 수 있다.

 //조건 ? (앞의 조건이 참일 때):(앞의 조건이 거짓일 때)
 console.log(1 > 2? "이건 참이야" : "이건 거짓이야");
 
 console.log(1 < 2? 3 < 4? "이건 두번째 참이야" : "이건 틀렸어" : "이건 거짓이야");
 // 삼항 연산자를 여러번 겹쳐서 쓰게되면 보는 사람으로 하여금 해당 코드를 이해하기 힘드므로 여러번 겹쳐서 쓰지 않도록 한다.

 //조건문 switch
 
 /*
 switch ("조건 값") {
    case 1:                 //if부분. case는 여러번 선언할 수 있다.
        
        break;

    case 2:                 //else if
        
        break;

    case 3:                 //else if
        
        break;
    case 4:                 //else if
        break;
    default:                //else
        break;
 }
*/
 
 /*
 switch ("조건 값") {
    case 1:                 //조건 값과 'case 1'을 비교. 일치할 경우 해당 구문의 작업을 진행하고 break로 빠져나온다.
        
        break;

    case 2:                 //'case 1'과 일치하지 않았을 경우 비교.일치할 경우 해당 구문의 작업을 진행하고 break로 빠져나온다.
        
        break;

    case 3:                 //'case 2'과 일치하지 않았을 경우 비교.
        
        break;
    case 4:                 //'case 3'과 일치하지 않았을 경우 비교.
        break;
    default:                //모든 case문의 조건과 일치하지 않았을 경우 실행한다.
        break;
 }
*/

let month = 10;
let monthName = "";


switch (month) {
    case 1:
        
        break;
    case 2:
        
        break;
    case 3:
        
        break;
    case 4:
        
        break;
    case 5:
        
        break;
    case 6:
        
        break;
    case 7:
        
        break;
    case 8:
        
        break;
    case 9:
        
        break;
    case 10:
        monthName = "October"       //해당 구문이 동작되는 이유는 10case부터 실행을 시키는데
        break;                      // break문이 있기 때문에 더 실행을 하지 않고 switch문을 빠져 나가는 것이다.
                                    // break문이 없으면 case11로 들어가서 다음 break가 나올 때 까지 실행하거나 switch문이 끝날 때 까지 실행한다.
    case 11:
        monthName = "Novenber"      //month의 값이 11이므로 해당 구문을 실행.
        break;
    case 12:
        
        break;

    default:
        break;
}

console.log(monthName);


switch (1) {
    case 1:
        console.log("첫 번째 case문");
        // break;
    case 2:
        console.log("두 번째 case문");
        // break;
    case 3:
        console.log("세 번째 case문");
        // break;                           개발자가 원하는 작업에 따라 break를 넣고 빼면 된다.

    default:
        console.log("마지막");
        break;
}

// while 반복문: 무한히 돌아간다.
// while("값이 true면 무한으로 돌아간다. false면 값을 변경해주어야 반복문이 멈춘다.")
// break문으로 반복을 종료시켜 줄 수 있다.
/*
while (true) {
    if("멈추는 조건"){
        break;              // 조건이 맞을 때 반복을 끊어준다.
    }
    
}
*/

let num = 1;
while (num !== 5) {         // 변수num의 값이 5가 아닐 때 까지
    console.log(num);       // 변수 num의 값 노출
    num++;                  // 변수 num의 값을 1씩 증가. num의 값이 5가 되는 순간 while문 종료.
}


let num2 = 1;
while (true) {         // while의 조건은 무조건 참
    console.log(num2);       // 변수 num2의 값 노출
    num2++;                  // 변수 num2의 값을 1씩 증가.
    if(num2 === 5){          // 변수 num2의 값이 5와 같다면
        break;               // while문을 빠져나온다.
    }

}


//사용자가 브라우저에 값을 간단히 입력 받을 수 있는 상태창을 띄워준다.
// prompt: 간단한 입력값을 받아올 수 있다.
let value = prompt("값을 입력하시오.")  // 값을 받을 수 있는 상태창에 메세지 입력
console.log("vlaue : ", value);


let inputnum = prompt("첫 번째 숫자 입력");
let inputnum1 = prompt("두 번째 숫자 입력");

let result = inputnum + inputnum1;              // prompt에 입력받은 내용은 문자열이므로 숫자가 나열되는 형식으로 값이 노출된다.

console.log("결과는 두구두구두구~(문자열) : ", result);

// 숫자 형태가 필요하므로 형태를 변환시켜주는 항수를 사용해야 한다.  => 형변환 진행이 필요

let result2 = parseInt(inputnum)+ Number(inputnum1);
// parseInt("숫자 또는 정수로 변경할 변수나 값");
// Number("숫자 또는 정수로 변경할 변수나 값");
//다른 형태의 type을 number type으로 형변환 시켜준다.
console.log("결과는 두구두구두구~(숫자) : ", result2);


let vlaue = prompt("너는 1~5 사이의 숫자를 입력해야해");
let play = true;
while (play) {
    switch(vlaue){
        case "1":
            console.log("1번");
            play = false;
            break;
        case "2":
            console.log("2번");
            play = false;
            break;
        case "3":
            console.log("3번");
            play = false;
            break;
        case "4":
            console.log("4번");
            play = false;
            break;
        case "5":
            console.log("5번");
            play = false;
            break;
        default:
            console.log("1~5번 눌러");
            vlaue = prompt("1~5를 누르라고 했지? ");            // 정확한 값을 누를 때까지 반복하게 된다. 계속 play 값이 ture가 되므로
            break;
    }
    
}

//연습: 가위바위보 
//3개 중에 선택을 할 수 있는데 컴퓨터가 자동으로 선택할 수 있는 방법을 만들어야 함

//자바스크립트에서 랜덤 값을 구할 수 있는 친구
Math.random();      // 0~1까지의 랜덤 수 (소숫점의 랜덤 수가 노출)
// parseInt() 를 활용하여 정수로 변환을 하고 값이 너무 작으니까 곱해주어야 한다.
// 0 ~ 100
// 0 == 가위
// 1 == 바위
// 2 == 보
console.log(parseInt(Math.random() * 3));


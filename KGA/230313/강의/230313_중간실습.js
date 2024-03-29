
/*
만들 순서
1. 사용자 입력값, 컴퓨터 랜덤 값, while문 진행 변수 선언
2. 컴퓨터 랜덤 값, 가위바위보로 변환
3. 가위바위보 식 만들기
*/



let value;          // 사용자에게 값을 받을 변수
let computer;       // 컴퓨터에게 값을 받을 변수
let play = true;           // 게임 진행

// 0 = 가위     1 = 바위    2 = 보

let win = true;
let luse = false;




value = prompt("가위 바위 보")              // 컴퓨터의 랜덤 값에 결과 대입
computer = parseInt(Math.random() * 3);

if(computer == 0){
    computer = "가위";
}
else if(computer == 1){
    computer = "바위";
}
else{
    computer = "보";
}

while(play){                 // play가 ture 상태면 계속 진행
    switch (value) {
        case "가위":         //value 값이 "가위"일 경우
            console.log("나: ",value," vs  컴퓨터: ",computer);     // 사용자 입력값과 컴퓨터 랜덤 값 노출
            if(computer === "가위"){                                //컴퓨터 랜덤 값이 "가위"일 경우 
                console.log("무승부입니다.");
            }
            else if(computer === "바위"){                           //컴퓨터 랜덤 값이 "바위"일 경우
                console.log("패배");
            }
            else{                                                   //컴퓨터 랜덤 값이 "보"일 경우
                console.log("승리");                            
            }
            play = false;                                           //while문이 끝나게 한다.
            break;
        case "바위":        //value 값이 "바위"일 경우
            console.log("나: ",value," vs  컴퓨터: ",computer);
            if(computer === "가위"){
                console.log("승리");
            }
            else if(computer === "바위"){
                console.log("무승부입니다.");
            }
            else{
                console.log("패배");
            }
            play = false;
            break;
        case "보":      //value 값이 "보"일 경우
            console.log("나: ",value," vs  컴퓨터: ",computer);
            if(computer === "가위"){
                console.log("패배");
            }
            else if(computer === "바위"){
                console.log("승리");
            }
            else{
                console.log("무승부입니다.");
            }
            play = false;
            break;
        case null:                  // prompt에 입력받을 시 취소를 누를 경우 닫히게 하는 명령
            break;
    
        default:
            value = prompt("가위 바위 보 중 선택하시오.")       // value에 가위 바위 보를 제외한 다른 값을 입력했을 경우
            break;
    }
}
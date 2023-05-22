/* 과제 1. 가위바위보 게임 20판 게임 , 초기 소지금 20000원
        2. 시작 전 배팅금액 입력(2천원 이상 걸도록 , 2천원 이하는 다시 입력)
        3. 가위바위보 하고 묵찌빠 진행 -> 이기면 배팅 금 * 2
        4. 지면 마이너스 배팅한 금액의 * 2
        5. 종료 조건 20판 다 끝나면 또는 돈 다 잃었을 때
        6. 게임 끝나면 소지금이랑 몇 판 했는지 알려주세요.    */

/* 작업순서
1. 배팅금 입력
2. 가위바위보 입력
3. 컴퓨터에 랜덤 값 지정, 컴퓨터 값 문자열로 변경
    묵찌빠 진행
        함수 1 (가위바위보) - 가위바위보 식 만들기
                           - 결과 값을 winlose_1로 저장
        함수 2 (묵찌빠) - 묵찌빠 식 만들기
                       - 가위바위보의 winlose_1값을 받아와서 배팅금을 -,+를 결정 

4. 배팅금 정산
5. 게임 카운트 누적
6. 게임 결과 확인
*/


let player;                     // 사용자(가위바위보)
let computer;                   // 컴퓨터(가위바위보)
let player2;                    // 사용자(묵찌빠)
let computer2;                  // 컴퓨터(묵찌빠)
let count = 0;                  // 게임 횟수 초깃값 = 0
let MaxCount = 20;              // 최대 게임 횟수 초깃값 = 20
let money = 20000;              // 사용자 소지금 초깃값 = 20000
let batting;                    // 배팅금
let MinBatting = 2000;          // 최소 배팅금 초깃값 = 2000
let bat_subtext = "";           // 배팅금 서브텍스트
let con_subtext = "";           // 카운트 서브텍스트(가위바위보)
let con2_subtext = "";           // 카운트 서브텍스트(묵찌빠)
let winlose = "";             // 승패 결과 (사용자가 이길 경우 = win, 질 경우 lose, 비길경우 while의 else문)

function RSP(ply, com) {                            //가위바위보가 동작하는 함수RSP
    if(ply == "가위" && com == "바위"){
        winlose = "lose";
    }    
    else if(ply == "가위" && com == "보"){
        winlose = "win";
    }    
    else if(ply == "바위" && com == "가위"){
        winlose = "win";
    }    
    else if(ply == "바위" && com == "보"){
        winlose = "lose";
    }    
    else if(ply == "보" && com == "가위"){
        winlose = "lose";
    }    
    else if(ply == "보" && com == "바위"){
        winlose = "win";
    }    
}

function RSP2(ply2, com2) {
    if(winlose == "win"){                              // 가위바위보 결과가 win일 경우
        if(ply2 == com2){                               // 가바보 - 이김 && 묵찌빠 - 비김  > 최종 승리
            winlose = "final_win";
        }
        else if(ply2 == "가위" && com2 == "보"){        // 가바보 - 이김 && 묵찌빠 - 이김   > 묵찌빠 다시 (사용자 주도권)
            winlose = "win";
        }
        else if(ply2 == "바위" && com2 == "가위"){        // 가바보 - 이김 && 묵찌빠 - 이김   > 묵찌빠 다시 (사용자 주도권)
            winlose = "win";
        }
        else if(ply2 == "보" && com2 == "바위"){        // 가바보 - 이김 && 묵찌빠 - 이김   > 묵찌빠 다시 (사용자 주도권)
            winlose = "win";
        }
        else if(ply2 == "가위" && com2 == "바위"){        // 가바보 - 이김 && 묵찌빠 - 짐   > 묵찌빠 다시 (컴퓨터 주도권)
            winlose = "lose";
        }
        else if(ply2 == "바위" && com2 == "보"){        // 가바보 - 이김 && 묵찌빠 - 짐   > 묵찌빠 다시 (컴퓨터 주도권)
            winlose = "lose";
        }
        else if(ply2 == "보" && com2 == "가위"){        // 가바보 - 이김 && 묵찌빠 - 짐   > 묵찌빠 다시 (컴퓨터 주도권)
            winlose = "lose";
        }
    }
    else if(winlose == "lose"){             //가위바위보 결과가 lose일 경우
        if(ply2 == com2){                               // 가바보 - 짐 && 묵찌빠 - 비김  > 최종 패배
            winlose = "final_lose";
        }
        else if(ply2 == "가위" && com2 == "보"){        // 가바보 - 짐 && 묵찌빠 - 이김   > 묵찌빠 다시 (사용자 주도권)
            winlose = "win";
        }
        else if(ply2 == "바위" && com2 == "가위"){        // 가바보 - 짐 && 묵찌빠 - 이김   > 묵찌빠 다시 (사용자 주도권)
            winlose = "win";
        }
        else if(ply2 == "보" && com2 == "바위"){        // 가바보 - 짐 && 묵찌빠 - 이김   > 묵찌빠 다시 (사용자 주도권)
            winlose = "win";
        }
        else if(ply2 == "가위" && com2 == "바위"){        // 가바보 - 짐 && 묵찌빠 - 짐   > 묵찌빠 다시 (컴퓨터 주도권)
            winlose = "lose";
        }
        else if(ply2 == "바위" && com2 == "보"){        // 가바보 - 짐 && 묵찌빠 - 짐   > 묵찌빠 다시 (컴퓨터 주도권)
            winlose = "lose";
        }
        else if(ply2 == "보" && com2 == "가위"){        // 가바보 - 짐 && 묵찌빠 - 짐   > 묵찌빠 다시 (컴퓨터 주도권)
            winlose = "lose";
        }
    }
}

/*
    함수 
        if win일 경우
            if  - 비길경우 winlose2 = final_win
            else if - winlose2 = win
            else - winlose2 = lose

        else lose일 경우
            if  - 비길경우 winlose2 = final_lose
            else if - winlose2 = win
            else - winlose2 = lose


    실행문
    while
    function2();
    if(f_win) - 배당금
    else if(F_lose) - 배당금
    else if (lose) - continue 
    else if (win) - continue

*/

while (money > 0 && count <= MaxCount) {
    batting = parseInt(prompt(`${bat_subtext}\n 배팅금을 입력하세요. (최소금액: ${MinBatting}원  |  소지금: ${money}원)`));

    if(isNaN(batting)){                         //배팅금이 숫자가 아닐 경우 true로 아래 if문 실행
        bat_subtext = "숫자를 입력하세요!";
        continue;
    }
    if(batting < MinBatting){                   //배팅금이 2000보다 작을 경우
        bat_subtext = "2,000 이상의 숫자를 입력하세요!";
        continue;
    }
    alert(`배팅금: ${batting}원`);

    while (money > 0 && count <= MaxCount) {
        player = prompt(`${con_subtext} \n 가위 바위 보를 입력하세요! (남은 횟수: ${MaxCount - count}회  |  소지금: ${money}원)`);

        computer = parseInt(Math.random() * 3);

        if(computer == 0){
            computer = "가위";
        }
        else if(computer == 1) {
            computer = "바위";
        }
        else{
            computer = "보";
        }

        if(player == computer){                   // 비겼을 경우 continue
            alert(`나: ${player}  |  컴퓨터: ${computer} `);
            continue;
        }
        else if(player == "가위" || player == "바위" || player == "보"){              // 가위 바위 보 중 선택했을 경우 RSP
            RSP(player, computer);
            alert(`나: ${player}  |  컴퓨터: ${computer}  |  승패: ${winlose}`);

        }
        else{                 // 가위 바위 보 를 선택하지 않았을 경우 다시 선택하세요!
            con_subtext = "가위, 바위, 보 중 하나를 입력하세요!";
            continue;
        }
        break;
    }

    while (money > 0 && count <= MaxCount) {
        player2 = prompt(`${con2_subtext}\n묵찌빠 시작!\n가위 바위 보 중 하나를 입력하세요!  소지금: ${money}원  |  남은 횟수: ${MaxCount - count}`)
        
        computer2 = parseInt(Math.random() * 3);

        if(computer2 == 0){
            computer2 = "가위";
        }
        else if(computer2 == 1) {
            computer2 = "바위";
        }
        else{
            computer2 = "보";
        }
        
        if(player2 == "가위" || player2 == "바위" || player2 == "보"){
            RSP2(player2, computer2);

            if(winlose == "final_win"){
                money = money + (batting * 2);
                alert(`나: ${player2}  |  컴퓨터: ${computer2}  |  승패: ${winlose}`);
            }
            else if(winlose == "final_lose"){
                money = money + (-batting * 2);
                alert(`나: ${player2}  |  컴퓨터: ${computer2}  |  승패: ${winlose}`);
            }
            else if(winlose == "win"){
                alert(`나: ${player2}  |  컴퓨터: ${computer2}  |  승패: ${winlose}`);
                continue;
            }
            else if(winlose == "lose"){
                alert(`나: ${player2}  |  컴퓨터: ${computer2}  |  승패: ${winlose}`);
                continue;
            }
        }
        else{
            con2_subtext = "가위, 바위, 보 중 하나를 입력하세요!";
            continue;
        }
        count++;
        break;
    }
    
alert(`게임한 횟수: ${count}회  |  소지금: ${money}원`);
break;
}


/* 과제 1. 가위바위보 게임 20판 게임
        2. 시작 전 배팅금액 입력(2천원 이상 걸도록 , 2천원 이하는 다시 입력)
        3. 가위바위보 하고 묵찌빠 진행 -> 이기면 배팅 금 * 2
        4. 지면 마이너스 배팅한 금액의 * 2
        5. 종료 조건 20판 다 끝나면 또는 돈 다 잃었을 때
        6. 게임 끝나면 소지금이랑 몇 판 했는지 알려주세요.    */


let player;             // 플레이어의 선택값
let computer;           // 컴퓨터의 선택값
let player2;             // 플레이어의 선택값
let computer2;           // 컴퓨터의 선택값
let money = 20000;              // 소지금액
let batting;            //배팅금
let minbatting = 2000;
let count = 0;              // 묵찌빠 횟수
let maxcount = 20;
let count2 = maxcount - count;
let subtext = "";           //컴퓨터가 내보낼 문자
let WinORLose = "";         //가위바위보 이김 또는 지는 결과값



while(money > 0 && count < maxcount){
    // 0 = 가위     1 = 바위    2 = 보
    batting = parseInt(prompt(`${subtext} \n 배팅금을 입력하시오. (최소 2,000원 / 숫자만 입력하시오.)  |  남은금액: ${money}`));
    console.log(`배팅금 ${batting}원`)
    console.log(`남은 금액: ${money}`)

    if(isNaN(batting)){
        subtext = "숫자를 입력하세요!";
        continue;
    }
    if(batting < minbatting){
        subtext = "2,000원 보다 큰 금액을 입력하세요.";
        continue;
    }
    console.log(`${batting}원`);

    player = prompt(`가위바위보를 입력하세요.\n 남은 금액 : ${money}원  |  남은 횟수 : ${count2}회`);
 
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

    console.log("나: ",player," vs  컴퓨터: ",computer);

    if(player == "가위" && computer == "바위") {
        WinORLose = "lose";
    } 
    else if(player == "가위" && computer == "보") {
        WinORLose = "win";
    } 
    else if(player == "바위" && computer == "가위") {
        WinORLose = "win";
    } 
    else if(player == "바위" && computer == "보") {
        WinORLose = "lose";
    } 
    else if(player == "보" && computer == "가위") {
        WinORLose = "lose";
    } 
    else if(player == "보" && computer == "바위") {
        WinORLose = "win";
    } 
    else{
        WinORLose = "again";
        continue;
    }

    while(money >= 0 && count < maxcount) {
        player2 = prompt(`묵찌빠를 입력하세요.\n 남은 금액 : ${money}원  |  남은 횟수 : ${count2}회`);
        computer2 = parseInt(Math.random() * 3);
        if(computer2 == 0){
            computer2 = "가위";
        }
        else if(computer2 == 1){
            computer2 = "바위";
        }
        else{
            computer2 = "보";
        }

        if(player2 !== computer2){
            if(player2 == "가위" && computer2 == "바위"){
                WinORLose = "lose";
                console.log(`나: ${player2}  |  컴퓨터: ${computer2}  | 결과: ${WinORLose}`);
            }
            else if(player2 == "가위" && computer2 == "보"){
                WinORLose = "win";
                console.log(`나: ${player2}  |  컴퓨터: ${computer2}  | 결과: ${WinORLose}`);
            }
            else if(player2 == "바위" && computer2 == "가위"){
                WinORLose = "win";
                console.log(`나: ${player2}  |  컴퓨터: ${computer2}  | 결과: ${WinORLose}`);
            }
            else if(player2 == "바위" && computer2 == "보"){
                WinORLose = "lose";
                console.log(`나: ${player2}  |  컴퓨터: ${computer2}  | 결과: ${WinORLose}`);
            }
            else if(player2 == "보" && computer2 == "가위"){
                WinORLose = "lose";
                console.log(`나: ${player2}  |  컴퓨터: ${computer2}  | 결과: ${WinORLose}`);
            }
            else if(player2 == "보" && computer2 == "바위"){
                WinORLose = "win";
                console.log(`나: ${player2}  |  컴퓨터: ${computer2}  | 결과: ${WinORLose}`);
            }
            if(WinORLose == "win"){
                money = money + (batting * 2);
                console.log("묵찌빠 승리");
            }
            else if(WinORLose == "lose"){
                money = money + (-batting * 2);
                console.log("묵찌빠 패배");
            }
        }
        else {
            if(WinORLose == "win"){
                money = money + (batting * 2);
                console.log("묵찌빠 승리");
            }
            else if(WinORLose == "lose"){
                money = money + (-batting * 2);
                console.log("묵찌빠 패배");
            }
        }
        count++;
        if(count >= maxcount){
            //실패! 게임 오버
            console.log("게임 오버");
        }
        break;
    }
    console.log(`게임한 횟수 : ${count}  |  남은 금액: ${money}`);
}
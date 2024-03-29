//업 다운 게임
//숫자 맞추기

//1. 플레이어가 있고, 컴퓨터가 있다.
//2. 플레이어는 선택을 할 수 있게하고, 컴퓨터는 랜덤값을 가진다.
//3. 플레이어가 선택할 수 있는 제어문
//4. 게임의 종료 시점을 정한다.

let playerSelect;
// 1~100까지의 랜덤숫자
let comSelect = Math.random() * 99 + 1;

let count = 0;      //게임을 시도한 횟수

let max = 100;      //플레이어가 선택이 가능한 최대의 숫자.
let min = 0;        //플레이어가 선택이 가능한 최소의 숫자. 처음 선택한 숫자가 작을 경우 그 이하의 수는 입력하지 못하도록 할 것이기 때문


let subText = "";   //컴퓨터가 알려줄 문구
let maxCount = parseInt(prompt("게임 몇 번 할래?"));    // 게임을 할 횟수

//반복되어야 한다.

while(playerSelect !== comSelect && count < maxCount){
    // ES6에서 문자열을 사용할 때 편하게 사용할 수 있는 기법
    // 템플릿 리터럴 문자를 다룰 때 줄바꿈같은 것을 편하게 사용할 수 있게 해준다.
    // ` 백틱(키보드 상의 ~ 버튼)
    // `${변수}문자열`
    // \n: 문자를 작성할 때 줄내림을 해준다.
    playerSelect = prompt(`${subText}\n숫자를 입력하세요\n 최소 : ${min} | 최대 : ${max} | 남은 횟수 : ${maxCount - count}`);

    //입력된 값이 숫자인지 확인을 해야한다. 문자 등을 쓸 수도 있기 때문

    //숫자로 변환
    // playerSelect = perseInt(playerSelect);
    //isNaN: 숫자가 아닌 값을 입력했는지? 숫자가 아닌 값이 입력될 경우 ture가 된다.
    if(isNaN(playerSelect)){
        subText = "숫자를 입력 하세요!"
        // 다시 게임을 시작 해야하는데 밑에 작성된 코드를 읽지 않게 할 수 없을까?
        continue;   //다시 시작. continue 구문 부터 밑으로 읽지 않고 다시 반복문 시작점으로 돌아간다.
    }
   
    //최소와 최대 사이의 값인지 확인. 범위의 값이 맞는지 확인
    if(min >= playerSelect || max <= playerSelect) {
        subText = `너 입력값 확인해 최소 : ${min} | 최대 : ${max}`
        continue;   //다시 입력하세요.
    }

    //게임의 로직 시작

    if (playerSelect > comSelect) {
        //max최대값을 다시 겹치지 않게 입력 해준다.
        max = playerSelect;
        subText = "다운!";
    }
    else if(playerSelect < comSelect){
        //min 최소 값을 다시 겹치지 않게 입력 해준다.
        min = playerSelect;
        subText = "업!";
    }
    else{
        count = count +1;
        console.log(`${count}번 시도해서 맞췄습니다.`);
        //게임 끝났음
        break;
    }
    //게임 횟수 증가해야 함
    count++;
    if(count >= maxCount){
        //실패! 게임 오버
        console.log("게임 오버");
    }
}


/* 과제 1. 가위바위보 게임 20판 게임
        2. 시작 전 배팅금액 입력(2천원 이상 걸도록 , 2천원 이하는 다시 입력)
        3. 가위바위보 이기면 묵찌빠 진행 -> 이기면 배팅 금 * 2
        4. 지면 마이너스 배팅한 금액의 * 2
        5. 종료 조건 20판 다 끝나면 또는 돈 다 잃었을 때
        6. 게임 끝나면 소지금이랑 몇 판 했는지 알려주세요.    */
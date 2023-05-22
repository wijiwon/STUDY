//과제
/*구구단 만들기*/


let ga;
let na;

for(let ga=1; ga < 10; ga++){
    for(let na=1; na < 10; na++){
        console.log(ga,"X",na,"=",ga*na);
    }
}



//과제_2
/* 수상자 호출하기
    전체 학생 이름들의 배열을 만들고 학생 배열에서 수상자 배열에 있는 학생을 console.log()로 호출해서 학생이름 보여주기*/


let student = ["김가가","김나나","김다다","김라라","김마마","김사사","김아아","김자자","김차차","김카카","김타타","김파파","김하하"];
let award = ["김아아","김차차"];
let b = 0;
let c = 0 ;

for(let c=0;c<award.length;c++){            //배열명.length : 배열의 데이터 개수를 나타낸다.
    for(let b=0;b<student.length;b++){
        
        if(student[b] == award[c]) {
            console.log(student[b]);
        }

    }
}




//과제_3
/* 3의 배수 구하기 (%연산자 사용) 60번 반복문을 돌리고 3의 배수가 아닐경우 숫자를 console.log()로 숫자를 보여주고 
    3의 배수일 경우 "짝" 문자열 보여주기*/

let a;


for(let a=1; a <= 60; a++){ 
    if(a % 3 == 0){
        console.log("짝");    
    }
    else{
        console.log(a);
    }
}



// 배열 심화
// 배열 [1,2,3,4,5,6] 래퍼런스 타입
// 리스트 형태
// 인덱스의 순서로 해당 값에 접근할 수 있다.
// 사람은 1부터 숫자를 세지만 배열은 0부터 숫자를 세기 때문에 인덱스는 0 ~ 배열의 길이까지를 센다.

// 다른언어(C, C++, C#) 등에서는 배열이 list 타입이 있는데
// 자바스크립트에서는 Arr타입이 있고, 사용자가 편하게 접근하기 위해서 조금 허술한 부분이 있다.
// 자바스크립트의 배열은 객체 키값이 0 1 2 3

// 자바스크립트의 배열안의 배열은 객체배열이다.
// 다른 언어 배열안의 배열 예) int a[0][1];
// 자바스크립트 배열안의 배열
let a = [[1,2,3],[4,5,6],[7,8,9]];
//배열 안에 배열이 있는 것을 이중 배열이라 부른다.
console.log(a[0]);          // a[0] === [1,2,3]
console.log(a[0][0]);       // a[0][0] === 1 ([1,2,3]의 0번 인덱스인 1이 나온다.)
//삼중, 사중으로 배열을 사용할수는 있지만 보통 이중배열까지만 사용한다.

//배열에는 length라는 키값이 있다.
//배열의 총 길이를 알려준다.

console.log(a.length);
// 배열의 인덱스를 접근할 때 0 ~ (배열의 길이 -1)  예) 길이: 1, 2, 3   인덱스: 0, 1, 2 
/* 예)  let b = [1,2,3,4,6,7];
    for (let i = 0; i < 7; i++) {                   반복문에 숫자를 바로 작성하게 되면 반복문의 반복 횟수를 동적으로 변경하기 어렵다.
        console.log(b[i]);                          
    } 
    길이가 변경되는 상황이 발생하면 반복문의 돌아가는 횟수는 정해져 있기 때문에 반복문의 횟수보다 배열의 길이가 길면 그 후의 값은 가져올 수 없다.
    만약 length로 설정을 했다면 키값으로 배열의 길이만큼을 가져오게 되므로 해당 상황에서는 정상적으로 배열의 길이만큼 반복시킬 수 있다.
    */

let b = [1,2,3,4,5,6,7]
b.push(8);              // 배열 타입의 함수. 함수도 값이다.
b.push(9);
for (let i = 0; i < b.length; i++) {            // 배열의 인덱스는 길이보다 -1 이므로 조건식에 " i < array.length"로 부등호가 항상 작아야한다.
    console.log(b[i]);
    
}

//객체에는 키와 값이 있다.
const obj = {                     // const: 한 번 선언하면 값을 변경할 수 없다. 재선언이 불가하다. 상수의 값
    a : "나는 객체.",              // a는 키, "나는 객체."는 값.
    push : function(num){        // 익명함수 : 이름이 없는 함수이다.
        console.log("나는 obj 객체 안에 push 라는 키값에 있는 함수야.");
        console.log(num + "를 매개변수로 받았어");
    }
}


console.log(obj.a);
obj.push(2);


let d = [1,2,3,4,5];

// 배열의 인덱스에 따른 값을 구할 수 있는 함수
// return은 변수명으로 쓸 수 없다.

let return2 = d.indexOf(4);     // 배열명.indexOf(배열의 값): 배열의 값을 입력하면 해당 값의 인덱스를 알려준다.
console.log(return2);           // 배열의 인덱스를 찾아서 위치를 반환

let arr = ["사과","딸기","포도"];
let return3 = arr.indexOf("딸기");
console.log(return3);       // 딸기 값의 인덱스 반환





// 배열 메소드 find: 검색할 때 사용할 함수
// 함수 반환값이 ture가 나오는 함수를 넣어주고

//find하는 함수는 매개변수로 함수를 전달 받는다.
let return4 = arr.find(function(item){                  //익명함수 작성
    // 배열 arr의 값이 매겨변수 item에 순서대로 들어온다.
    console.log("item"+item);

    return item === "딸기";       // find함수에서 return 값이 true의 값이 반환되면 해당 값을 반환해준다. 순서대로 값이 불러와지고 값을 내보내면 함수가 종료된다.

});

console.log(return4);           // undefined




//배열 메소드 findIndex
let return5 = arr.findIndex(function(i){        // 배열에서 해당 값의 인덱스를 찾는다.
    return i === "딸기";
})
// 해당 배열을 반복시키면서 값을 찾고 그 값의 인덱스를 반환해준다.
console.log(return5);




//문자열 가나다.
let str = "가나다";
console.log(str[0]);        //문자열도 한글자 한글자 인덱스 접근이 가능하다. 결과: 가




let arr2 = ["이사과","김딸기","이포도"]
//배열 메소드 filter (많이 씀)
let return6 = arr2.filter(function(u){
    return u[0] === "이";                   // 배열 u 에서 "이"가 속한 값을 반환
})
// filter: 검색창 같은 알고리즘을 구현할 때 사용할 것 같다.


// 원하는 값을 모두 찾아서 반환해준다.
console.log(return6);




// 배열 메소드 map
let return7 = arr2.map(function(i){
    console.log(i);
    // return i;
    return i[0] === "이";       // 반환 값들을 배열의 형태로 반환해준다.
})
// 반환값을 배열의 길이만큼 채워서 반환
console.log(return7);


// 배열 메소드 forEach
// 해당 배열을 반복시켜서 작업해야할 경우 용이하게 사용된다.
arr2.forEach(function(i){
    console.log("forEach"+i);
})
//배열의 길이만큼 반복하면서 값을 뽑아준다. 값을 바로 사용할 수 있다. 매개변수의 값을 순차적으로 뽑아준다. 따라서 for문을 돌리지 않아도 forEach로 사용가능

/*
for (let i = 0; i < arr2.length; i++) {
    
    //이전에는 증가하는 값을 배열의 인덱스로 줘서 값을 확인했었다.
    console.log(arr2[i]);
    
}
*/


//배열의 메소드 join
// join 함수는 매개변수로 문자열을 전달해준다.
let str3 = arr.join(",");
console.log(str3);
console.log(arr2.join(","));    //배열을 문자열로 변경시켜 준다. join의 매개변수에서 전달한 문자열로 배열에 들어있는 값들을 구분해준다.




//split 함수: 문자열을 배열로 변경시켜준다.
console.log(str3.split(','));       
// split 함수의 매개변수로 문자열 값을 자를 문자값을 넣어주면 된다. 
//','값을 매개변수로 전달하면 문자열에서 ,의 문자를 잘라서 배열의 형태로 변경시켜준다.






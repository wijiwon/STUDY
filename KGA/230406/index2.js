//배열 메소드 좀 더 사용해보자

//배열 메소드가 제일 많이 사용됩니다.


//Array.of(); : 전달될 인자를 요소로 가지는 배열을 만들어준다.
//배열을 생성할 때 사용하는 메소드
const ex = Array.of(1,2,3,"배열");
console.log(ex);


const arr = Array.of(1,2,3,4,5,6);
console.log(arr);

//배열의 원본 배열을 수정하는 메소드
//결과 값으로 새로운 배열을 반환시켜주는 것이 아니고,
//원본 배열을 수정하는 메소드
arr.push(2);
console.log(arr);

const result = arr.concat(5);   //원본 배열 수정 안함. 새로운 배열이 생기고 반환된다.
console.log(arr);
console.log(result);

// 래퍼런스 타입
console.log(arr == result); //결과로 false가 뜰것이다.

let a = [1,2,3];
let b = [...a]; //값만 복사해서 새로운 배열을 만들어줌
let c = [5];
let d = [5];
let e = 5;
let f = 5;
console.log(a == b);    //같다. ture
//참조타입은 값을 비교하는게 아니고 주소를 비교한다.
console.log(c == d);    //다르다. false
console.log(e == f);    //같다. ture
b.push(2);
console.log(a == b);    //같다. ture
console.log(a);    //같다. ture
console.log(b);    //같다. ture

const foods = ["apple","banana","orange"];

//foods 배열에서 banana가 있는지 확인
if(foods.indexOf("banana") === -1){
    //없으면 원본에 추가해라
    foods.push("banana");
}
console.log(foods);

//ES7에 도입. includes
//banana가 배열에 있으면 true, 없으면 false
console.log(foods.includes("banana"));

//있는지 없는지 확인할 때 사용하면 좋겠다.
if(foods.includes("banana")){
    //없으면 추가
    foods.push("banana");
}

//배열에 추가할 때 push 메소드를 사용하는데
//자바스크립트에서는 index에러가 따로 뜨지 않는다. (정해진 사이즈가 없기 때문에)
const arr2 = [1,2,3];
//배열의 최대 인덱스는 갯수 -1
//0 1 2
//길이: 0 1 2 3
arr2[arr2.length] = 4;  //길이는 인덱스보다 크므로 그 다음 인덱스에 값이 들어갈 수 있다.
arr2[arr2.length + 1] = 6;  //배열의 끝에 추가하지 않고 더 이후의 인덱스에 값을 추가하면 중간값들은 비어있다.
console.log(arr2);


//배열의 마지막 요소를 제거하는 메소드
const arr3 = [1,2,3,4,5];
//pop: 원본이 수정되는 메소드
arr3.pop();
console.log(arr3); 

//첫 번째 요소를 제거하고 싶어
//shift메소드: 첫 번째 요소를 제거해준다.
//원본이 수정되는 메소드
arr3.shift();
console.log(arr3);

//concat메소드: 원본배열을 유지하고 배열을 새롭게 만들어 기존 배열을 합치는 메소드
/*예) 판매상품들의 리스트가 있는데 원본 배열을 수정하면 안되고,
    생활 가전 식품 리스트가 따로 있고
    우리가 전체 상품 리스트를 뽑아서 이벤트성이나
    전체 상품 페이지를 구성해야할 때
    원본은 유지하고 새로운 리스트를 만들 수 있다.*/
const arr5 = [1,2];
const arr6 = [3,4];
const arr7 = arr5.concat(arr6);
console.log(arr7);


//원본 배열의 중간 값을 제거, 추가하는 경우
//splice
const arr8 = [1,2,3,4];
const result2 = arr8.splice(1,2,20,30);     //1번, 2번 인덱스를 제거하고, 20과 30의 값을 추가한 것
console.log(arr8);
console.log(result2);       //splice함수의 반환은 제거한 요소들이 반환된다.

const arr9 = [1,2,3,4]
const result3 = arr9.splice(1,2);   //인덱스 1번과 2번의 값을 제거만 한다.   
console.log(arr9);      //제거한 원본 배열을 받는다.
console.log(result3);   //함수의 반환값으로 제거한 요소를 받는다.

//---------------------배열에서 특정 요소를 제거하는 함수
const arr10 = [1,20,3,1,50,6]
function remove(arr, item){
    //제거할 item의 인덱스
    //indexOf
    const index = arr.indexOf(item);
    if(index !== -1) arr.splice(index,1);   //해당 인덱스에서 하나 제거이니까 그 인덱스에 있는 요소를 제거해준다.
    return arr;
}
console.log(remove(arr10,20))
console.log(arr10)

//매개변수로 전달받은 범위의 아이템을 복사해서 배열을 반환해주는 함수
//slice 원본 배열을 변환 X
const arr11 = [1,2,3];
//arr11.slice(0,1);
console.log(arr8.slice(0,2));

//join메소드 원본 배열의 모든 요소를 문자열로 변환
const arr12 = [1,2,3,4];
const result4 = arr12.join();
console.log(result4);

//reverse() 배열을 뒤집어주는 함수
console.log(arr12.reverse());

//fill()메소드 : ES6. 인자로 전달받은 값을 처음부터 끝까지 채워준다.
//배열의 갯수를 유지하되, 값을 초기화 해야할 때 사용
const arr13 = [1,2,3,4,5];
arr13.fill(0);
console.log(arr13);

//ES10
//[1,2,3,4,5,[4,4]] == [1,2,3,4,5,4,4] 변환해주는 함수
//flat() 메소드 : 배열의 뎁스를 1차 배열로 맞춰준다.
const arr14 = [1,[2,3,4],[1,3]].flat(); //한 뎁스씩 올려서 맞춰준다.
const arr15 = [1,[2,[3],4],[1,[3]]].flat(2);    //매개변수로 뎁스의 갯수를 넣어주면 적용된다.
//배열안에 배열이 있는데 한개의 배열로 작업을 해야겠죠?
//flat메소드를 이용해서 하나의 배열로 만들어주자.
const arr16 = [[1,[2,[[3,[4]]]]]].flat(Infinity); //뎁스가 몇 개든지 전부 꺼내준다.
console.log(arr14);
console.log(arr15);
console.log(arr16);
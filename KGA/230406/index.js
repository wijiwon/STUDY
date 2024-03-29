// 이터러블 이터레이터


// Set, Map
//Set은 배열에 중복되지 않는 값을 저장할 수 있다.
//중복되지 않는 유일한 값들
//배열에는 중복값이 저장될 수 있는데 Set은 중복이 안되는 값을 저장할 수 있다.

//배열은 요소의 순서에 의미가 있지만, Set은 의미가 없다.
//배열은 인덱스로 접근을 하는데 set은 접근이 안된다.

//set: ES6 값으로만 이루어져있고, 중복값은 허용하지 않는다.


//Set

const s = new Set();
console.log(s);

//요소를 추가하는 방법

// add 메서드 사용하는 방법
s.add("one");
s.add("two");
s.add("one");   //중복 값은 허용하지 않는다.
s.add("three");
console.log(s);


const arr = [1,2,3,4,5];
//생성단계에서 생성자 함수에 배열을 전달
const ss = new Set(arr);
console.log(ss);

//has: 값을 가지고 있는지 확인하는 메소드
console.log(ss.has(2));




//delete: 특정 값을 제거하는 메소드
ss.delete(2);
console.log(ss);

/*
//모든 값을 제거하는 메소드
ss.clear();
console.log(ss);
*/

//forEach는 이터러블 반복자이다.
ss.forEach(function(i){
    console.log(i);
})

//SetIterator 객체로 반환한다.
//entries: 이터러블의 이터레이터를 반환시켜준다.
const temp = ss.entries();
console.log(temp.next().value);


//Map 키와 벨류를 저장하는데
//키 값을 객체로도 저잘할 수 있다.

//Map: ES6부터 추가됐다. 키와 벨류를 한 쌍으로 저장하고 중복된 키값은 허용하지 않는다.
//iterator를 통해 Map객체 내부를 순회할 수 있다.

//Map

const map = new Map();

//값을 추가
//map은 값을 추가할 때 키와 같이 한 쌍으로 추가를 해줘야한다.

//set 메소드를 통해 키와 값을 저장
map.set("one",1);
map.set("one",3);       // 중복되는 키를 허용하지 않으므로, 마지막에 작성된 키가 선택된다.
map.set("two",2);
map.set("three",4);

console.log(map);

//키를 왜 지정할까? 키로 저장된 값을 호출하기 위해서이다.

//map은 get 이라는 메소드로 값을 호출할 수 있다.

console.log(map.get("one"));
console.log(map.get("two"));
console.log(map.get("three"));

//값을 저장하면 삭제도 해야겠지?
//delete 메소드는 삭제할 해당 키 갑슬 매개변수로 전달
map.delete("one");
console.log(map);

//사이즈 확인/ map에 저장된 요소가 몇개인지?
//size: map에 저장된 요소의 갯수를 확인할 수 있다.
console.log(map.size);

//map에 저장된 키값들을 전부 반환해주는 메소드
const keys = map.keys();
console.log(keys);

//map에 저장된 벨류들을 반환해주는 메소드
const values = map.values();
console.log(values);

//entries(): [키, 값]형태의 정보들을 모아서 MapIterator 형태로
const Iter = map.entries();
console.log(Iter);

console.log(Iter.next().value); //next로 다음요소를 출력하므로 가장 첫 번째 요소가 나온다.


//키 정보만으로 출력시키게 for of 문으로 작성해보자

for (const iterator of keys) {      //map의 키들을 반환하는 객체를 사용
    //이터레이터 요소가 끝날 때까지 반복하면서 요소를 보여준다.
    console.log(iterator);
}

//값만 보여주자.
for (const iterator of values) {    //map의 값들을 반환하는 객체를 사용
    console.log(iterator);
}

//키랑 값을 다 출력
//구조분해 할당처럼
for (const iterator of Iter) {
    console.log(iterator);
}
//이런식으로 가져올 수도 있다.
for (const [key, value] of Iter) {
    console.log(`키는 ${key}, 값은 ${value}이다아아`);
}

//forEach문으로 키와 값을 호출할 수 있다.
map.forEach(function(value,key){
    console.log(`키는 ${key}, 값은 ${value}이다.`)
})
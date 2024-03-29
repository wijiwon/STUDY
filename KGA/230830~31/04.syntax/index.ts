// javascript
let num = 20;
const str = "javascript";
const nan = NaN;
const infinity = Infinity;
const bool = true;
const nullValue = null;
const nudefinedValue = undefined;

const obj = {};
const arr = [];

const fn = (a: any) => {
  console.log(a);
};

const sum = (a: any, b: any) => {
  return a + b;
};

let any;

let unknown;

// typescript
let num2: number = 20;
const str2: string = "javascript";
const nan2: number = NaN;
const infinity2: number = Infinity;
const bool2: boolean = true;
const nullValue2: null = null;
const undefinedValue: undefined = undefined;

const obj2: object = {};
// <> : 제네릭 타입 설정. 배열의 요소가 number라고 지정. (데이터 타입을 매개변수 시킬 수 있다.)
    // ex. <number | string> : number 또는 string 타입을 사용할 수 있다는 뜻.
const arr2: Array<number | string> = ["a", 1];

// void: 함수 실행 시 비어있다는 것을 의미. 반환 값이 없는 함수라는 것이다.
// void는 생략할 수 있다.
const fn2 = (a: number): void => {
  console.log(a);
};

// 함수명 = ():return의 타입을 지정 => {}
const sum2 = (a: number, b: number): number => {
  return a + b;
};

// any: 어떤 타입이든 할당할 수 있다. 되도록 남발하지 말자. 타입의 안정성이 보장 되지 않는다.
const any2: any = "";
console.log(any2.length); // length가 있던, 없던 실행된다.

// unknown : 어떤 타입이든 할당 가능. 타입의 안정성 보장
const unknown2: unknown = "";
if (typeof unknown2 === "string") {
  console.log(unknown2.length); // 타입을 알 수 없으니 length의 여부를 알 수가 없어 조건안에서 동작이 가능하다.
}

export interface Result<R> {
  // 에러가 false이므로 Result 객체가 성공적인 결과임을 나타낸다.
  isError: false;
  value: R;
}

export interface Faillure<E> {
  // 에러가 true이므로 Faillure 객체는 실패한 결과를 나타낸다.
  isError: true;
  value: E;
}

// Failable의 타입은 Result 또는 Faillure일 수 있다.
export type Failable<R, E> = Result<R> | Faillure<E>;

/* Failable<string,number>로 넘겨줄 경우
Result<R>에는 string이 넘어가 
export interface Result<R> {
  isError: false;
  value: string;
}
이 되고,

Faillure<E>에는 number가 넘어가
export interface Faillure<E> {
  isError: true;
  value: number;
}
가 된다.
*/


// 제네릭 구조
// : Result<String>

// {isError:false, value:"원하는 타입을 받고싶어"}
// let a = (a)=>{
//     console.log(a)
// }
// a("asrd")

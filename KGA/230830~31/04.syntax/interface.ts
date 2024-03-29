// interface는 객체의 구조를 정의하는 "타입"

interface IBlock {
  id: number;
  title: string;
  content: string;
  date: number;
  like: number;
  // 객체의 구조에서 없어도 되는 구조일 경우, 해당 방법으로 정의한다.
  hit?: number;
}

const Block: IBlock = {
  id: 0,
  title: "",
  content: "",
  date: 0,
  like: 0,
  hit: 0,
};

const Block2: IBlock = {
  id: 0,
  title: "",
  content: "",
  date: 0,
  like: 0,
};

// 추상 interface
// class

// interface IProduct {
//   name: string;
//   price?: number;
// }

// implements: class에 구조가 만족하는지 여부를 체크한다.
// 상속 개념과는 다르고, 클래스에서 위에 선언한 IProduct 구조와 일치하는지만 체크한다. 
// class product implements IProduct {
//   name: string;
//   price: number;
//   constructor(name: string, price: number) {
//     this.name = name;
//     this.price = price;
//   }
// }

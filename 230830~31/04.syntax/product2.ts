// 할인
interface Discount {
  // 함수만 선언
  getDisCountPrice(price: number): number;
}

// 가격만 수정하는 할인 (고정값 할인)
class FlatDiscount implements Discount {
  private amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  getDisCountPrice(price: number): number {
    return price - this.amount;
  }
}

// 할인으로 가격 수정(퍼센트 할인)
class PercentDiscount implements Discount {
  private amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  getDisCountPrice(price: number): number {
    return price * (1 - this.amount / 100);
  }
}

// 고정값으로도 할인하고 퍼센트로도 할인하는 함수
class FlatPercentDiscount implements Discount {
  private flatAmount: number;
  private percent: number;
  constructor(flatAmount: number, percent: number) {
    this.flatAmount = flatAmount;
    this.percent = percent;
  }
  getDisCountPrice(price: number): number {
    const FlatDiscountAmount = price - this.flatAmount;
    return FlatDiscountAmount * (1 - this.percent / 100);
  }
}

// 할인의 기능에 대한 유지보수가 좋아진다.
// 다른 방식의 할인을 추가하고 싶다면, 클래스 하나만 더 추가하면 된다.

class Products {
  private name: string;
  private price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}

class ProductsDiscount {
  private product: Products;
  private discount: Discount;
  constructor(product: Products, discount: Discount) {
    this.product = product;
    this.discount = discount;
  }
  getPrice(): void {
    console.log(this.discount.getDisCountPrice(this.product.getPrice()));
  }
}

const _product = new Products("mac", 1000000);
const _product2 = new Products("window", 20000);

const productDiscount = new PercentDiscount(10);
const productDiscount2 = new FlatDiscount(1000);
const productDiscount3 = new FlatPercentDiscount(1000, 10);

const productWithDiscount = new ProductsDiscount(_product, productDiscount);
productWithDiscount.getPrice();
// 결과: 900000

const productWithDiscount2 = new ProductsDiscount(_product2, productDiscount3);
productWithDiscount2.getPrice();
// 결과: 17100
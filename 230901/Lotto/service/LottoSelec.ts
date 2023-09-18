import { LottoNums, NumRes, numberSelect } from "../interface/lotto.request";

class NumSelect implements numberSelect {
  async selec(nums: LottoNums): Promise<NumRes> {
    let arr:number[] = [];
    let arr2:number[] = [];
    for (let i = 0; i <= 45; i++) {
       arr.push(i)
    }
    for (let e = 0; e < nums.length; e++) {
        let randomIndex:number = Math.floor(Math.random() * arr.length);
        let number:number = numArr[randomIndex];
        numArr.splice(randomIndex, 1);

        num2.push(number);
        
    }
    console.log("셀렉완료");
    return { NumSelec: arr};
  }
}

export interface LottoNums {
  Numbers: number[];
  //   SelecNum: number[];
}

export interface NumRes {
  NumSelec: number[];
}

// 로또 번호 뽑기 구조정의
export interface numberSelect {
  selec(nums: LottoNums): Promise<NumRes>;
}

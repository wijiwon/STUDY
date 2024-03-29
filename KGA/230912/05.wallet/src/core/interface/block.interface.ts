export interface IBlockHeader {
  version: string;
  height: number;
  timestamp: number;
  previousHash: string;
}

export interface IBlock extends IBlockHeader {
  //  IBlockHeader 속성을 상속 받았으므로, 해당 인터페이스 속성이 들어가있는 것과 같다
  merkleRoot: string;
  hash: string;
  nonce: number;
  difficulty: number;
  data: string[];
}

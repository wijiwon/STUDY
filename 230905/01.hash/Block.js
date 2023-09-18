// 최초의 블록. 제네시스 블록
const { SHA256 } = require("crypto-js");
const merkle = require("merkle");

// 블록 헤더 클래스

// 블록의 헤더내용
// 블록의 버전
// 블록의 높이
// 블록의 생성 시간
// 이전 해시 값
// 등
class Header {
  constructor(_height, _previousHash) {
    // 블록의 버전
    this.version = Header.getVersion();
    // 블록의 높이
    this.height = _height;
    // 블록의 생성시간
    this.timestamp = Header.getTimeStamp();
    // 이전 블록의 해시 값
    // 최초 블록은 이전 블록이 없으니까 0으로 대체
    this.previousHash = _previousHash || "0".repeat(64);
  }
  // static으로 메서드 선언 하면 전역으로 사용할 수 있고
  // 이 클래스로 객체를 생성.
  // 즉 동적할당 했을 때 이 메서드가 그 객체에 생성되지 않는다.
  static getVersion() {
    return "1.0.0";
  }
  static getTimeStamp() {
    return new Date().getTime();
  }
}

// 블록 class

class Block {
  // block _header, _data 헤더 객체와 내용을 받아서 생성
  constructor(_header, _data) {
    this.version = _header.version;
    this.height = _header.height;
    this.timestamp = _header.timestamp;
    this.previousHash = _header.previousHash;
    this.data = _data;
    this.merkleRoot = Block.getMerkleRoot(_data);
    // 블록의 해시
    this.hash = Block.createBlockHash(_header, Block.getMerkleRoot(_data));
  }

  static getMerkleRoot(_data) {
    const merkleTree = merkle("sha256").sync(_data);
    return merkleTree.root();
  }
  static createBlockHash(_header, _merkleRoot) {
    // 값을 모두 배열로 가져와서
    const values = Object.values(_header);
    // console.log("values : ", values);
    // console.log("_merkleRoot : ", _merkleRoot);
    // join으로 배열을 문자열로 합치고 구분점은 빈 문자열 ""
    const data = values.join("") + _merkleRoot;
    // console.log("data : ", data);
    return SHA256(data).toString();
  }
}

// 블록을 생성 해보자
// 블록에 담을 데이터는 더미로
const data = [
  "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",
];

// 블록 헤더 객체 생성
// 첫 번째 블록 0을 주고 객체 생성
const header = new Header(0);
// version: '1.0.0',
// height: 0,
// timestamp: 1693790990464,
// previousHash: '0000000000000000000000000000000000000000000000000000000000000000',

const block = new Block(header, data);

console.log(block);
/* 결과
    Block {
      version: '1.0.0',
      height: 0,
      timestamp: 1693790990464,
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      data: [
        'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks'
      ],
      merkleRoot: 'A6D72BAA3DB900B03E70DF880E503E9164013B4D9A470853EDC115776323A098',
      hash: '2c242f284df970e25af67b84218849c0b87876f55f5a03600198c2c41941e820'
    }
*/

const header2 = new Header(1, block.hash);
const block2 = new Block(header2, ["두 번째 블록 데이터"]);
console.log(block2);
/* 결과
    Block {
      version: '1.0.0',
      height: 1,
      timestamp: 1693791261632,
      // 이전 블록의 해시 값이 들어가있다.
      previousHash: '6b746fe5cec29e9e7f9c413f815fd8f5ef42081b1c9ddb01040981ecf8324313',
      data: [ '두 번째 블록 데이터' ],
      merkleRoot: '49463C857DA98C9D7BC28531CBA08A7357D74C341FB7F249A658F182048FD7D3',
      hash: 'fdfff7a13a9c1aa6e9c9c159d8f15a729ade6675ca2d9f04ad5220919962aa47'
    }

*/

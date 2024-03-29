// 테스트 코드를 작성하면 시간이 오래걸리지만
// 코드의 품질을 좀 더 올릴 수 있다.
//  단위별로 테스트를 진행해서 디버깅을 하고 코드를 작성할 수 있기 때문에

// 1단계 코드를 2단계 코드를 실행하고 설치적으로 테스트를 우리가 진행을 해볼수가 있다.

// import Block from "@coreTransaction/block/block";
// import { GENESIS } from "@coreTransaction/config";
// import Chain from "@coreTransaction/block/chain";
// //describe:테스트 들의 그룹화 그룹을 지정할 수 있다.
// // 첫번째는 그룹의 명 이름, 어떤 테스트 그룹인지채
// // 두번째 매개변수로 테스트 들을 실행시키는 콜백함수
// // describe("block 테스트 코드 그룹", () => {
// // 하나의 테스트 단위, 첫번째 매개변수에는 테스트 이름 명
// // 두번째 매개변수는 테스트의 도앚ㄱ을 가지고있는 콜백함수
// //   it("제네시스 블록 테스트", () => {
// //     console.log(GENESIS);
// //   });
// // });

// describe("block검증", () => {
//   let newBlock: Block;
//   let newBlock2: Block;
//   let newChain: Chain;
//   let newChain2: Chain;
//   it("블록 추가", () => {
//     const data = ["임시 페페1"];
//     newBlock = Block.generateBlock(GENESIS, data, GENESIS);
//     // 블록의 난이도에 따른 마이닝을 동작해서
//     // 조건에 맞을 때 까지 연산을 반복한 뒤에 생성된 블록을 newBlock에 받아온다.
//     // 이전 블록은 GENESIS
//     const data2 = ["임시 페페 2"];
//     newBlock2 = Block.generateBlock(newBlock, data2, GENESIS);
//   });

//   it("블록 유효성 검증", () => {
//     const isValidBlock = Block.isValidNewBlock(newBlock, GENESIS);
//     if (isValidBlock.isError) {
//       // expect: toBe:값이 맞는지 확인할 때
//       // 성공한 결과가 맞는지 확인할 때 사용하는 코드
//       // true false비교해서 맞는지 확인
//       return expect(true).toBe(false);
//     }
//     expect(isValidBlock.isError).toBe(false);
//   });

//   it("블록 체인 추가", () => {
//     newChain = new Chain();
//     newChain.addToChain(newBlock);
//     console.log(newChain.get());
//     // console.log(newChain.getBlockByHash(newBlock.hash));
//   });

//   it("네트워크 체인 비교(롱기스트 체인 룰)", () => {
//     newChain2 = new Chain();
//     newChain2.replaceChain(newChain.get());
//     // console.log(newChain2.get());
//   });

//   it("이전 10번째 블록 or 최초 블록", () => {
//     // 현재 블록을 생성한다 가정하고
//     // 현재 블록이 생성된 시간이 이전10번쨰 블록으로부터 얼마나 걸렸는지
//     // 확인을 하고 블록의 정해진 생성 주기보다 빠르면 난이도를 올리고 아니면 내린다.
//     for (let i = 0; i < 80; i++) {
//       console.log(newChain.getAdjustmentBlock());
//       let block = Block.generateBlock(
//         newChain.latestBlock(),
//         [`block`],
//         newChain.getAdjustmentBlock()
//       );
//       newChain.addToChain(block);
//     }
//     // console.log(newChain.getAdjustmentBlock());
//   });
// });

// // 지갑 구성
// // 개인키 ,공개키, 서명
// //  지갑주소 /계정 만들기

// // 개인키와 공개키와 서명을 이용한 신원 인증 방식은 분산원장이라는 이해가 필요

// // 분산원장 : 장부를 모두가 관리하는것. 데이터의 합의 기술

// // crypto.elliptic,crypto-js

// // npm i -D crypto
// // npm i -D elliptic @types/elliptic
// // npm i -D crypto-js @types/crypto-js

// import { randomBytes } from "crypto";
// import elliptic from "elliptic";
// import { SHA256 } from "crypto-js";

// const ec = new elliptic.ec("secp256k1");

// // secp256k1은 비트코인과 이더리움에서 사용되는 알고리즘
// // 키 생성 및 디지털 서명 (너가 이걸 한게 맞는지 검증하기 위해 영수증),주소 생성
// // 타원 곡선의 별명

// // 전달하는 사람과 받는사람등 모든 사람들은 공통적으로 타원곡선의 한점을 알고있어야 하는데
// // 이 점을 타원곡선의 기준점 G라고 부른다.

// // 타원곡선의 기준점 좌표가 뭐냐에 따라 타원곡선에 별명을 붙여준다.
// // 비트코인과 이더리움에서 사용되는 타원곡선 별명은 secp256k1

// // y^2=x^2 + ax + b
// // 이 방정식에 만족하는 곡선
// // a가 0, b가 7 기준점 G는 x및 y좌표를 16진수로 표현한 것
// // y^2=x^3+7

// // A가 트랜잭션 만들고 서명을 만들고(영수증)
// // 본인들 볼펜이 하나씩 있어서(개인키)
// // 볼펜 준비 타원 곡선의 지정 범위내의 값으로 정한다(1~ n-1 까지의 정수 범위)(범위내의 정수).
// // secp256k1 의 n은 1.157920892373162e+77값(과학 표기법)

// // 위 수를 16진수로 변화한 값에 -1한 값이 n-1임
// //  이 범위중에 하나를 사용해야함

// // 개인키를 하나 임시로 지정을 해보면
// // 전자 서명을 만들 때
// // 2개의 서명이 필요하다.

// // 서명 r:트랜잭션을 보낼 때 개인키 처럼 정수를 뽑아서 이 값을 k라고 한다. 서명 r=k*G(기준점)
// // 서명 s: s=k^-1 ×(z+r×개인키) mod n k를 역수 계산 z+r* 게인키 나머지 n
// // k=서명 r을 만들 때 뽑은 랜덤값
// // z=만든 트랜잭션 정보
// // r=서명 r
// // 개인키 =범윙에서 지정하고 본인만 알고있는 개인키
// // mod n=n으로 나눈 나머지

// // 중요한건 서명 s를 만드는데 개인키를 사용했다는 개념

// // w 동일한 서명을 만들지 않기 위해서 임의의 값을 추가 nonce값이라 보면됨
// // U1=z*w mod n
// // U2=r * w mod n
// //  U1 *G+U2 공개키 값을 구해서 서명 r과 같은지 비교해서 검증

// // 이거를 전부 이해할 필요가 없고
// // 중요한 중심만 이해를 하면된다. 개인키로 서명을 만든거고
// // 이 서명을 가지고 공개키를 통해서 서명을 검증 할 수 있다.

// // 데이터 전송
// // 1. 트랜잭션 생성
// // 2.개인키 생성
// // 3.서명 r, 서명 s생성

// // 데이터 수신
// //  U1 *G+U2 공개키 이 식으로 값을 구해서 서명 r과 비교(검증)

// describe("지갑 만들기", () => {
//   let priveKey: string;
//   let publicKey: string;
//   let signature: elliptic.ec.Signature;

//   it("개인키 생성", () => {
//     // 2진수의 랜덤값을 만들자
//     // 16진수로 나타냄
//     priveKey = randomBytes(32).toString("hex");

//     console.log("개인키:" + priveKey);
//     // 개인키의 길이 64
//     console.log("개인키의 길이:" + priveKey.length);
//   });

//   // false 문자열 압축 여부 중요하지 않음
//   // 개인키로 공개키를 생성
//   it("공개키 생성", () => {
//     const keyPair = ec.keyFromPrivate(priveKey);
//     publicKey = keyPair.getPublic().encode("hex", false);
//     console.log("공개키:", publicKey);
//     // 공개키는 130자의 문자열
//     console.log("공개키의 길이:", publicKey.length);
//   });

//   it("서명 만들기", () => {
//     const keyPair = ec.keyFromPrivate(priveKey);
//     // 임시 트랜잭션 내용
//     const hash = SHA256("transaction data").toString();
//     // sign 서명 생성
//     signature = keyPair.sign(hash, "hex");
//     console.log("서명:", signature);
//   });
//   // r 서명,s서명
//   // BN=BigNumber 무척 큰 number타입

//   // negative: 0 =>양수

//   // words:r 서명이나 s서명의 값을 32비트 정수 배열로 표시한 값
//   // length:배열의 길이

//   // 서명: Signature {
//   //   r: BN {
//   //     negative: 0,
//   //     words: [
//   //       43348871, 20617926,
//   //       52805612, 40572145,
//   //       42203394, 50772247,
//   //       60751715, 62974710,
//   //       58451527,   423078
//   //     ],
//   //     length: 10,
//   //     red: null
//   //   },
//   //   s: BN {
//   //     negative: 0,
//   //     words: [
//   //        8906980,  2268512, 54377430, 40918456,
//   //       64234097, 46754793,  2550136,  7621258,
//   //       65804558,  1847326,        0,        0,
//   //              0,        0,        0,        0,
//   //              0,        0,        0,        0,
//   //              0,        0,        0,        0,
//   //              0,        0,        0,        0,
//   //              0,        0
//   //     ],
//   //     length: 10,
//   //     red: null
//   //   },
//   //   recoveryParam: 1
//   // }
//   it("검증하기", () => {
//     const hash = SHA256("transaction data").toString();
//     const verify = ec.verify(
//       hash,
//       signature,
//       ec.keyFromPublic(publicKey, "hex")
//     );

//     console.log("검증됨?", verify);
//   });
//   // 지갑 주소 생성
//   it("지갑 주소", () => {
//     // 계정을 만드는 방법은 만든 공개키의 값에서 26개의 문자열을 앞에서 잘라서
//     // 40자리 만큼을 남겨서 주소로 사용한다.
//     // 불필요한 부분 제거하고 앞에 0x

//     // 가독성 때문에…. 주소의 앞에는 0x붙이는 것이 일반적 (16진수)
//     const address = publicKey.slice(26).toString();
//     console.log("지갑주소:", `0x${address}`);
//   });
// });
import Block from "@coreTransaction/block/block";
import { GENESIS } from "@coreTransaction/config";
import Chain from "@coreTransaction/block/chain";
import Transaction, { Receipt } from "@coreTransaction/transaction/transaction";
import Unspent from "@coreTransaction/transaction/unspent";
import fs from "fs";
import path from "path";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";
import { TransactionRow } from "@coreTransaction/transaction/transaction.interface";
const ec = new elliptic.ec("secp256k1");

describe("Transaction", () => {
  let transaction = new Transaction();
  let unspent = new Unspent();
  // 받는사람
  const account =
    "0xf618459cac99394eb1c3ae683f017b5ded65d7bfc680d8794fc5e4c3da6e2719d04c9a72f6847e8ba6d50799e9f1b84df9e2bb7e";
  // 보내는 사람
  const sender =
    "0x2df7adb954c3aafe08e4fa97b242404d4047b7e8a7c45f64b92f9cafc31d130e4598391378f7be20b94689203e5da4c37e58debb";
  let newChain: Chain;
  let newBlock: Block;
  let signature: elliptic.ec.Signature;
  let tempTransaction: TransactionRow;

  // sender의 공개키
  let senderPublicKey: string;
  // 테스트 케이스 실행전에 실행되는 코드

  beforeEach(() => {});

  describe("createTxOut", () => {
    const account = "0".repeat(40);
    // it("txOut생성", () => {
    //   // 임시 보내는 값
    //   const amount = 40;
    //   // 트랜잭션 객체를 사용
    //   // txOut 객체 하나 생성
    //   const txOut = transaction.createTxOut(account, amount);
    //   console.log(txOut);
    //   expect(txOut.account).toBe(account);
    //   expect(txOut.amount).toBe(amount);
    // });
  });

  // 제네시스 블록 추가
  it("블록 추가", () => {
    const data = ["임시 페페1"];
    newBlock = Block.generateBlock(GENESIS, data, GENESIS);
  });

  // 해당 블록 체인에 추가
  it("블록 체인 추가", () => {
    newChain = new Chain();
    newChain.addToChain(newBlock);
    // console.log(newChain.getBlockByHash(newBlock.hash));
  });

  it("블록 채굴", () => {
    let block = Block.generateBlock(
      newChain.latestBlock(),
      [`block`],
      newChain.getAdjustmentBlock()
    );
    newChain.addToChain(block);
    // 채굴 성공했으니 보상 트랜잭션 생성 (코인 베이스 생성)
    const coinBase = transaction.createCoinBase(sender, 0);
    // 트랜잭션 생성했으니 UTXO에 저장하자.
    unspent.update(coinBase);
    console.log(unspent.unspent);
  });

  it("코인 거래", () => {
    // 보내는 사람에 해당하는 UTXO객체생성
    const senderUTXOObj = unspent.getUTXO(sender);
    const dir = path.join(__dirname, "..", "..", "data");
    const filename = path.join(dir, sender);
    const fileContent = fs.readFileSync(filename);
    const priveKey = fileContent.toString();
    const keyPair = ec.keyFromPrivate(priveKey);
    senderPublicKey = keyPair.getPublic().encode("hex", false);
    // 임시 트랜잭션 내용
    const hash = SHA256("transaction data").toString();
    // sign 서명 생성
    signature = keyPair.sign(hash, "hex");
    // 영수증 생성
    const receipt: Receipt = {
      sender: { account: sender },
      received: account,
      amount: 20,
      signature,
    };
    // 트랜잭션 풀에 추가
    tempTransaction = transaction.create(receipt, senderUTXOObj);
    console.log(transaction.getPool, "송금 시작");
  });

  it("채굴 후 account에 코인 송금", () => {
    // 블록 채굴
    let block = Block.generateBlock(
      newChain.latestBlock(),
      [`block2`],
      newChain.getAdjustmentBlock()
    );
    newChain.addToChain(block);
    const accountCoinBase = transaction.createCoinBase(
      account,
      newChain.length()
    );
    unspent.update(accountCoinBase);
    console.log(unspent.getUTXO(account));
    const hash = SHA256("transaction data").toString();
    // 서명 검증
    const verify = ec.verify(
      hash,
      signature,
      ec.keyFromPublic(senderPublicKey, "hex")
    );
    if (verify) {
      transaction.sync([tempTransaction], unspent);

      const senderObjArr = unspent.getUTXO(sender);
      console.log("보낸사람의 잔액은:", unspent.getAmount(senderObjArr));
      const accountObjArr = unspent.getUTXO(account);
      console.log("받은사람의 잔액은:", unspent.getAmount(accountObjArr));
    } else {
      throw new Error("잘못된 서명입니다!");
    }

    console.log(transaction.getPool, "송금 종료");
  });
});


// ------------------------ Version 2 ------------------------------------

// 테스트 코드를 작성하면 시간이 오래걸리지만
// 코드의 품질을 좀 더 올릴 수 있다.
//  단위별로 테스트를 진행해서 디버깅을 하고 코드를 작성할 수 있기 때문에

// 1단계 코드를 2단계 코드를 실행하고 설치적으로 테스트를 우리가 진행을 해볼수가 있다.

// import Block from "@coreTransaction/block/block";
// import { GENESIS } from "@coreTransaction/config";
// import Chain from "@coreTransaction/block/chain";
// //describe:테스트 들의 그룹화 그룹을 지정할 수 있다.
// // 첫번째는 그룹의 명 이름, 어떤 테스트 그룹인지채
// // 두번째 매개변수로 테스트 들을 실행시키는 콜백함수
// // describe("block 테스트 코드 그룹", () => {
// // 하나의 테스트 단위, 첫번째 매개변수에는 테스트 이름 명
// // 두번째 매개변수는 테스트의 도앚ㄱ을 가지고있는 콜백함수
// //   it("제네시스 블록 테스트", () => {
// //     console.log(GENESIS);
// //   });
// // });

// describe("block검증", () => {
//   let newBlock: Block;
//   let newBlock2: Block;
//   let newChain: Chain;
//   let newChain2: Chain;
//   it("블록 추가", () => {
//     const data = ["임시 페페1"];
//     newBlock = Block.generateBlock(GENESIS, data, GENESIS);
//     // 블록의 난이도에 따른 마이닝을 동작해서
//     // 조건에 맞을 때 까지 연산을 반복한 뒤에 생성된 블록을 newBlock에 받아온다.
//     // 이전 블록은 GENESIS
//     const data2 = ["임시 페페 2"];
//     newBlock2 = Block.generateBlock(newBlock, data2, GENESIS);
//   });

//   it("블록 유효성 검증", () => {
//     const isValidBlock = Block.isValidNewBlock(newBlock, GENESIS);
//     if (isValidBlock.isError) {
//       // expect: toBe:값이 맞는지 확인할 때
//       // 성공한 결과가 맞는지 확인할 때 사용하는 코드
//       // true false비교해서 맞는지 확인
//       return expect(true).toBe(false);
//     }
//     expect(isValidBlock.isError).toBe(false);
//   });

//   it("블록 체인 추가", () => {
//     newChain = new Chain();
//     newChain.addToChain(newBlock);
//     console.log(newChain.get());
//     // console.log(newChain.getBlockByHash(newBlock.hash));
//   });

//   it("네트워크 체인 비교(롱기스트 체인 룰)", () => {
//     newChain2 = new Chain();
//     newChain2.replaceChain(newChain.get());
//     // console.log(newChain2.get());
//   });

//   it("이전 10번째 블록 or 최초 블록", () => {
//     // 현재 블록을 생성한다 가정하고
//     // 현재 블록이 생성된 시간이 이전10번쨰 블록으로부터 얼마나 걸렸는지
//     // 확인을 하고 블록의 정해진 생성 주기보다 빠르면 난이도를 올리고 아니면 내린다.
//     for (let i = 0; i < 80; i++) {
//       console.log(newChain.getAdjustmentBlock());
//       let block = Block.generateBlock(
//         newChain.latestBlock(),
//         [`block`],
//         newChain.getAdjustmentBlock()
//       );
//       newChain.addToChain(block);
//     }
//     // console.log(newChain.getAdjustmentBlock());
//   });
// });

// // 지갑 구성
// // 개인키 ,공개키, 서명
// //  지갑주소 /계정 만들기

// // 개인키와 공개키와 서명을 이용한 신원 인증 방식은 분산원장이라는 이해가 필요

// // 분산원장 : 장부를 모두가 관리하는것. 데이터의 합의 기술

// // crypto.elliptic,crypto-js

// // npm i -D crypto
// // npm i -D elliptic @types/elliptic
// // npm i -D crypto-js @types/crypto-js

// import { randomBytes } from "crypto";
// import elliptic from "elliptic";
// import { SHA256 } from "crypto-js";

// const ec = new elliptic.ec("secp256k1");

// // secp256k1은 비트코인과 이더리움에서 사용되는 알고리즘
// // 키 생성 및 디지털 서명 (너가 이걸 한게 맞는지 검증하기 위해 영수증),주소 생성
// // 타원 곡선의 별명

// // 전달하는 사람과 받는사람등 모든 사람들은 공통적으로 타원곡선의 한점을 알고있어야 하는데
// // 이 점을 타원곡선의 기준점 G라고 부른다.

// // 타원곡선의 기준점 좌표가 뭐냐에 따라 타원곡선에 별명을 붙여준다.
// // 비트코인과 이더리움에서 사용되는 타원곡선 별명은 secp256k1

// // y^2=x^2 + ax + b
// // 이 방정식에 만족하는 곡선
// // a가 0, b가 7 기준점 G는 x및 y좌표를 16진수로 표현한 것
// // y^2=x^3+7

// // A가 트랜잭션 만들고 서명을 만들고(영수증)
// // 본인들 볼펜이 하나씩 있어서(개인키)
// // 볼펜 준비 타원 곡선의 지정 범위내의 값으로 정한다(1~ n-1 까지의 정수 범위)(범위내의 정수).
// // secp256k1 의 n은 1.157920892373162e+77값(과학 표기법)

// // 위 수를 16진수로 변화한 값에 -1한 값이 n-1임
// //  이 범위중에 하나를 사용해야함

// // 개인키를 하나 임시로 지정을 해보면
// // 전자 서명을 만들 때
// // 2개의 서명이 필요하다.

// // 서명 r:트랜잭션을 보낼 때 개인키 처럼 정수를 뽑아서 이 값을 k라고 한다. 서명 r=k*G(기준점)
// // 서명 s: s=k^-1 ×(z+r×개인키) mod n k를 역수 계산 z+r* 게인키 나머지 n
// // k=서명 r을 만들 때 뽑은 랜덤값
// // z=만든 트랜잭션 정보
// // r=서명 r
// // 개인키 =범윙에서 지정하고 본인만 알고있는 개인키
// // mod n=n으로 나눈 나머지

// // 중요한건 서명 s를 만드는데 개인키를 사용했다는 개념

// // w 동일한 서명을 만들지 않기 위해서 임의의 값을 추가 nonce값이라 보면됨
// // U1=z*w mod n
// // U2=r * w mod n
// //  U1 *G+U2 공개키 값을 구해서 서명 r과 같은지 비교해서 검증

// // 이거를 전부 이해할 필요가 없고
// // 중요한 중심만 이해를 하면된다. 개인키로 서명을 만든거고
// // 이 서명을 가지고 공개키를 통해서 서명을 검증 할 수 있다.

// // 데이터 전송
// // 1. 트랜잭션 생성
// // 2.개인키 생성
// // 3.서명 r, 서명 s생성

// // 데이터 수신
// //  U1 *G+U2 공개키 이 식으로 값을 구해서 서명 r과 비교(검증)

// describe("지갑 만들기", () => {
//   let priveKey: string;
//   let publicKey: string;
//   let signature: elliptic.ec.Signature;

//   it("개인키 생성", () => {
//     // 2진수의 랜덤값을 만들자
//     // 16진수로 나타냄
//     priveKey = randomBytes(32).toString("hex");

//     console.log("개인키:" + priveKey);
//     // 개인키의 길이 64
//     console.log("개인키의 길이:" + priveKey.length);
//   });

//   // false 문자열 압축 여부 중요하지 않음
//   // 개인키로 공개키를 생성
//   it("공개키 생성", () => {
//     const keyPair = ec.keyFromPrivate(priveKey);
//     publicKey = keyPair.getPublic().encode("hex", false);
//     console.log("공개키:", publicKey);
//     // 공개키는 130자의 문자열
//     console.log("공개키의 길이:", publicKey.length);
//   });

//   it("서명 만들기", () => {
//     const keyPair = ec.keyFromPrivate(priveKey);
//     // 임시 트랜잭션 내용
//     const hash = SHA256("transaction data").toString();
//     // sign 서명 생성
//     signature = keyPair.sign(hash, "hex");
//     console.log("서명:", signature);
//   });
//   // r 서명,s서명
//   // BN=BigNumber 무척 큰 number타입

//   // negative: 0 =>양수

//   // words:r 서명이나 s서명의 값을 32비트 정수 배열로 표시한 값
//   // length:배열의 길이

//   // 서명: Signature {
//   //   r: BN {
//   //     negative: 0,
//   //     words: [
//   //       43348871, 20617926,
//   //       52805612, 40572145,
//   //       42203394, 50772247,
//   //       60751715, 62974710,
//   //       58451527,   423078
//   //     ],
//   //     length: 10,
//   //     red: null
//   //   },
//   //   s: BN {
//   //     negative: 0,
//   //     words: [
//   //        8906980,  2268512, 54377430, 40918456,
//   //       64234097, 46754793,  2550136,  7621258,
//   //       65804558,  1847326,        0,        0,
//   //              0,        0,        0,        0,
//   //              0,        0,        0,        0,
//   //              0,        0,        0,        0,
//   //              0,        0,        0,        0,
//   //              0,        0
//   //     ],
//   //     length: 10,
//   //     red: null
//   //   },
//   //   recoveryParam: 1
//   // }
//   it("검증하기", () => {
//     const hash = SHA256("transaction data").toString();
//     const verify = ec.verify(
//       hash,
//       signature,
//       ec.keyFromPublic(publicKey, "hex")
//     );

//     console.log("검증됨?", verify);
//   });
//   // 지갑 주소 생성
//   it("지갑 주소", () => {
//     // 계정을 만드는 방법은 만든 공개키의 값에서 26개의 문자열을 앞에서 잘라서
//     // 40자리 만큼을 남겨서 주소로 사용한다.
//     // 불필요한 부분 제거하고 앞에 0x

//     // 가독성 때문에.... 주소의 앞에는 0x붙이는 것이 일반적 (16진수)
//     const address = publicKey.slice(26).toString();
//     console.log("지갑주소:", `0x${address}`);
//   });
// });
import Block from "@coreTransaction/block/block";
import { GENESIS } from "@coreTransaction/config";
import Chain from "@coreTransaction/block/chain";
import Transaction, { Receipt } from "@coreTransaction/transaction/transaction";
import Unspent from "@coreTransaction/transaction/unspent";
import fs from "fs";
import path from "path";
import { SHA256 } from "crypto-js";
import elliptic from "elliptic";
import { TransactionRow } from "@coreTransaction/transaction/transaction.interface";
import { randomBytes } from "crypto";
const ec = new elliptic.ec("secp256k1");

describe("Transaction", () => {
  let transaction = new Transaction();
  let unspent = new Unspent();
  // 받는사람
  let account =
    "0xf618459cac99394eb1c3ae683f017b5ded65d7bfc680d8794fc5e4c3da6e2719d04c9a72f6847e8ba6d50799e9f1b84df9e2bb7e";
  // 보내는 사람
  let sender =
    "0x2df7adb954c3aafe08e4fa97b242404d4047b7e8a7c45f64b92f9cafc31d130e4598391378f7be20b94689203e5da4c37e58debb";
  let newChain: Chain;
  let newBlock: Block;
  let signature: elliptic.ec.Signature;
  let tempTransaction: TransactionRow;

  // sender의 공개키
  let senderPublicKey: string;
  // account의 공개키
  let accountPublicKey: string;
  // 테스트 케이스 실행전에 실행되는 코드

  beforeEach(() => {});

  describe("createTxOut", () => {
    const account = "0".repeat(40);
    // it("txOut생성", () => {
    //   // 임시 보내는 값
    //   const amount = 40;
    //   // 트랜잭션 객체를 사용
    //   // txOut 객체 하나 생성
    //   const txOut = transaction.createTxOut(account, amount);
    //   console.log(txOut);
    //   expect(txOut.account).toBe(account);
    //   expect(txOut.amount).toBe(amount);
    // });
  });

  // 제네시스 블록 추가
  it("블록 추가", () => {
    const data = ["임시 페페1"];
    newBlock = Block.generateBlock(GENESIS, data, GENESIS);
  });

  // 해당 블록 체인에 추가
  it("블록 체인 추가", () => {
    newChain = new Chain();
    newChain.addToChain(newBlock);
    // console.log(newChain.getBlockByHash(newBlock.hash));
  });

  it("블록 채굴", () => {
    let block = Block.generateBlock(
      newChain.latestBlock(),
      [`block`],
      newChain.getAdjustmentBlock()
    );
    newChain.addToChain(block);
    const dir = path.join(__dirname, "..", "..", "data");
    const filename = path.join(dir, sender);
    const fileContent = fs.readFileSync(filename);
    const priveKey = fileContent.toString();
    const keyPair = ec.keyFromPrivate(priveKey);
    // 트루로 줌으로서 38자로 압축
    senderPublicKey = keyPair.getPublic().encode("hex", true);
    sender = senderPublicKey.slice(26).toString();
    // 임시 트랜잭션 내용
    const hash = SHA256("transaction data").toString();
    // sign 서명 생성
    signature = keyPair.sign(hash, "hex");
    // 채굴 성공했으니 보상 트랜잭션 생성 (코인 베이스 생성)
    const coinBase = transaction.createCoinBase(sender, 0);
    // 트랜잭션 생성했으니 UTXO에 저장하자.
    unspent.update(coinBase);
    console.log(unspent.unspent);
  });

  it("코인 거래", () => {
    // 보내는 사람에 해당하는 UTXO객체생성
    const senderUTXOObj = unspent.getUTXO(sender);
    const dir = path.join(__dirname, "..", "..", "data");
    const filename = path.join(dir, account);
    const fileContent = fs.readFileSync(filename);
    const priveKey = fileContent.toString();
    const keyPair = ec.keyFromPrivate(priveKey);
    // 트루로 줌으로서 38자로 압축
    accountPublicKey = keyPair.getPublic().encode("hex", true);
    account = accountPublicKey.slice(26).toString();

    // 영수증 생성
    const receipt: Receipt = {
      sender: { account: sender },
      received: account,
      amount: 20,
      signature,
    };
    // 트랜잭션 풀에 추가
    tempTransaction = transaction.create(receipt, senderUTXOObj);
    console.log(transaction.getPool, "송금 시작");
  });

  it("채굴 후 account에 코인 송금", () => {
    // 블록 채굴
    let block = Block.generateBlock(
      newChain.latestBlock(),
      [`block2`],
      newChain.getAdjustmentBlock()
    );
    newChain.addToChain(block);

    const accountCoinBase = transaction.createCoinBase(
      account,
      newChain.length()
    );
    unspent.update(accountCoinBase);
    console.log(unspent.getUTXO(account));
    const hash = SHA256("transaction data").toString();
    // 서명 검증
    const verify = ec.verify(
      hash,
      signature,
      ec.keyFromPublic(senderPublicKey, "hex")
    );
    if (verify) {
      transaction.sync([tempTransaction], unspent);

      const senderObjArr = unspent.getUTXO(sender);
      console.log("보낸사람의 잔액은:", unspent.getAmount(senderObjArr));
      const accountObjArr = unspent.getUTXO(account);
      console.log("받은사람의 잔액은:", unspent.getAmount(accountObjArr));
    } else {
      throw new Error("잘못된 서명입니다!");
    }

    console.log(transaction.getPool, "송금 종료");
  });
});
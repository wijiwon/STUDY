// 테스트 코드를 작성하면 시간이 오래걸리긴 하지만
// 코드의 품질을 좀 더 올릴 수 있다.

// 단위 별로 테스트를 진행해서 디버깅을 하고 코드를 작성할 수 있기 때문에
// 1 단계. 코드를 실행하고
// 2 단계. 코드를 실행하고
// 이런 방식으로 우리가 절차적으로 테스트를 진행해볼 수 있다.

import Block from "@core/block/block";
import { GENESIS } from "@core/config";
import Chain from "@core/chain/chain";
// describe: 테스트들의 그룹화. 그룹을 지정할 수 있다.
// 첫 번째 매개변수로 그룹의 명. 어떤 테스트 그룹인지 설정한다.
// 두 번째 매개변수로 테스트들을 실행시키는 콜백 함수
// describe("block 테스트 코드 그룹", () => {
//   // 테스트들의 단위를 어떻게 작성하냐
//   // 하나의 테스트 단위
//   // 첫 번재 매개변수에는 트스트 이름.
//   // 두 번째 매개변수에는 테스트의 동작을 가지고 있는 콜백 함수
//   it("제네시스 블록 테스트", () => {
//     console.log(GENESIS);
//   });

// });

// describe: 테스트 코드의 그룹 단위
describe("block 검증", () => {
  let newBlock: Block;
  let newBlock2: Block;
  let newChain: Chain;
  let newChain2: Chain;

  // it 테스트할 코드의 최소 단위
  it("블록 추가", () => {
    const data = ["Block 1"];
    newBlock = Block.generateBlock(GENESIS, data, GENESIS);
    // 블록의 난이도에 따른 마이닝을 동작해서 조건에 맞을 때까지 연산을 반복한 뒤에 생성된 블록을 newBlock에 받아온다.
    // 이전 블록은 GENESIS(최초블록)
    // console.log(newBlock);

    const data2 = ["Block 2"];
    newBlock2 = Block.generateBlock(newBlock, data2, GENESIS);
    // console.log(newBlock2);
  });

  it("블록 유효성 검증", () => {
    const isValidNewBlock = Block.isValidNewBlock(newBlock2, newBlock);
    if (isValidNewBlock.isError) {
      // expect(true).toBe(false) : 값이 맞는지 확인할 때 사용하는 코드
      // 성공한 결과가 맞는지 확인하는 코드이다.
      // true false 비교해서 맞는지 확인
      return expect(true).toBe(false);
    }
    expect(isValidNewBlock.isError).toBe(false);
  });

  it("블록 체인 추가", () => {
    newChain = new Chain();
    newChain.addToChain(newBlock);

    // console.log(newChain.get());
    // console.log(newChain.getBlockByHeight(1));
    // 블록을 생성될 때마다 해시 값이 바뀌기 때문에 이미 결과로 나온 해시값으로 확인은 어렵다.
    // console.log("해시", newChain.getBlockByHash(newBlock.hash));
  });

  it("네트워크 체인 비교(롱기스트 체인 룰)", () => {
    newChain2 = new Chain();
    newChain2.replaceChain(newChain.get());
    // console.log(newChain2.get());
  });

  it("이전 10번째 블록 or 최초 블록", () => {
    // 현재 블록을 생성한다 가정하고
    // 현재 블록이 생성된 시간이 이전 10번째 블록으로부터 얼마나 걸렸는지
    // 확인을 하고 블록의 정해진 생성 주기보다 빠르면 난이도를 올리고 아니면 내린다.
    for (let i = 0; i < 100; i++) {
      let block = Block.generateBlock(
        newChain.latestBlock(),
        ["block"],
        newChain.getAdjustmentBlock()
      );
      newChain.addToChain(block);
    }
    // console.log("newChain", newChain);
    // console.log(newChain.getAdjustmentBlock());
  });
});

//----------------0912-------------------------------------
// 지갑 구성
// 개인키, 공개키, 서명
// 지갑주소 / 계정 만들기

// 개인키와 공개키와 서명을 이용한 신원 인증 방식은 분산 원장이라는 이해가 필요하다.
// 분산원장 : 장부를 모두가 관리하는 것. 데이터의 합의 기술

// npm i -D crypto @types/elliptic elliptic @types/crypto-js crypto-js

import { randomBytes } from "crypto";
import elliptic from "elliptic";
import { SHA256 } from "crypto-js";

// secp256k1 : 비트코인과 이더리움에서 사용되는 알고리즘. 타원 곡선의 별명이다.
const ec = new elliptic.ec("secp256k1");

// 키 생성 및 디지털 서명 (네가 이걸 한게 맞는지 검증하기 위해. 영수증), 주소생성

// 전달하는 사람과 받는 사람 등 모든 사람들은 공통적으로 타원곡선의 한 점을 알고 있어야 하는데, 이 점을 타원곡선의 기준점(G)이라 한다.

// 타원 곡선의 기준점 좌표가 뭐냐에 따라 타원곡선에 별명을 붙여준다.
// 비트코인과 이더리움에서 사용되는 타원곡선의 별명은 secp256k1이다.

// y^2 = x^3 + ax + b
// 이 방정식에 만족하는 곡선
// a가 0, b가 7. 기준점 G는 x및 y좌표를 16진수로 표현한 것이다.
// 02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798

// y^2 = x^3 + 7
// a가 트랜젝션을 만들고 서명을 만들고(영수증)
// 본인들 볼펜이 하나씩 있어서(개인키)
// 볼펜을 타원 곡선의 지정 범위 내의 값으로 정한다. ( 1 ~ (n - 1) 까지의 정수 범위)(범위내의 정수)
// secp256k1의 n은 1.157920892373162e+77값이다. (과학 표기범)
// 16진수로 변환하면, FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141이다.
// FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141에서 -1 해서
// 즉, 1 ~ FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141까지의 숫자 범위중에 하나를 사용하는 것이다.
// 이 범위를 넘어가면 개인키 에러가 뜬다.

// 개인키를 하나 임시로 지정을 해보면
// FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140
// 전자 서명을 만들 때, 2개의 서명이 필요하다.
// 서명 r : 트랜젝션을 보낼 때 개인키처럼 정수를 뽑아서 이 값을 k라고 한다. 서명 r = k * G(기준점)
// 서명 s : 공식 == k⁻¹ = (z + r * private key) mod n
//// k를 역수 계산. z + r * 개인키 나머지 n
//// k = 서명 r을 만들 때 뽑은 랜덤 값
//// z = 만든 트랜젝션 정보
//// r = 서명 r
//// 개인키  = 범위에서 지정하고 본인만 알고있는 개인 키
//// mod n = n으로 나눈 나머지
// 중요한건 서명 s를 만드는데 개인키를 사용했다는 개념을 알고 있는 것이다.

// w : 동일한 서명을 만들지 않기 위해서 임의의 값을 추가한다. (nonce 값이라고 보면 된다.)
// w = s⁻¹ mod n
// U1 = z * w mod n
// U2 = r * w mod n
// U1 * G + U2 + 공개키. 값을 구해서 서명 r과 같은지 비교해서 검증한다.

// 이 내용을 전부 이해할 필요는 없다.
// 중요한 중심만 이해하면 된다.
// 개인키로 서명을 만든거고 이 서명을 가지고 공개키를 통해서 서명을 검증할 수 있다.

// 데이터 전송
// 1. 트랜젝션 생성
// 2. 개인키 생성
// 3. 서명 r, 서명 s 생성

// 데이터 수신
// 1. U1 * G + U2 + 공개키 . 이 식으로 값을 구해서 서명 r과 비교(검증)

describe("지갑 만들기", () => {
  let privKey: string;
  let PubKey: string;
  let signature: elliptic.ec.Signature;

  it("개인키 생성", () => {
    // 2진수의 랜덤 값을 만들자
    // 16진수로 나타냄
    privKey = randomBytes(32).toString("hex");
    console.log("개인키 : " + privKey);
    // 결과  개인키 : 9aab25d0cd646c7e367a445b7a913518317e27f155cdfcbd579d31ae8badb434
    // 개인키의 길이는 64
    console.log("개인키의 길이 : " + privKey.length);
    // 결과  개인키의 길이 : 64
  });

  it("공개키 생성", () => {
    const keyPair = ec.keyFromPrivate(privKey);
    // false 문자열. 압축 여부 중요하지 않음
    // 개인키로 공개키를 생성
    PubKey = keyPair.getPublic().encode("hex", false);
    console.log("키 페어 : ", keyPair);
    console.log("공개키 : ", PubKey);
    /* 결과
       공개키 :  0498c3f26e80cb8e922ffd37fcee34b998eb445d935479a6c069e3ef9db764fc3a43e2211b4a79f82dd5520a6a1eab0822fb53ac1d2963f593f057fc1f11c7afcd */
    // 공개키는 130자의 문자열
    console.log("공개키의 길이 : ", PubKey.length);
    /* 결과
       공개키의 길이 :  130 */
  });

  it("서명 만들기", () => {
    const keyPair = ec.keyFromPrivate(privKey);
    // 임시 트랜잭션 내용
    const hash = SHA256("transaction data").toString();
    // sign 서명 생성
    signature = keyPair.sign(hash, "hex");
    console.log("서명 : ", signature);
    /* 결과

    //// BN : BigNumber. 무척 큰 number 타입.
    //// negative : 양수라는 의미. 0
    //// words : r서명이나 s서명의 값을 32비트 정수 배열로 표시한 값
    //// length : 배열의 길이

      서명 :  Signature {
      r: BN {
        negative: 0,
        words: [
           3779726, 35725574,
          44349962, 24282336,
          44701986, 41482599,
          11850099, 52266407,
          30297944,  1114374
        ],
        length: 10,
        red: null
      },
      s: BN {
        negative: 0,
        words: [
          45365455,  7465147, 22076319, 24082460,
          60587035, 52444199,  7021816, 40868643,
          53267649,  2886692,        0,        0,
                 0,        0,        0,        0,
                 0,        0,        0,        0,
                 0,        0,        0,        0,
                 0,        0,        0,        0,
                 0,        0
        ],
        length: 10,
        red: null
      },
      recoveryParam: 1
    }
    */
  });

  it("검증하기", () => {
    const hash = SHA256("transaction data").toString();
    const verify = ec.verify(hash, signature, ec.keyFromPublic(PubKey, "hex"));
    console.log("검증됨?", verify);
    // 결과 : true
  });

  // 지갑주소 생성
  it("지갑 주소 생성", () => {
    // 계정을 만드는 방법은 만든 공개키의 값에서 26개의 문자열을 앞에서 잘라서
    // 40자리만큼 남겨 주소로 사용한다.
    // 불필요한 부분을 제거하고 앞에 0x를 붙인다. 가독성때문
    // 주소의 앞에는 0x를 붙이는 것이 일반적이다. (16진수의 주소다 라는 뜻)
    const addres = PubKey.slice(26).toString();
    console.log("주소 : ", `0x${addres}`);
    // 결과 :  0x253fec83bbea9b115889cf228716dd3ad7c73a692394b54d02a0a398aba499b35daf40d0e1d39292ec95d1507c88557b0b17e9a4
  });
});

// ------------------ 0918 ------------------------------------------

import Transaction from "@core/transaction/transaction";
import path from "path";
import fs from "fs";

describe("Transaction", () => {
  let transaction: Transaction;

  // beforeEach : 테스트 케이스 실행 전에 실행되는 코드
  beforeEach(() => {
    transaction = new Transaction();
  });

  describe("createTxOut", () => {
    const account = "0".repeat(40);
    it("txOut 생성", () => {
      // 임시 보내는 값
      const amount = 40;

      // 트랜잭션 객체를 사용
      // txOut객테 하나 생성
      const txout = transaction.createTxOut(account, amount);

      console.log(txout);
      expect(txout.account).toBe(account);
      expect(txout.amount).toBe(amount);
    });

    // ❗️❗️❗️❗️❗️ 작성 해놓은 베이스를 바탕으로 테스트코드를 직접 작성해보세요,,,,, ❗️❗️❗️❗️❗️
    ///// 언제 할진 몰라요,,,, 이해를 해야,,,,
    ///// 아마도 엑셀로 보여주셨던 트랜젝션 작동 예시를 테스트하면 될 듯
  });
});

// ----------------- 🍯🍯 0919 / 과제 🍯🍯 --------------------------------------
import { TransactionRow } from "@core/transaction/transaction.interface";
import Unspent from "@core/transaction/unspent";
import { Receipt } from "@core/transaction/transaction";

describe("Transaction", () => {
  let transaction = new Transaction();
  let unspent = new Unspent();
  // 받는사람
  let account =
    "0xc576893956011d7a218712eb020b5eefaaf66bf058a07cb19718ca9e60124e13b5a30e021bc5346ae9f7c4080e8b8e86a9d88f4f";
  // 보내는 사람
  let sender =
    "0x3c0bf6cfa53d37e9d7d09cbeccc6193d14ec63242161e99c8f01b3c35ad44ee04b892c92e9ede625771261903256d5f7b2a66aa8";
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
      const coinBase = transaction.createCoinbase(sender, 0);
      // 트랜잭션 생성했으니 UTXO에 저장하자.
      unspent.update(coinBase);
      console.log(unspent.getUnspentTxPool());
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
  
      const accountCoinBase = transaction.createCoinbase(
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
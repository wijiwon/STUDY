import {
  TransactionData,
  TransactionPool,
  TransactionRow,
  TxIn,
  TxOut,
  UnspentTxOut,
} from "./transaction.interface";
import { SignatureInput } from "elliptic";
import { SHA256 } from "crypto-js";
import Unspent from "./unspent";

// 보내는 사람의 객체 타입 구조 정의
class Sender {
  account: string; // 보낼 사람의 계정 주소
}

// 영수증
// 누가 누구에게 보냈는지 내용을 가지고 있는 객체 구조 정의
export class Receipt {
  sender: Sender; // 보내는 사람의 정보
  received: string; // 받는 사람의 계정
  amount: number; // 보낸 금액
  signature: SignatureInput; // 서명 정보
}

class Transaction {
  // 블록 채굴을 하면, 블록 생성 권한을 얻는다.
  // 권한을 얻었을 때 트랜잭션을 처리하는데
  // 첫 번째 트랜잭션으로 트랜젝션이 하나 추가되는데
  // 특수한 트랜잭션이 블록의 첫 번째로 추가되는데
  // 채굴한 사람의 주소, 전달되는 금액(보상)이 들어간다.

  private readonly REWARD = 50; // 코인베이스 트랜잭션의 보상
  private readonly transactionPool: TransactionPool = []; // 트랜잭션이 처리되지 않은 내용이 있는 공간.

  constructor() {}

  // 트랜잭션 목록을 확인, 조회하는 함수
  getPool() {
    return this.transactionPool;
  }

  // 트랜잭션 추가
  create(receipt: Receipt, unspentTxOuts: UnspentTxOut[]) {
    // 트랜잭션의 output 내용의 객체를 UTXO에 추가
    // 서명을 확인하고
    if (!receipt.signature) throw new Error("서명이 정상적이지 않다.");

    // 잔액 계산
    const [txIns, amount] = this.createInput(
      unspentTxOuts,
      receipt.amount,
      receipt.signature
    );

    // 출력. 트랜잭션 객체를 생성
    const txOuts = this.createOutput(
      receipt.received,
      receipt.amount,
      receipt.sender.account,
      amount
    );

    // 트랜잭션 객체 생성
    const transaction: TransactionRow = {
      txIns, // 누가 누구에게 전송한 금액의 내용이 포함되어 있고 잔액확인
      txOuts, // 최종적으로 결과물. 누구의 주소에 얼마가 포함되는지 객체가 생성
    };

    // 트랜잭션 객체의 해시 값 추가
    transaction.hash = this.serilizeRow(transaction);

    this.transactionPool.push(transaction);
    // 바로 트랜잭션이 처리되는게 아니라 pool에 담기고
    // 대기상태로 있다가 블록이 채굴되면 검증하고 승인이 되면 트랜잭션을 처리하고
    // 하나의 블록에 여러 개의 트랜잭션 내용을 기록한다.

    return transaction;
  }

  createInput(
    myUnspentTxOuts: UnspentTxOut[],
    receiptAmount: number,
    signature: SignatureInput
  ): [TxIn[], number] {
    // 0보다 큰지 비교
    let targetAmount = 0;

    const txins = myUnspentTxOuts.reduce(
      (acc: TxIn[], UnspentTxOut: UnspentTxOut) => {
        // 현재 순회하는 요소(본인의 미사용 객체. UTXO)의
        // 잔액, 포함된 트랜잭션 hash값, 포함된 트랜잭션 index를 구조 분해 할당
        const { amount, txOutId, txOutIndex } = UnspentTxOut;

        // 검증(혹시나 그럴일은 없겠지만 0을 보내면)
        if (targetAmount >= receiptAmount) return acc;

        targetAmount += amount;
        acc.push({ txOutIndex, txOutId, signature });
        return acc;
      },
      // type 추론이 안됨. TxIn[] 타입인지
      // TxIn[] 타입일거야. 여기는 날 믿고 추론해
      [] as TxIn[]
    );

    return [txins, targetAmount];
  }

  createOutput(
    received: string,
    amount: number,
    sender: string,
    sendAmount: number
  ) {
    // amount : 받은 사람의 금액 (얼마를 받았는지)
    // sendAmount : 보낸 사람의 잔액
    console.log(received, amount, sender, sendAmount);
    const txouts: TxOut[] = [];
    // 객체 생성
    // txouts 받는사람, 얼마를 받았는지
    txouts.push({ account: received, amount });

    // 잔액은 보낸 사람으로 다시 새로운 객체를 만들어서 목록에 추가
    if (sendAmount - amount > 0) {
      txouts.push({ account: sender, amount: sendAmount - amount });
    }

    // 잔액을 비교해서 검증
    const outAmount = txouts.reduce(
      (acc, txout: TxOut) => acc + txout.amount,
      0
    );
    console.log(outAmount, sendAmount);

    // 전체 금액 검증
    // 내가 가지고 있는 금액에서 보낸 값과 내가 다시 남은 잔액이 총 금액과 같은지 검증
    if (outAmount !== sendAmount) throw new Error("금액이 안 맞음 오류");

    return txouts;
  }

  serializeTxOut(txOut: TxOut): string {
    // 출력 트랜잭션을 문자열로 반환
    const { account, amount } = txOut;
    const text = [account, amount].join("");
    return SHA256(text).toString();
  }

  serializeTxIn(txIn: TxIn): string {
    // 입력 트랜잭션을 문자열로 반환
    const { txOutIndex } = txIn;
    const text = [txOutIndex].join("");
    return SHA256(text).toString();
  }

  // 트랜잭션을 직열화한 문자열로 반환
  serializeTx<T>(data: T[], callback: (item: T) => string) {
    // 데이터를 배열로 문자열 반환
    // acc는 초기 값이 "" 배열 수만큼 반복시키면서 callback함수 반환값 문자열을 계속 더해서 긴 문자열 반환
    return data.reduce((acc: string, item: T) => acc + callback(item), "");
  }

  // 트랜잭션 row를 전부 직렬화 해서 반환할 함수
  serilizeRow(row: TransactionRow) {
    const { txIns, txOuts } = row;
    // 직렬화된 문자열로 변환
    const txOutsText = this.serializeTx<TxOut>(txOuts, (item) =>
      this.serializeTxOut(item)
    );

    const txInsText = this.serializeTx<TxIn>(txIns, (item) =>
      this.serializeTxIn(item)
    );

    return SHA256(txOutsText + txInsText).toString();
  }

  // 블록을 채굴하면 채굴자가 블록의 채굴 보상을 받는데
  // 특수한 트랜잭션이 블록의 첫 번째로 기록된다.
  // 코인베이스 트랜잭션
  //// 채굴자의 주소와 보상이 제공된다.
  createCoinbase(account: string, latestBlockHeight: number) {
    // 채굴자일 경우 트랜잭션 해시가 없고 서명도 없기 때문에 txOutIndex의 매개변수만 전달
    const txin = this.createTxIn(latestBlockHeight + 1);
    const txout = this.createTxOut(account, this.REWARD);
    return this.createRow([txin], [txout]);
  }

  createRow(txIns: TxIn[], txOuts: TxOut[]) {
    // txIns, txOuts
    // 문자열로 변환. 해시값으로 반환
    const transactionRow = new TransactionRow();
    transactionRow.txIns = txIns;
    transactionRow.txOuts = txOuts;
    transactionRow.hash = this.serilizeRow(transactionRow);
    return transactionRow;
  }

  createTxIn(
    txOutIndex: number,
    txOutId?: string,
    signature?: SignatureInput
  ): TxIn {
    // 단순하게 입력 트랜잭션 생성
    const txIn = new TxIn();
    txIn.txOutIndex = txOutIndex;
    txIn.txOutId = txOutId;
    txIn.signature = signature;
    return txIn;
  }

  createTxOut(account: string, amount: number): TxOut {
    // console.log("지갑주소 뭔데??????", account, account.length)
    // 받는 계정 주소랑 출력 트랜잭션 생성
    if (account.length !== 40) throw new Error("정상적인 주소가 아님");
    const txout = new TxOut();
    txout.account = account;
    txout.amount = amount;
    return txout;
  }

  // 트랜잭션 pool 처리
  // update(transaction: TransactionRow) {
  //   // 트랜잭션 처리 하면 해당 트랜잭션 지움
  //   const findCallback = (tx: TransactionRow) => transaction.hash == tx.hash;
  //   const index = this.transactionPool.findIndex(findCallback);
  //   if (index !== -1) this.transactionPool.splice(index, 1);
  // }

 // // 트랜잭션 목록 업데이트
  // sync(transactions: TransactionData) {
  //   if (typeof transactions === "string") return;

  //   transactions.forEach(this.update.bind(this));
  // }
// ----------------- 🍯🍯무헌쓰🍯🍯 ----------------------------------------------------------
  //   트랜잭션 pool 업데이트
  update(transaction: TransactionRow, utxo: Unspent) {
    const findCallBack = (tx: TransactionRow) => transaction.hash == tx.hash;
    const index = this.transactionPool.findIndex(findCallBack);
    if (index !== -1) {
      console.log("업데이트 완");
      // 트랜잭션이 대기목록에서 사라졌으므로 해당하는 UTXO데이터를 업데이트
      utxo.update(this.transactionPool[index]);

      this.transactionPool.splice(index, 1);
    }
  }

  //   트랜잭션 목록 업데이트
  sync(transaction: TransactionData, utxo: Unspent) {
    if (typeof transaction === "string") {
      return;
    }

    transaction.forEach((transaction: TransactionRow) => {
      this.update(transaction, utxo);
    });
  }
}

export default Transaction;

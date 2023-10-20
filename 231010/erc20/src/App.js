import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/ERC20.json";

const App = () => {
  const {user, web3} = useWeb3();
  const [ERC20Contract, setERC20Contract] = useState(null);
  const [network, setNetwork] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [token, setToken] = useState("0");

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  useEffect(()=>{
    if (web3 !== null) {
      if (ERC20Contract) return;
      // 네트워크에서 컨트랙트 조회해서 인스턴스로 가져옴
      // const ERC20 = new web3.eth.Contract(abi, "0x324042249835aB51cc69b033b2bc480Fb551B9BC", {data : ""});
      const ERC20 = new web3.eth.Contract(abi, "0xf2A0c776Fb427b1380b358E58cBCa99A072c58e7", {data : ""});
      setERC20Contract(ERC20);
    }

  }, [web3]);

  useEffect(()=>{
    // 이벤트 등록. 네트워크가 변경되면 발생하는 이벤트 등록
    window.ethereum.on("chainChanged", (chainId) => {
      console.log("네트워크가 변경되었음", chainId);
      // if (chainId === "0x539") { // ganache
      if (chainId === "0xaa36a7") { // 세폴리아
        getAccounts();
      }
    });

    // 지갑이 변경되면 실행할 이벤트 등록
    window.ethereum.on("accountsChanged", (account) => {
      console.log("지갑이 변경되었음", account);
      getAccounts();
    });

    if (!network) return;
    // 컨트랙트 인스턴스가 있으면 실행시키지 말고
    // 네트워크가 정상적일때 실행시켜도 되겠다
    getAccounts();

  }, [network]);

  const switchNet = async () => {
    // 해당 네트워크가 맞는지 요청
    // 메타마스크로 요청
    // wallet_switchEthereumChain == 매개변수로 전달한 chainid가 맞는지 확인
    // 0x539 1337 우리가 지정한 가나쉬 chainid
    // 디폴트 1337
    // const net = await window.ethereum.request({jsonrpc : "2.0", method : "wallet_switchEthereumChain", params : [{chainId : "0x539"}]});
    const net = await window.ethereum.request({jsonrpc : "2.0", method : "wallet_switchEthereumChain", params : [{chainId : "0xaa36a7"}]});
    // net값이 null이면 해당 네트워크에 있다는 뜻
    setNetwork(net || true);
  }

  // 전달받은 매개변수(지갑주소)의 잔액을 보여주는 함수
  const getToken = async (account) => {
    if (!ERC20Contract) return;
    let result = web3.utils.toBigInt(await ERC20Contract.methods.balanceOf(account).call()).toString(10);
    result = await web3.utils.fromWei(result, "ether");

    return result;
  }

  // 잔액 보여주는 함수
  const getEther = async (account) => {
    let result = web3.utils.toBigInt(await window.ethereum.request({jsonrpc : "2.0", method : "eth_getBalance", params : [account]}));
    result = await web3.utils.fromWei(result, "ether");

    return result;
  }

  // 메타마스크의 모든 지갑을 보여줄 함수
  const getAccounts = async () => {
    const accounts = await window.ethereum.request({
      method : "eth_requestAccounts"
    });

    // 배열을 돌릴건데 map에서 일어나는 promise 반환값을 다 처리하고 넘어가고 싶음
    // Promise.all 요청이 다 끝나면 진행

    const accountsCom = await Promise.all(
      accounts.map(async (account) => {
        const token = await getToken(account);
        const ether = await getEther(account);
        return {account, token, ether};
      })
    );

    // accountsCom = [{account : "0x2323323232", token : 1000}, {account : "0x2323323232", token : 1000}, {account : "0x2323323232", token : 1000}];
    setToken(await getToken(accounts[0]));
    setAccounts(accountsCom);
  }

  // 지갑에서 다른 지갑으로 토큰 전송할 함수
  const transfer = async () => {

    await ERC20Contract.methods.transfer(value.replaceAll(" ", ""), await web3.utils.toWei(value2, "ether")).send({
      from : user.account,
    });
    getAccounts();

  }

  if (user.account === null) return "지갑 연결";
  return (
    <>
      <button onClick={switchNet}>토큰 컨트랙트 연결</button>
      <div>지갑 주소 : {user.account}</div>
      <h2>토큰 보유량 : {token}</h2>
      {accounts.map((item, index)=> (
        <div key = {index}>
          계정 : {item.account} : 토큰량 : {item.token} 잔액 : {item.ether}
        </div>
      ))}
      <div>
        <label>누구한테? (지갑주소)</label>
        <input onChange={(e)=>{setValue(e.target.value)}}></input>
        <label>보낼 토큰 개수</label>
        <input onChange={(e)=>{setValue2(e.target.value)}}></input>
        <button onClick={transfer}>보내기</button>
      </div>
    </>
  )
}

export default App;

// 계정들의 이더리움 잔액도 보여주는 함수를 만들어서 보여주자

// 리믹스로 세폴리아에 배포해보기
// 지금 가나쉬 네트워크로 배포한 거 세폴리아 테스트 네트워크에 배포하고
// 네트워크 아이디 부분 세폴리아 네트워크에 연결할 수 있게 수정 (네트워크 아이디 해시값 확인해서)
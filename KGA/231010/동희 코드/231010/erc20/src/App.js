import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/ERC20.json";

const App = () => {
  const { user, web3 } = useWeb3();
  const [ERC20Contract, setERC20Contract] = useState(null);
  const [network, setNetwork] = useState(null);
  const [token, setToken] = useState("0");

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  // 빈배열안에 지갑들 객체 넣어줄거임
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    if (web3 !== null) {
      if (ERC20Contract) return;
      // 네트워크에서 컨트랙트 조회해서 인스턴스 가져옴
      // Contract(abi, ca : remix 에서 deployed Contracts 부분이 ca 임)
      const ERC20 = new web3.eth.Contract(
        abi,
        "0xf65092D14B7e0643B979eC6Dc6646121876383fb",
        { data: "" }
      );
      // setERC20Contract 에 담아놓기
      setERC20Contract(ERC20);
    }
  }, [web3]);

  useEffect(() => {
    window.ethereum.on("chainChanged", (chainId) => {
      console.log("네트워크가 변경됐음!", chainId);
      if (chainId == "0x539") {
        // 가나시 네트워크일경우!!
        getAccount();
      }
    });

    // 지갑이 변경되면 실행할 이벤트 등록
    // 이벤트함수 메타마스크에서 확인가능 (accountsChangedaccountsChanged)
    window.ethereum.on("accountsChanged", (account) => {
      console.log("지갑이 변경됐어!");
      getAccount();
    });

    if (!network) return;
    getAccount();
    // 컨트랙트 인스턴스가 있으면 실행시키지 말고
    // 네트워크가 정상적일때 실행 시켜도 되겠다
  }, [network]);

  const switchNet = async () => {
    // 해당 네트워크가 맞는지 요청
    // 메타마스크로 요청
    const net = await window.ethereum.request({
      jsonrpc: "2.0",
      // 🚀아래 method 는 매개변수로 전달한 chainid가 맞는지 확인함
      method: "wallet_switchEthereumChain",
      // 🚀 0x539 1337 우리가 지정한 가나쉬 chianid
      // 디폴트 1337
      params: [{ chainId: "0x539" }],
    });
    // net 값이 null 이면, 해당 네트워크에 있다는 뜻
    setNetwork(net || true);
  };

  // 전달받은 매개변수(지갑주소)를 받고, 잔액을 보여주는 함수
  const getToken = async (account) => {
    if (!ERC20Contract) return;
    let result = web3.utils
      .toBigInt(await ERC20Contract.methods.balanceOf(account).call())
      .toString(10);
    result = await web3.utils.fromWei(result, "ether");
    return result;
  };
  // 메타마스크에 모든 지갑을 보여줄 함수
  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // accounts의 component :
    // 배열을 돌릴건데 map 에서 일어나는 Promise 반환값을 다 처리하고 넘어가고싶어
    // 🚀 Promise.all : 요청이 다 끝나면 진행

    const accountsCom = await Promise.all(
      accounts.map(async (account) => {
        const token = await getToken(account);
        return { account, token };
      })
    );
    // 지갑 length 확인
    // console.log("accountsCom", accountsCom);

    // 지갑들이 이렇게 담겨있을거임 accountsCom = [{account : "0x190481092890", token: 10000},{accout:""}]
    setToken(await getToken(accounts[0]));

    setAccounts(accountsCom);
  };

  // 지갑에서 다른 지갑으로 토큰 전송할 함수
  const transfer = async () => {
    await ERC20Contract.methods
      .transfer(
        // 🚀removeAll 로 예외처리 : (" "공백있으면 -> ""없애기)
        value.removeAll(" ", ""),
        await web3.utils.toWei(value2, "ether")
      )
      .send({
        from: user.account,
      });
    // 끝나면 잔액 render
    getAccount();
  };

  if (user.account === null) return "지갑 연결하셈";
  return (
    <>
      <button onClick={switchNet}>토큰 컨트랙트 연결</button>
      <div>지갑 주소 : {user.account}</div>
      <h2>토큰 보유량 : {token}</h2>
      {accounts.map((item, index) => (
        <div key={index}>
          계정 : {item.account} : 토큰량 : {item.token}
        </div>
      ))}
      <div>
        <label>누구한테 보낼거임?(지갑주소)</label>
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <label>보낼 토큰 갯수</label>
        <input
          onChange={(e) => {
            setValue2(e.target.value);
          }}
        ></input>
        <button onClick={transfer}>보내기</button>
        과제 : 이더리움 잔액도 보여주는 함수를 만들자! 지금 가나쉬 네트워크로
        배포한거 세폴리아 테스트 네트워크에 배포하고 네트워크 아이디 부분
        세폴리아 네트워크에 연결할수있게 수정 (네트워크 아이디 해시값
        확인할수있죠?)
      </div>
    </>
  );
};
export default App;

import { useEffect, useState } from "react";
import Web3 from "web3";
const useWeb3 = () => {
  const [user, setUser] = useState({
    account: "",
    balance: "",
  });

  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      // 연결된 지갑 가져오기
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async ([data]) => {
          // cd erc20
          // npm i web3
          // web3 설치후 Import 로 가져오기

          const web3Provider = new Web3(window.ethereum);
          // 받은 data 매개변수 첫번째
          setUser({
            account: data,
            balance: web3Provider.utils.toWei(
              await web3Provider.eth.getBalance(data),
              "ether"
            ),
          });

          setWeb3(web3Provider);
          // 🧐 오늘 할 내용
          // 1. 웹 메타마스크 지갑 다뜰거고
          // 2. 그 지갑에 있는 토큰 량을 다 보여줄거고
          // 3. 컨트랙트를 배포한 네트워크가 맞는지 or 네트워크 변경할수있게 함수실행
          // 4. 지갑을 바꾸면 바꾼 지갑 내용으로 브라우저에 보일수있게
        });
    } else {
      alert("메타마스크 설치해주세요");
    }
  }, []);
  return { user, web3 };
};

export default useWeb3;

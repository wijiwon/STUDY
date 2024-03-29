// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

// js class 에서 인터페이스 상속을 한 것 처럼 여기서도 상속을하는데, implement 처럼

// is 라는 구문을 사용해서 상속하기
contract ERC20 is IERC20{
  //ERC20 토큰의 규약 (상태변수로 빼놓는 작업)

  // 토큰의 이름 (풀네임), 토큰을 받을 상태변수
  string public name;

  // 토큰의 심볼(토큰의 단위를 표현) ETH 등 단위를 표현하는거
  string public symbol;

  // 토큰의 소수점 자리 (얼만큼할지, 기본 소수점 자리는 18단위임)
  // : 소수점 18자리 까지 설정함
  uint8 public decimals = 18;

  // 토큰의 총 발행량 (총 몇개를 발행 했는지)
  // 이미 선언이 되어있는 함수를 interface 함수는 virtual 함수로 되어 있는데
  // 기본 선언하면 virtual 함수임
  // 🚀 override : 상속 받은 함수를 새로 정의해서 사용(덮어쓰기)
  uint public override totalSupply;

  // 컨트랙트 배포자 but 현재버전엔 상속받아서 사용함 => 이 컨트랙트에 작성할 필요가 없어서 없앰
  address private owner;

    // 🚀 string memory : 메모리 영역에서 사용을하고 해제 시킨다는 구문
    // uint 는 byte가 정해져있는 양을 사용하는건데, 문자열은 동적으로 변할수있어서 이런 변수들은 memory를 다 붙인다!

  // 생성자 함수 : 컨트랙트 배포자가 실행을 할 함수
  constructor(string memory _name, string memory _symbol, uint256 _amount){

    // 어떤 이름의 토큰을 발행하고 있고
    // 어떤 단위 심볼을 사용할지, 처음에 총 발행량을 얼마나 설정할지에 대한 내용을 생성자에 작성해줄거임

    // HeeToken 이라는걸 만들어줄거임
    owner = msg.sender;
    name = _name; // HeeToken
    symbol = _symbol; // STK
    // 토큰 발행할때 사용할 메서드 작성
    // _amount * (10 ** uint256(decimals))

    // mint 함수 작성후 작성된 코드
    // 최초발행토큰량
    mint(_amount * (10 ** uint256(decimals)));
  }

  // balance 토큰을 누가 얼마만큼 가지고 있는지의 내용을 담을 객체
  mapping(address => uint) public balances;
  /*
  balances 라는 변수명 안에 객체가 들어있음
  객체안에 누군가가 얼마의 토큰을 가지고 있는지 담겨있음
    balances = {
      0x1111111111111111 : 100,
      0x1111111111145111 : 100,
    }
   */

   // 토큰의 권한을 위임 받은 내용이 들어있는 객체 : 객체안에 객체
  mapping(address => mapping(address => uint))public override allowance;
    /*
  객체안에 객체 : 위임을한 객체가 들어있음
    allowance = {
      0x1111111111111111 : {
        0x1111111111145111 :100
        },
    }
   */

   // 잔액을 조회하는 함수
  function balanceOf(address account)external view override returns(uint){
    // account key로 value를 반환받기위해서
    return balances[account];
  }

  // 다른지갑으로 잔액을 전달하는 함수
  function transfer(address to, uint amount) external override returns(bool){
    // 1. 전달하는 사람의 잔액이 감소해야함 :
    // msg.sender : 이걸 실행시킨 사람
    // -= amount : 자신의 잔액에서 돈이 빠지고
    balances[msg.sender] -= amount;
    // 2. 전달받는 사람의 잔액이 증가 :
    // 받는사람한텐 돈이 빠진만큼 더해주기
    balances[to] += amount;
    // 3. transfer 이벤트를 실행시킨 로그를 트랜잭션에서 확인:
    // emit : socket 에서도 사용한 구문, 이 구문을 사용해서 이벤트 함수 실행
    emit Transfer(msg.sender, to, amount);

    // 4. 성공은 true 가 반환되는 함수, 실패는 false 
    return true;
  }

  // 토큰의 소유권을 위임하는 함수
  function approve(address spender, uint amount) external override returns (bool){
    // 소유권을 추가
    // 보낸사람이 얼마나 보냈는지
    allowance[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    // 성공은 true, 실패는 false 가 반환되는 함수
    return true;
  }
  // 위임한거에서 권한을 얻은 제 3자가 토큰을 보낼때 사용하는 함수
  function transferFrom(address spender,address to, uint amount)external override returns(bool){
    // 이 사람이 권한을 가지고 있는지 토큰의 양을 검사하고
    require(allowance[spender][msg.sender] >= amount);

    allowance[spender][msg.sender] -= amount;
    balances[spender] -= amount;
    balances[to] += amount;
    return true;
  }

  // 토큰을 발행하는 함수
  // 발행량
  // 🚀internal : contract 내부에서만 실행시킬 함수
  // mint 을 하면 Total 개수가 쌓이고
  function mint(uint amount) internal{
    balances[msg.sender] += amount;
    totalSupply += amount;
  }
  // 🫡 mint 함수 작성후 48줄로 이동해서 코드 추가

  // 토큰을 소각 시키는 함수 :
  // 토큰이 너무 많이 발행하면 가치가 하락하기때문에 소각시킴
  function burn(uint amount)external {
    balances[msg.sender] -= amount; // 누가, 토큰의 개수를 빼고
    totalSupply -= amount; // 소각시킨 양도 빼주기
  }

}
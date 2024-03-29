// 라이센스 작성
// SPDX-License-Identifier: MIT
// 버전정보 작성
pragma solidity ^0.8.19;

// "오픈제플린"은 솔리디티 기반의 스마트 컨트랙트를 개발할때 사용하는 표준 프레임워크
// 안전성과 컨트랙트를 개발할때 표준 토큰 규약을 지키면서 빠르게 구현할 수 있다
// 오픈제플린에서 제공하는 ERC20 인터페이스
interface IERC20 {
  // 🚀 public vs external
  // 🚀 external : public은 내부에서도 접근가능한데, 얘는 외부에서 접근이 가능한 접근 제한자
  // external은 외부의 EOA 또는 CA에서 호출이 가능 (즉 외부에서 호출 가능)
  // 내부에서 접근 X
  // public 보다 external 이 gas 가 저렴해서 사용한다(절약가능) :
  // public 은 함수의 변수를 메모리에 복사하고 사용해서 메모리의 용량읠 사용함 but external은 복사를하지 않고 내부에서 복사를 해서 메모리에 값을 사용하느냐 or CALLDATA를 직접 읽어서 사용하느냐의 차이

  // 🚀 public : 내부, 외부 접근 다 가능
  // 조회함수니까 : view

  // 토큰의 현재 총 발행량을 조회할 수 있는 함수
  function totalSupply() external view returns(uint);

  // 전달받은 매개변수(계정 주소) 토큰의 잔액을 조회하는 함수 
  function balanceOf(address account) external view returns(uint);

  // 계정에서 토큰을 다른 계정으로 전달하는 함수
  function transfer(address to, uint amount) external returns(bool);

  // 소유권을 위임받은 토큰을 관리하는 공간
  // : 얼마나 위임을 받았는지
  function allowance(address owner, address spender) external returns(uint);

  /* ex) 
  {지갑주소 : 100개,200개가 들어있음}
  {0x11111111 : 100, 0x1111111 :200}
  {주소 : 사람한테 50보냄}
  {0x11111111 : {0x111111112: 50}}
*/
  // 소유권을 제3자에게 위임하는 함수
  function approve(address spender, uint amount) external returns (bool);
  // 소유권을 관리하는 토큰을 보내는 함수, 위임받은 소유권이 있는지 확인을 하고 보내는 함수
  function transferFrom(
  address spender,
  address to,
  uint amount
  ) external returns (bool);

  // event 함수를 작성해서 함수에서 실행을 시키면 이더스캔 같은 사이트에서 로그 확인을 할 수 있다
  // 트랜잭션 내용에 로그를 만들어서 확인할 수 있다
  // Transfer 함수를 실행했을때 이벤트 함수를 실행해서, 발생하는 이벤트를 트랜잭션 로그에 확인 해볼 수 있다
  event Transfer(address form, address to, uint value);

  // approve 함수가 실행됐을때, 이벤트 함수도 실행해서 로그를 확인해볼수있다
  // 누가 누구한테 얼마 보냈는지 확인
  event Approval(address owner, address spender, uint value);
}
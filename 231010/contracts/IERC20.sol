// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// 오픈제플린은 솔리디티 기반의 스마트 컨트랙트를 개발할 때 사용하는 표준 프레임워크
// 안정성과 컨트랙트를 개발할 때 표준 토큰 규약을 지키면서 빠르게 구현할 수 있다.

// 오픈제플린에서 제공하는 ERC20 인터페이스

interface IERC20 {
    // 토큰의 현재 총 발행량을 조회할 수 있는 함수
    // public과 다른 점 external은 외부에서 접근이 가능한 접근 제한자
    // external은 외부의 EOA 또는 CA에서 호출 가능(즉 외부에서 호출 가능)
    // 내부에서 접근 X
    // public은 내부 외부 접근 다 가능

    // public보다 gas가 더 저렴

    // public은 함수의 변수를 메모리에 복사하고 사용하는데
    // external은 복사하지 않음. 내부에서 복사를 해서 메모리에 값을 사용하느냐 아니면 CAllDATA를 직접 읽어서 사용하느냐의 차이

    // external을 사용하면 gas를 절약할 수 있음
    function totalSupply() external view returns(uint);

    // 전달받은 매개변수(계정 주소) 토큰의 잔액을 조회하는 함수
    function balanceOf(address account) external view returns(uint);

    // 계정에서 토큰을 다른 계정으로 전달하는 함수
    function transfer(address to, uint amount) external returns(bool);

    // 소유권을 위임받은 토큰을 관리하는 공간
    function allowance(address owner, address spender) external returns(uint);

    // {0x1111111111111 : 100, 0x111111111111112 : 200}

    // {0x1111111111111 : {0x11111111111112 : 50}} 0x1111111111111이 0x11111111111112에게 50만큼 위임?

    // 소유권을 제 3자에게 위임하는 함수
    function approve(address spender, uint amount) external returns(bool);

    // 소유권을 관리하는 토큰을 보내는 함수. 위임받은 소유권이 있는지 확인하고 보내는 함수
    function transferFrom(address spender, address to, uint amount) external returns (bool);

    // event 함수를 작성해서 함수에서 실행시키면 이더스캔 같은 사이트에서 로그 확인을 할 수 있음
    // 트랜잭션 내용의 로그를 만들어서 확인할 수 있다?
    // Transfer 함수를 실행했을때 이벤트 함수를 실행해서 발생하는 이벤트를 트랜잭션 로그에 확인해볼수있다.
    event Transfer(address from, address to, uint value);

    // approve 함수가 실행됐을때 이벤트 함수도 실행을 해서 로그를 확인해볼수있다.
    event Approval(address owner, address spender, uint value);


}
// SPDX-License-Identifier: MIT

// Solidity 컴파일러 버전을 지정. Solidity 0.8.13 버전에서 작성
pragma solidity ^0.8.13;

// Counter 라는 스마트 컨트랙트를 정의
contract Counter{
    // value : 256비트, 부호 없는 정수형 상태 변수를 선언
    uint256 value;

    // 컨트랙트의 생성자
    constructor(){}

    // setValue : _256비트, 부호 없는 정수형 매개변수 _value를 받는다.
    // public : 이 함수가 누구에게나 호출이 가능함을 명시한다.
    function setValue(uint256 _value) public{
        // 상태 변수 변경
        value = _value;
    }
    
    // getValue : 상태변수 value의 값을 읽는 함수이다.
    // public view : 이 함수는 상태를 읽기만 하고 변경하지 않는다.
    // returns(uint256) : 이 함수는 부호 없는 정수형 값을 반환한다.
    function getValue()public view returns(uint256){
        return value;
    }
}
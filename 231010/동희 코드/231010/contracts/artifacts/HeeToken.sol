// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; 

// import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HeeToken is ERC20 {
    // 상속 받은 부모 생성자 호출 ERC20 생성자 호출
    constructor() ERC20("HeeToken", "HTK") {
        // 상속받은 ERC20생성자 함수 내용 추가
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}

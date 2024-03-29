// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./myNFT.sol";

contract saleNFT {
    // 상호작용할 CA의 주소가 필요하다.
    MyNFT public _nft;
    // _nft에 상호작용할 컨트랙트를 담을 것이다.

    constructor(address _nftCA) {
        _nft = MyNFT(_nftCA);
        // 상호작용할 CA 인스턴스를 생성한다.
    }

    function _saleNFTMint(string url){
        // CA에서 CA로 메시지 전송. 메서드 실행
        _nft.minting(url);
    }

    // 판매에 대한 내용의 함수
    // NFT의 판매 권한을 받는. myNFT에서 보낸 메시지를 받아 NFT 권한을 위임받는다.
    function setApprovalForAll() public{
        // (컨트랙트 배포자, 해당 컨트랙트의 주소, 위임받음을 ture처리)
        _nft.setAppAll(msg.sender, address(this), true);
    }
}
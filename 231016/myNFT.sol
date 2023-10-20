// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721{
    uint256 tokenID = 1;
    mapping (address  => string[]) tokenHashs;
    mapping (uint256 => string) tokens;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol){}


    function minting(string memory _jsonhash) public{
        tokenHashs[msg.sender].push(_jsonhash);
        tokens[tokenID] = _jsonhash;
        _mint(msg.sender, tokenID);
        tokenID += 1;
    }

    function tokenURI(uint256 _tokenId) public view override returns(string memory){
        // 아까 배포한 json 파일
        // _requireOwned(_tokenId);

        string memory baseURI = _baseURI();
        return string.concat(baseURI, tokens[tokenID]);
    }

    function _baseURI() internal view override returns(string memory){
        return "https://black-elderly-wolverine-685.mypinata.cloud/ipfs/";
    }

    function viewTokens() public view returns (string[] memory){
        string[] memory allTokens = new string[](tokenID);
        for (uint256 i = 0; i < tokenID; i++) {
            allTokens[i] = tokens[i];
        }
        return allTokens;
    }

    // NFT에 관련된 메서드
    // NFT의 판매 권한을 줄 함수. saleNFT에 메시지를 보내 NFT 권한을 위임한다.
    function setAppAll(address owner, address operator, bool approved) public {
        _setApprovalForAll(owner, operator, approved);
    }
}
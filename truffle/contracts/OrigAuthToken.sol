// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OrigAuthToken is ERC721URIStorage {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenId;

    //관리자 계정
    address public admin;
    //ID 존재 여부 확인
    mapping(string => bool) private _accountExists;

    //user별 NFT조회
    mapping(address=>uint256[]) private _ownerNFTs;

    //계정 관리
    mapping(string => Account) private _account;

    //퍼블릭/프라이빗 키 관리하는 구조체
    struct Account {
        address publickey;
        bytes32 privatekey;
    }
    
    //민팅시 token id돌려주는 이벤트
    event minting (address _to, uint _tokenId);

    constructor() ERC721("OrigAuth", "ORIG") {
        admin = msg.sender;
    }

    //ether 보내기
    function sendEther(address payable _to) public payable {
        require(msg.value > 0, "Send some ether");
        require(_to != address(0), "Invalid address");

        // 이더 전송
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
    //NFT 민팅
    function mintNFT(address to, string memory _tokenURI) public{
        _tokenId.increment();
        uint256 newTokenId = _tokenId.current();
        _mint(to, newTokenId);        
        //metadata가 저장된 ipfs값
        _setTokenURI(newTokenId, _tokenURI);
        _ownerNFTs[to].push(newTokenId);
        emit minting(msg.sender, newTokenId);
    }

    //NFT조회
    function getMyNFTs() public view returns(uint256[] memory, string[] memory){
        uint256[] memory tokenIds = _ownerNFTs[msg.sender];
        string[] memory tokenURIs = new string[](tokenIds.length);

        for(uint256 i=0; i < tokenIds.length; i++){
            tokenURIs[i]=tokenURI(tokenIds[i]);
        }
        return (tokenIds, tokenURIs);
    }
    //계정 존재 여부 확인하는 함수
    function isExist(string memory userId) public view returns(bool){
        return _accountExists[userId];
    }

    //user 계정 생성
    function createAccount(string memory userId, address _publickey, bytes32 _privatekey) public {
        //계정 존재 여부 체크
        require(!_accountExists[userId], "Account already exists");
        //없으면 계정 생성 
        _account[userId] = Account({publickey: _publickey, privatekey:_privatekey});
        
        _accountExists[userId] = true;
        
    }

    
    //user계정 조회
    function getAccount(string memory userId) public view returns(Account memory){
        return _account[userId];
    }

    //잔액조회
    function getBalance(address account) public view returns (uint) {
        return account.balance;
    }
    //전송
    function nftTransfer(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId);
        //from의 nft배열에서 tokenId를 제거
        uint256[] storage nftIds = _ownerNFTs[from];
        for(uint256 i=0; i<nftIds.length; i++){
            if(nftIds[i] == tokenId){
                nftIds[i] =nftIds[nftIds.length-1]; //마지막 요소로 대체
                nftIds.pop(); //배열 길이를 줄임
                break;
            }
        }

        _ownerNFTs[to].push(tokenId);
    }
}
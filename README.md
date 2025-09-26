# NFT 민팅 및 전송 서비스

이 프로젝트는 NFT(Non-Fungible Token, 대체 불가능 토큰)를 활용하여 디지털 자산의 소유권을 안전하게 발행(Mint)하고, 전송(Transfer)할 수 있는 시스템입니다.
**Ganache**를 사용해 가스비 없이 테스트할 수 있으며, **Web3.js와 Express.js**로 블록체인과 연동합니다.

---

## 주요 기능

- **카카오 로그인** 후 지갑 연동
- **NFT 발행**: 사용자가 이미지 기반 NFT를 생성
- **NFT 전송**: 발행한 NFT를 다른 사용자에게 블록체인 네트워크를 통해 전송
- **디지털 소유권 관리**: NFT를 통해 디지털 자산의 소유권을 투명하게 관리

---

## 기술 스택

- Frontend: HTML, JavaScript, Web3.js
- Backend: Node.js, Express.js
- Blockchain: Solidity, Truffle, Ganache
- Storage: IPFS (Pinata)

---

## 폴더 구조

📂 nft-mint-transfer/  
│── 📁 ganache/ # Local blockchain environment setup  
│ ├── 📄 .gitpod.Dockerfile #  
│ ├── 📄 .gitpod.yml  
│ ├── 📄 package.json  
│── 📄 server.js  
│  
│── 📁 html/ # Frontend HTML files  
│ ├── 📄 dashboard.html  
│ ├── 📄 login.html  
│ ├── 📄 minting.html  
│ ├── 📄 transfer.html  
│  
│── 📁 js/ # Frontend JavaScript logic  
│ ├── 📁 abi/  
│ ├── 📄 OrigAuthToken.js  
│ ├── 📄 OrigAuthToken.json  
│ ├── 📄 minting.js  
│ ├── 📄 token.js  
│ ├── 📄 transfer.js  
│ ├── 📄 web3Setup.js  
│ ├── 📄 OrigAuthToken.json  
│  
│── 📁 truffle/ # Smart contract and blockchain interactions  
│ ├── 📁 contracts/  
│ ├── 📄 OrigAuthToken.sol  
│ ├── 📁 migrations/  
│ ├── 📄 1_deploy_contract.js  
│ ├── 📁 scripts/  
│ ├── 📄 getMyNFTs.js  
│ ├── 📄 mintNFT.js  
│ ├── 📄 package.json  
│ ├── 📄 truffle-config.js  
│  
│── 📁 tatent/ # Patent and documentation  
│ ├── 📄 특허출원서.pdf # Patent application document (Korean)  
│ ├── 📄 NFT 기반 디지털 소유권 관리.pdf  
│  
│── 📄 presentation.pptx # Project presentation file  
│── 📄 README.md

---

## **참고**

- 특허 출원서 및 발표 자료는 `patent/`, `presentation.pptx`에서 확인할 수 있습니다.
- 본 프로젝트는 학습 및 연구 목적이며, 실제 서비스 환경에서는 보안 및 추가 검토가 필요합니다.
- 이 저장소에는 API Key 등 민감 정보가 제외되어 있습니다. 직접 실행하려면 각자 환경 변수와 키를 설정해야 합니다.


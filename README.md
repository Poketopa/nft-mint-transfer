# 🏆 NFT Mint & Transfer Service

### 🚀 Blockchain-based NFT Minting & Transfer Platform

This project enables users to **mint (create) and transfer NFTs (Non-Fungible Tokens)** using blockchain technology.  
To eliminate gas fees, a **private blockchain network using Ganache** is set up.  
The system utilizes **Web3.js and Express.js** to bridge the client-side interface with blockchain transactions.

---

## **📌 Project Overview**

- Users can log in via **Kakao API** and link their accounts to a blockchain wallet.
- **NFTs can be minted and transferred** through the Web UI.
- **Ganache** provides a **gas-free private blockchain environment** for testing.
- **Web3.js & Express.js** facilitate **client-to-blockchain communication**.
- **Pinata API (IPFS)** stores NFT images and metadata securely.
- **Truffle** is used to **compile and deploy smart contracts**.

---

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

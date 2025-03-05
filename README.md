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

nft-mint-transfer/
│── ganache/ # Local blockchain environment setup
│ ├── .gitpod.Dockerfile # Dockerfile for Gitpod environment
│ ├── .gitpod.yml # Gitpod configuration file
│ ├── package.json # Node.js package configuration for Ganache
│── server.js # Express.js API server
│
│── html/ # Frontend HTML files
│ ├── dashboard.html # NFT dashboard
│ ├── login.html # Login page (Kakao API authentication)
│ ├── minting.html # NFT minting page
│ ├── transfer.html # NFT transfer page
│
│── js/ # Frontend JavaScript logic
│ ├── abi/ # Smart contract ABI files
│ ├── minting.js # Handles NFT minting logic
│ ├── OrigAuthToken.json # Smart contract ABI for interaction
│ ├── token.js # Pinata API token management
│ ├── transfer.js # Handles NFT transfer logic
│ ├── web3Setup.js # Web3.js setup and contract connection
│
│── truffle/ # Smart contract and blockchain interactions
│ ├── contracts/ # Solidity smart contracts
│ ├── migrations/ # Deployment scripts
│ ├── scripts/ # Custom scripts for contract interaction
│ ├── package.json # Truffle dependencies and configuration
│ ├── truffle-config.js # Truffle configuration file
│
│── tatent/ # Patent and documentation
│ ├── 특허출원서.pdf # Patent application document (Korean)
│ ├── NFT 기반 디지털 소유권 관리 시스템 및 그 방법\_가출원.pdf # NFT-based digital ownership management document
│
│── presentation.pptx # Project presentation file
│── README.md # Project documentation

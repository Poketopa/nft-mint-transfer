const fs = require('fs');
const contractABI = JSON.parse(fs.readFileSync('../build/contracts/OrigAuthToken.json')).abi;
require('dotenv').config();
const { Web3 } = require('web3');

const contractAddress = process.env.CONTRACT_ADDRESS;
const web3 = new Web3(new Web3.providers.HttpProvider('http://61.32.68.66:80'));
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getMyNFTs() {
  const isValid = await contract.methods.getMyNFTs().call({ from: process.env.TEST_PUBLICKEY });

  console.log(isValid);
}

getMyNFTs();

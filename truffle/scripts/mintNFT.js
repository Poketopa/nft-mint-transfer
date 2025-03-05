const fs = require("fs");
const contractABI = JSON.parse(
  fs.readFileSync("../build/contracts/OrigAuthToken.json")
).abi;
require("dotenv").config();
const { Web3 } = require("web3");

const contractAddress = process.env.CONTRACT_ADDRESS;
const web3 = new Web3(new Web3.providers.HttpProvider("http://61.32.68.66:80"));
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function mintNFT(_to, _tokenURI) {
  let signedTx = await web3.eth.accounts.signTransaction(
    {
      from: _to,
      to: contractAddress,
      gas: 2000000,
      gasPrice: web3.utils.toWei("10", "gwei"), // 가스 가격 설정
      data: contract.methods.mintNFT(_to, _tokenURI).encodeABI(),
    },
    process.env.TEST_PRIVATEKEY
  );

  console.log("signedTx > ", signedTx);
  console.log("------------------------------------------ ");

  await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction.toString("hex"))
    .on("receipt", console.log);
}
mintNFT(process.env.TEST_PUBLICKEY, "");

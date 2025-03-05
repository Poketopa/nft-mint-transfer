import { abi as contractABI } from "../js/abi/OrigAuthToken.js";

const RPC_URL = "http://61.32.68.66:80";

export const web3 = new Web3(RPC_URL);

export const contractAddress = "0x89Ae677A08f63c271499e0d2588C0A5C45B3D29f";

export const contract = new web3.eth.Contract(contractABI, contractAddress);

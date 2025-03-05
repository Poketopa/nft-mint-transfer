const express = require("express");
const Web3 = require("web3");
const bodyParser = require("body-parser");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const app = express();
app.use(bodyParser.json());

const account = web3.eth.accounts.privateKeyToAccount("0xYOUR_PRIVATE_KEY");
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

app.post("/deploy", async (req, res) => {
  const { abi, bytecode, args } = req.body;
  try {
    const contract = new web3.eth.Contract(abi);
    const deployTx = contract.deploy({ data: bytecode, arguments: args });

    const deployedContract = await deployTx.send({
      from: account.address,
      gas: 1500000,
      gasPrice: "30000000000",
    });

    res.send({ contractAddress: deployedContract.options.address });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Contract deployment failed", details: error });
  }
});

app.post("/call", async (req, res) => {
  const { contractAddress, abi, methodName, methodArgs } = req.body;
  try {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const result = await contract.methods[methodName](...methodArgs).call();
    res.send({ result });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Contract method call failed", details: error });
  }
});

app.listen(3000, () => {
  console.log("API server listening on port 3000");
});

const origAuthToken = artifacts.require("OrigAuthToken");

module.exports = function (deployer) {
  deployer.deploy(origAuthToken);
};

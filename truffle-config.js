const PrivateKeyProvider = require("truffle-privatekey-provider");
var privKeyrinkeby = "<YOUR-PRIVATE-KEY-HERE>";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new PrivateKeyProvider(privKeyrinkeby, "https://rinkeby.infura.io/v3/0cd25f13fa42452181039a22154c025a"),
      gasPrice: 50000000000, // 50 gwei,
      gas: 4600000,
      network_id: 4,
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
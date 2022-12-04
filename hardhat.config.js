require("hardhat-gas-reporter")
require("dotenv").config()
require('@nomiclabs/hardhat-ethers');


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const KOVAN_RPC_URL =
  process.env.KOVAN_RPC_URL ||
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY =
  process.env.PRIVATE_KEY 
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    kovan: {
      url: KOVAN_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 42,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/GYEylhdfWC99ZDwIo4GLV0BWMHLr2DGd`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
}

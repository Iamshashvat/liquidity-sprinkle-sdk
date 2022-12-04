require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
// Any file that has require('dotenv').config() statement
// will automatically load any variables in the root's .env file.
import "./scripts/deploy";
require("dotenv").config();

const chainIds = {
    ganache: 5777,
    goerli: 5,
    hardhat: 7545,
    kovan: 42,
    mainnet: 1,
    rinkeby: 4,
    bscTestnet: 97,
    bsc: 56,
    ropsten: 3,
    mumbai: 80001,
    avalanche: 43114,
    polygon: 137,
    fuji: 43113,
    arbitrum: 42161,
    arbitrum_rinkeby: 421611,
    fantom_testnet: 4002,
    optimism: 10,
    optimism_kovan: 69,
    fantom: 250,
    harmony: 1666600000,
    cronos: 25,
    aurora: 1313161554
};

// Ensure that we have all the environment variables we need.
const mnemonic = process.env.MNEMONIC;
const LOCALHOST_MNEMONIC = process.env.LOCALHOST_MNEMONIC;
if (!mnemonic) {
    throw new Error("Please set your MNEMONIC in a .env file");
}

const infuraApiKey = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
    throw new Error("Please set your INFURA_API_KEY in a .env file");
}

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
    let url = "";
    url = "https://" + network + ".infura.io/v3/" + infuraApiKey;
    if (network == "polygon") {
        url = "https://polygon-mainnet.g.alchemy.com/v2/hCz4x1BLpLDP3NoomXivfaqND37qCSgS";
    } else if (network == "mumbai") {
        url = "https://polygon-rpc.com";
    } else if (network == "bsc") {
        url = "https://bsc-dataseed.binance.org/";
    } else if (network == "avalanche") {
        url = "https://api.avax.network/ext/bc/C/rpc";
    } else if (network == "arbitrum") {
        //42161
        url = "https://arbitrum-mainnet.infura.io/v3/fd9c5dbc69de41048405e7072cda9bf9";
    } else if (network == "optimism") {
        //10
        url = "https://mainnet.optimism.io";
    } else if (network == "fantom") {
        //250
        url = "https://rpc.ankr.com/fantom";
    } else if (network == "mainnet") {
        //1
        url = "https://mainnet.infura.io/v3/0d73cc5bbe184146957a9d00764db99f";
        // console.log(url, process.env.PRIVATE_KEY)
    } else if (network == "harmony") {
        //1
        url = "https://api.harmony.one";
        // console.log(url, process.env.PRIVATE_KEY)
    } else if (network == "aurora") {
        //1
        url = "https://aurora-mainnet.infura.io/v3/fd9c5dbc69de41048405e7072cda9bf9";
    } else if (network == "cronos") {
        url = "https://cronos.w3node.com/a9bec89cdf9b13a5610c9723e1416f5ac888ef987d6a46fceaa4962710488ac7/api";
    } else if (network == "goerli") {
        url = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    }
    return {
        // accounts: {
        //   count: 10,
        //   mnemonic,
        //   path: "m/44'/60'/0'/0",
        //   initialIndex:2,
        // },
        accounts: [`${process.env.PRIVATE_KEY}`],
        chainId: chainIds[network],
        url
        // gasPrice: network == "bsc" ? 20000000000 : 200000000000,
        // gasPrice: 100_000_000_000
    };
}

const config = {
    defaultNetwork: "hardhat",
    gasReporter: {
        currency: "USD",
        enabled: process.env.REPORT_GAS ? true : false,
        excludeContracts: [],
        src: "./contracts"
    },
    networks: {
        hardhat: {
            accounts: {
                mnemonic
            },
            chainId: chainIds.hardhat,
            mining: {
                auto: true,
                interval: 100
            }
        },
        ganache1_multinode: {
            chainId: 6545,
            url: "http://3.7.30.69:7545/",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        ganache2_multinode: {
            chainId: 7545,
            url: "https://devnet-ganache2.routerprotocol.com/",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        ganache3_multinode: {
            chainId: 8545,
            url: "https://devnet-ganache3.routerprotocol.com/",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        ganache1: {
            chainId: 7545,
            url: "http://localhost:7545/",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        ganache1_local_docker: {
            chainId: 7545,
            url: "http://host.docker.internal:7545/",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        ganache2_local_docker: {
            chainId: 8545,
            url: "http://host.docker.internal:8545/",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        ganache2: {
            chainId: 8545,
            url: "http://localhost:8545",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        ropsten: {
            saveDeployments: true,
            accounts: [`${process.env.PRIVATE_KEY}`],
            chainId: chainIds["ropsten"],
            url: "https://ropsten.infura.io/v3/74c8b06d2481408c86fe936c11657def"
        },
        rinkeby: {
            saveDeployments: true,
            accounts: {
                initialIndex: 0,
                mnemonic
                // path: "m/44'/60'/0'/0",
            },
            chainId: chainIds["rinkeby"],
            url: "https://rinkeby.infura.io/v3/" + infuraApiKey + ""
        },
        bscTestnet: {
            saveDeployments: true,
            accounts: {
                initialIndex: 0,
                mnemonic
                // path: "m/44'/60'/0'/0",
            },
            chainId: chainIds["bscTestnet"],
            url: "https://data-seed-prebsc-1-s1.binance.org:8545"
        },
        polygonMumbai: {
            saveDeployments: true,
            accounts: {
                initialIndex: 0,
                mnemonic
                // path: "m/44'/60'/0'/0",
            },
            chainId: chainIds["mumbai"],
            url: "https://polygon-mumbai.g.alchemy.com/v2/BZ0E4emoGVd4i2_R6I_BcEbqAecpv7Gf"
        },

        kovan: getChainConfig("kovan"),
        polygon: getChainConfig("polygon"),
        bsc: getChainConfig("bsc"),
        avalanche: getChainConfig("avalanche"),

        arbitrum: getChainConfig("arbitrum"),
        fantom: getChainConfig("fantom"),
        optimism: getChainConfig("optimism"),
        mainnet: getChainConfig("mainnet"),
        harmony: getChainConfig("harmony"),
        aurora: getChainConfig("aurora"),
        cronos: getChainConfig("cronos"),
        goerli: getChainConfig("goerli")
    },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test"
        // deploy: "./deploy",
        // deployments: "./deployments",
        // imports: "./imports",
    },
    solidity: {
        version: "0.8.16",
        settings: {
            evmVersion: "berlin",
            metadata: {
                // Not including the metadata hash
                // https://github.com/paulrberg/solidity-template/issues/31
                bytecodeHash: "none"
            },
            // You should disable the optimizer when debugging
            // https://hardhat.org/hardhat-network/#solidity-optimizer-support
            optimizer: {
                enabled: true,
                runs: 50
            }
        }
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5"
    },
    etherscan: {
        apiKey: {
            polygonMumbai: "YBTWTE1HPM8G48435PW911BJWQ954BPP1F",
            ropsten: "FF9TZXKT2JWZ68M2EJH1FGCX13IB7ZKPUZ"
        }
    }
};

export default config;

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

## Setup

To run any command you need to have .env in your local
```
cp .env.test .env
```
then update the value in .env file.


## Compile Project
```
yarn install
npx hardhat compile
```

## Run Tests

Use the following commands to run the test cases:

```
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
```

## Contract deployment on test/live network
npx hardhat deploy --network polygonMumbai --connext <connext-address> --router <router-address>
```

### connext contract info on diffent chains
connext 0xa2F2ed226d4569C8eC09c175DDEeF4d41Bab4627 mumbai
connect 0x0C70d6E9760DEE639aC761f3564a190220DF5E44 optimism-goerali
connext 0xb35937ce4fFB5f72E90eAD83c10D33097a4F18D2 goerali

Name            Chain ID    Domain ID   Status
Goerali         5           1735353714  ✅
Optimism-Goerli 420         1735356532  ✅
Mumbai          80001       9991        ✅


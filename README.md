# Liquidity Sprinkle Sdk

Sprinkle sdk is a money lego used to create cross chain disperse with swap functionality.

![connext](https://user-images.githubusercontent.com/21297284/205472623-83057aac-217d-41a6-9add-a0c2312eea73.jpg)

## Please use the following instruction to setup, test and deploy the project

## Send Request to the Connext Cross-Chain

To call Sprinkle disperse function, the user contract needs to do the following step:-

```sh
#  contract address variable
ISprinker public sprinkerContract;

# User/ Application contract constructor
constructor(address _sprinkerContract) {
    sprinkerContract = ISprinker(_sprinkerContract);
}

function disperseLiquidity(
    uint32[] memory destinationDomain,
    uint256[] memory amount,
    address[] memory toToken,
    address[] memory recepient,
    address sourceAsset,
    uint256 relayerFee
) public payable {
    # implement the business logic
    sprinkerContract.disperse(
        destinationDomain, 
        amount,
        toToken,
        recepient,
        sourceAsset,
        relayerFee
    );
}
```

## Handle Request from the Connext


```sh
function xReceive(
        bytes32 _transferId,
        uint256 _amount,
        address _asset,
        address _originSender,
        uint32 _origin,
        bytes memory _callData
    ) external returns (bytes memory){
    # implement the business logic
}
```

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


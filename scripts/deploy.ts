const hre = require("hardhat");

const main = async () => {
    const SourceGreeting = await hre.ethers.getContractFactory("HelloSource");
    const sourceGreetingContract = await SourceGreeting.deploy("0x0C70d6E9760DEE639aC761f3564a190220DF5E44");
    await sourceGreetingContract.deployed();
    console.log("Source Contract deployed to:", sourceGreetingContract.address);

    // const DestGreeting = await hre.ethers.getContractFactory('HelloSource');
    // const destGreetingContract = await DestGreeting.deploy("0x0C70d6E9760DEE639aC761f3564a190220DF5E44");
    // await destGreetingContract.deployed();
    // console.log("Destination Contract deployed to:", destGreetingContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();

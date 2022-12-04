import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

// npx hardhat deploy:Gateway --network <network> --chaintype 0 --valsetnonce 1 --validators "0x7Ed86B49Bca319Eb84832478b192eA9D343286EF,0xC59fCc5F9F141177fdA2B4b9855D2D80DD550368,0xE87f1e53492eBC32448627FB397cB7e3569cEB5f" --powers "1431655765,1431655765,1431655765"

task("deploy")
    .addParam("connext", "connext contract address")
    .addParam("router", "router contract address")
    .setAction(async function (_taskArguments: TaskArguments, hre) {
        const network = await hre.hardhatArguments.network;
        if (network == undefined) {
            return;
        }
        console.log(network);

        const connextAddress = _taskArguments.connext;
        const routerAddress = _taskArguments.router;

        const Sprinker = await hre.ethers.getContractFactory("Sprinker");
        const sourceGreetingContract = await Sprinker.deploy(connextAddress, routerAddress);
        await sourceGreetingContract.deployed();
        console.log("Source Contract deployed to:", sourceGreetingContract.address);

    })

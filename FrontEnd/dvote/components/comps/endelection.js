import abi from "@/contracts/abi";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function endelectionfn(walletData, contractAddress) {
  console.log(`\n=======================================`);
  console.log(`- Executing stop election...🟠`);

  // ETHERS PROVIDER AND SIGNER
  const provider = walletData[1];
  const signer = provider.getSigner();

  // EXECUTE THE SMART CONTRACT
  let txHash;
  let finalStatus;
  try {
    // EXECUTE CONTRACT FUNCTION
    const gasLimit = 100000;
    const myContract = new ethers.Contract(contractAddress, abi, signer);

    // CHECK SMART CONTRACT STATE

    const intialelectionstatus = await myContract.electionStatus({
      gasLimit: gasLimit,
    });
    console.log(`- intialelectionstatus: ${intialelectionstatus}`);
    const endElectionTx = await myContract.endElection({
      gasLimit: gasLimit,
    });
    const endElectionrx = await endElectionTx.wait();
    txHash = endElectionrx.transactionHash;

    // CHECK SMART CONTRACT STATE AGAIN
    await delay(5000); // DELAY TO ALLOW MIRROR NODES TO UPDATE BEFORE QUERYING

    finalStatus = await myContract.electionStatus({ gasLimit: gasLimit });
    console.log(`- finalElectionsStatus  is: ${finalStatus}`);
    console.log(`- Election Ended. Transaction hash: \n${txHash} ✅`);
  } catch (executeError) {
    console.log(`- ${executeError.message.toString()}`);
  }

  return [txHash, finalStatus];
}

export default endelectionfn;

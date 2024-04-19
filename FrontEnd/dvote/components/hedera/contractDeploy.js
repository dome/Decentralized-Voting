import abi from "@/contracts/abi.js";
import bytecode from "@/contracts/bytecode";
import { ContractFactory } from "ethers";

const deleteAllCandidateData = async () => {
  try {
    const response = await fetch("/api/deleteCandidate", {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("All candidate data deleted successfully");
    } else {
      console.error("Failed to delete candidate data:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting candidate data:", error);
  }
};

async function contractDeployFcn(walletData) {
  console.log(`\n=======================================`);
  console.log(`- Deploying smart contract on Hedera...🟠`);

  // DELETE ALL CANDIDATE DATA
  try {
    await deleteAllCandidateData(); // Call the deleteAllCandidateData function
  } catch (deleteError) {
    console.error("- Error deleting candidate data:", deleteError);
  }

  // ETHERS PROVIDER AND SIGNER
  const provider = walletData[1];
  const signer = provider.getSigner();

  // DEPLOY SMART CONTRACT
  let contractAddress;
  try {
    const gasLimit = 4000000;

    const myContract = new ContractFactory(abi, bytecode, signer);
    const contractDeployTx = await myContract.deploy({ gasLimit: gasLimit });
    const contractDeployRx = await contractDeployTx.deployTransaction.wait();
    contractAddress = contractDeployRx.contractAddress;
    console.log(`- Contract deployed to address: \n${contractAddress} ✅`);
  } catch (deployError) {
    console.log(`- ${deployError.message.toString()}`);
  }
  return contractAddress;
}
export default contractDeployFcn;

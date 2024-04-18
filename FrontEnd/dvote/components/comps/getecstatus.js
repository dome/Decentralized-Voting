import abi from "@/contracts/abi";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Button } from "@chakra-ui/react";

const ElectionStatusModal = ({ contractAddress, walletData }) => {
  const toast = useToast();

  const handleElectionS = async () => {
    try {
      const provider = walletData[1];
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      const electionStatus = await contract.electionStatus();

      const toastStatus = electionStatus ? "success" : "error";
      const toastDescription = electionStatus
        ? "Election is active"
        : "Election is not active";

      toast({
        title: "Election Status",
        description: toastDescription,
        status: toastStatus,
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {
      // Handle error
      console.error("Error fetching details:", error);
      toast({
        title: "Election Status",
        description: `the error is ${error}`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  return (
    <>
      <Button
        className="font-mono mt-2 "
        bgColor="zinc"
        border="1px"
        borderColor="zinc"
        color="black"
        onClick={handleElectionS}
      >
        Election Status
      </Button>
    </>
  );
};

export default ElectionStatusModal;

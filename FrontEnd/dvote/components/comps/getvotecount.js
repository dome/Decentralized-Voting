import { useState } from "react";
import abi from "@/contracts/abi";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const VCModal = ({ contractAddress, walletData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [candidateAddress, setCandidateAddress] = useState("");
  const toast = useToast();

  const handleGetVCount = async () => {
    try {
      const provider = walletData[1];
      const signer = provider.getSigner();
      const gasLimit = 100000;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const voteCount = await contract.getVoteCount(
        candidateAddress,

        { gasLimit: gasLimit }
      );

      // Handle success
      console.log("Candidate's latest vote count is", voteCount.toString());
      toast({
        title: "Candidate's Vote count",
        description: `this candidate got total ${voteCount.toString()} vote`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {
      // Handle error
      console.error("Error fetching details:", error);
      toast({
        title: "Candidate's Vote count",
        description: `error is ${error}`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    }

    onClose(); // Close the modal
  };

  return (
    <>
      <Button
        bgColor="transparent"
        border="1px"
        borderColor="#ADFF00"
        color="#808080"
        onClick={onOpen}
      >
        Get VoteCount
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Candidate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Candidate Address</FormLabel>
              <Input
                value={candidateAddress}
                onChange={(e) => setCandidateAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" onClick={handleGetVCount}>
              Get VoteCount
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VCModal;

import { useState } from "react";
import abi from "@/contracts/abi";
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

const VoteModal = ({ contractAddress, walletData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [candidateAddress, setCandidateAddress] = useState("");

  const handleVoteCandidate = async () => {
    try {
      const provider = walletData[1];
      const signer = provider.getSigner();
      console.log(signer);
      const gasLimit = 100000;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      await contract.vote(candidateAddress, { gasLimit: gasLimit });

      // Handle success
      console.log("Voted successfully");
    } catch (error) {
      // Handle error
      console.error("Error while giving votes:", error);
    }

    onClose(); // Close the modal
  };

  return (
    <>
      <button className="zinc-button font-mono" onClick={onOpen}>
        Vote
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vote a candidate</ModalHeader>
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
            <Button colorScheme="gray" onClick={handleVoteCandidate}>
              Cast Vote
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VoteModal;

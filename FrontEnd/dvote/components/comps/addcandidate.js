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

const AddCandidateModal = ({ contractAddress, walletData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [candidateAddress, setCandidateAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");

  const handleAddCandidate = async () => {
    try {
      const provider = walletData[1];
      const signer = provider.getSigner();
      const gasLimit = 1000000;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      await contract.addCandidate(
        candidateAddress,
        candidateName,
        candidateParty,
        { gasLimit: gasLimit }
      );

      // Handle success
      console.log("Candidate added successfully");
    } catch (error) {
      // Handle error
      console.error("Error adding candidate:", error);
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
        Add Candidate
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
            <FormControl>
              <FormLabel>Candidate Name</FormLabel>
              <Input
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Party Name</FormLabel>
              <Input
                value={candidateParty}
                onChange={(e) => setCandidateParty(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddCandidate}>
              Add Candidate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCandidateModal;

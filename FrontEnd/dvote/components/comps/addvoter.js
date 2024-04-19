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

const AddVoterModal = ({ contractAddress, walletData }) => {
  const [voterAddress, setvoterAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddVoter = async () => {
    try {
      const provider = walletData[1];
      const signer = provider.getSigner();
      const gasLimit = 100000;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      await contract.addVoter(voterAddress, { gasLimit: gasLimit });

      // Handle success
      console.log("voter added successfully");
    } catch (error) {
      // Handle error
      console.error("Error adding candidate:", error);
    }

    onClose(); // Close the modal
  };

  return (
    <>
      <button className="zinc-button font-mono" onClick={onOpen}>
        Add Voter
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Voter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Voter Address</FormLabel>
              <Input
                value={voterAddress}
                onChange={(e) => setvoterAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" onClick={handleAddVoter}>
              Add Voter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddVoterModal;

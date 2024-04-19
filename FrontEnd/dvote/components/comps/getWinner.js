import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import abi from "@/contracts/abi";
import { ethers } from "ethers";

function WinnerComponent({ contractAddress, walletData }) {
  const [candidateData, setCandidateData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [winningCandidate, setWinningCandidate] = useState(null);
  const toast = useToast();

  const fetchCandidateData = async () => {
    try {
      const response = await fetch("/api/getCandidate");
      if (response.ok) {
        const data = await response.json();
        setCandidateData(data);
      } else {
        console.error("Failed to fetch candidate data:", response.statusText);
        setCandidateData([]); // Clear candidateData if fetching fails
      }
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      setCandidateData([]); // Clear candidateData if an error occurs
    } finally {
      setFetchingData(false); // Set fetchingData to false regardless of success or failure
    }
  };

  const handleClick = () => {
    setFetchingData(true);
    fetchCandidateData();
  };

  const handleGetVoteCounts = async () => {
    try {
      const provider = walletData[1];
      const signer = provider.getSigner();
      const gasLimit = 100000;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      let maxVotes = 0;
      let winningCandidateAddress = "";

      // Extract addresses from candidate data
      const candidateAddresses = candidateData.map(
        (candidate) => candidate.address
      );

      // Iterate through each candidate address
      for (const candidateAddress of candidateAddresses) {
        const voteCount = await contract.getVoteCount(candidateAddress, {
          gasLimit: gasLimit,
        });

        // Update maxVotes and winningCandidateAddress if needed
        if (voteCount > maxVotes) {
          maxVotes = voteCount;
          winningCandidateAddress = candidateAddress;
        }
        setWinningCandidate(winningCandidateAddress);
      }

      // Display toast with winning candidate details
      toast({
        title: "Winner",
        description: `The winning candidate is ${winningCandidateAddress} with ${maxVotes} votes.`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {
      console.error("Error fetching vote counts:", error);
      toast({
        title: "Error",
        description: "Failed to fetch vote counts.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  return (
    <div>
      <button
        className="zinc-button font-mono"
        onClick={handleClick}
        disabled={fetchingData}
      >
        {fetchingData ? "Fetching Candidates..." : "Get Candidate Data"}
      </button>
      <button
        className="zinc-button font-mono ml-4"
        onClick={handleGetVoteCounts}
        disabled={candidateData.length === 0}
      >
        Get Voting Results
      </button>
    </div>
  );
}

export default WinnerComponent;

import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";

function PopoverComponent() {
  const [candidateData, setCandidateData] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
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

  return (
    <div>
      <Popover size={"xl"}>
        <PopoverTrigger>
          <button
            onClick={handleClick}
            disabled={fetchingData}
            className="zinc-button font-mono"
          >
            {"active candidates"}
          </button>
        </PopoverTrigger>
        <PopoverContent width={"2xl"}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Please select a candidate address:</PopoverHeader>
          <PopoverBody>
            {candidateData.map((candidate, index) => (
              <div key={index}>
                <div>
                  <strong>Name:</strong> {candidate.name}
                </div>
                <div>
                  <strong>Party:</strong> {candidate.party}
                </div>
                <div>
                  <strong>Address:</strong> {candidate.address}
                </div>
              </div>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PopoverComponent;

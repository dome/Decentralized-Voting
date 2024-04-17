// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Type declarations
/// @title Decentralized Voting Contract
/// @notice This contract allows for the decentralized management of voting for candidates.
contract DecentralizedVoting {
    // State variables
    address public admin;
    bool electionActive;

    // Struct to store information about a candidate.
    struct Candidate {
        string name; // Name of the candidate.
        string party; // Party affiliation of the candidate.
        uint voteCount; // Number of votes received by the candidate.
        bool verified; // Flag indicating whether the candidate is verified.
    }

    // Struct to store information about a voter.
    struct Voter {
        bool voted; // Flag indicating whether the voter has already voted.
        bool verified; // Flag indicating whether the voter is verified.
    }

    mapping(address => Candidate) public candidates; // Mapping of candidate addresses to their information.
    mapping(address => Voter) public voters; // Mapping of voter addresses to their information.

    uint public candidateCount; // Total number of candidates.
    uint public voterCount; // Total number of voters.

    // Events

    /// @notice Event emitted when a voter is added.
    event VoterAdded(address indexed voterAddress);

    /// @notice Event emitted when a Election is Started.
    event ElectionStarted();

    /// @notice Event emitted when a Election is Ended.
    event ElectionEnded();

    // Errors
    error OnlyAdminError();
    error VoterNotVerified();
    error VoterAlreadyVoted();
    error VoterAlreadyAdded();
    error CandidateNotVerified();
    error CandidateAlreadyAdded();
    error ElectionNotActive();

    // Modifiers
    /// @dev Modifier to restrict access to only the admin.
    modifier onlyAdmin() {
        if (msg.sender != admin) revert OnlyAdminError();
        _;
    }

    /// @dev Modifier to check if the election is active.
    modifier isElectionActive() {
        if (!electionActive) revert ElectionNotActive();
        _;
    }

    // Functions
    /// @dev Constructor to set the admin.
    constructor() {
        admin = msg.sender;
    }

    /// @notice Start the election.
    function startElection() external onlyAdmin {
        electionActive = true;
        emit ElectionStarted();
    }

    /// @notice Add a candidate to the election.
    /// @param _candidateAddress The address of the candidate.
    /// @param _name The name of the candidate.
    /// @param _party The party of the candidate.
    function addCandidate(
        address _candidateAddress,
        string memory _name,
        string memory _party
    ) external isElectionActive onlyAdmin {
        require(
            !candidates[_candidateAddress].verified,
            "This candidate is already registered."
        );
        candidateCount++;
        candidates[_candidateAddress] = Candidate(_name, _party, 0, true);
    }

    /// @notice Add a voter to the election.
    /// @param _voterAddress The address of the voter.
    function addVoter(
        address _voterAddress
    ) external isElectionActive onlyAdmin {
        if (voters[_voterAddress].verified) revert VoterAlreadyAdded(); // Verify voter not already added.
        voters[_voterAddress].verified = true; // Mark voter as verified.
        voterCount++; // Increment voter count.
        emit VoterAdded(_voterAddress); // Emit event for voter addition.
    }

    /// @notice Cast a vote for a candidate.
    /// @param _candidateAddress The address of the candidate.
    function vote(address _candidateAddress) external isElectionActive {
        if (!voters[msg.sender].verified) revert VoterNotVerified(); // Verify voter is verified.
        if (voters[msg.sender].voted) revert VoterAlreadyVoted(); // Verify voter has not already voted.
        if (!candidates[_candidateAddress].verified)
            revert CandidateNotVerified(); // Verify candidate is verified.
        candidates[_candidateAddress].voteCount++; // Increment vote count for the candidate.
        voters[msg.sender].voted = true; // Mark voter as voted.
    }

    /// @notice Get the vote count of a candidate.
    /// @param _candidateAddress The address of the candidate.
    /// @return The vote count of the candidate.
    function getVoteCount(
        address _candidateAddress
    ) public view returns (uint) {
        if (!candidates[_candidateAddress].verified)
            revert CandidateNotVerified(); // Verify candidate is verified.
        return candidates[_candidateAddress].voteCount;
    }

    /// @notice End the election.
    function endElection() external onlyAdmin {
        electionActive = false;
        emit ElectionEnded();
    }

    function electionStatus() public view returns (bool) {
        return electionActive;
    }
}

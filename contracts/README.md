# Decentralized Voting Smart Contract

## Overview

This smart contract implements a decentralized voting system, allowing for the management of voting for candidates in an election. It ensures transparency, security, and integrity in the voting process.

## Features

- Start and end an election.
- Add candidates to the election.
- Add verified voters to the election.
- Cast votes for candidates.
- Check the vote count of candidates.
- Verify candidates and voters.
- Restrict access to admin-only functionalities.

## How to Use

1. **Starting an Election**: Call `startElection()` function to commence the election process.
2. **Adding Candidates**: Use `addCandidate()` function to register candidates with their respective addresses, names, and party affiliations.
3. **Adding Voters**: Employ `addVoter()` function to include verified voters by providing their addresses.
4. **Casting Votes**: Voters can cast their votes by invoking `vote()` function with the address of their preferred candidate.
5. **Checking Vote Count**: Utilize `getVoteCount()` function to retrieve the vote count of a specific candidate.
6. **Ending the Election**: Call `endElection()` function to conclude the election process.

## Events

- `VoterAdded`: Emitted when a voter is successfully added.
- `ElectionStarted`: Emitted when the election is started.
- `ElectionEnded`: Emitted when the election is ended.

## Errors

- `OnlyAdminError`: Only admin has access to certain functions.
- `VoterNotVerified`: Voter needs to be verified to cast a vote.
- `VoterAlreadyVoted`: Voter cannot vote more than once.
- `VoterAlreadyAdded`: Voter is already added to the election.
- `CandidateNotVerified`: Candidate needs to be verified to be added.
- `CandidateAlreadyAdded`: Candidate is already registered.
- `ElectionNotActive`: Certain functions can only be executed when the election is active.

## State Variables

- `admin`: Address of the admin managing the contract.
- `electionActive`: Flag indicating whether the election is active.
- `candidates`: Mapping of candidate addresses to their information.
- `voters`: Mapping of voter addresses to their information.
- `candidateCount`: Total number of candidates.
- `voterCount`: Total number of voters.

## Modifiers

- `onlyAdmin`: Restricts access to only the admin.
- `isElectionActive`: Checks if the election is active.

## Support

For any queries or assistance, please contact [Add Contact Information Here].

# D.vote - Decentralized Voting DApp on Hedera

D.vote is a decentralized application (DApp) built on the Hedera network, providing a transparent and secure platform for conducting elections using blockchain technology. This README serves as a guide to understanding and using the DApp.

## Features

- **Decentralized Voting**: Utilizes smart contracts on the Hedera network to enable decentralized management of voting for candidates.
- **Election Management**: Admins can start, end, and manage elections through the DApp.
- **Candidate and Voter Registration**: Admins can add candidates and voters to the election process and verify their identities.
- **Transparent Results**: The DApp ensures transparency in the election process, providing visibility into vote counts and election status.
- **Discord Integration**: Integrates with Discord for real-time communication and notifications related to the election process.

## Technologies Used

- **Frontend**: Developed using Next.js, a React framework for building web applications.
- **Blockchain Integration**: Smart contracts are written in Solidity and deployed on the Hedera network.
- **Communication**: Utilizes Axios for HTTP requests and Chakra UI for UI components.
- **Wallet Integration**: Integrates with Hedera wallet for authentication and transaction signing.
- **Web3 Interactions**: Interaction with smart contracts and Hedera network is facilitated using JavaScript.

## Getting Started

1. **Connect Wallet**: Users must connect their Hedera wallet to the DApp to participate in the election process.
2. **Deploy Election Contract**: Admins can deploy the election smart contract using the DApp.
3. **Add Candidates and Voters**: Admins add candidates and voters to the election process, verifying their identities.
4. **Start Election**: Admins initiate the election process, allowing voters to cast their votes.
5. **Voting Process**: Voters cast their votes for candidates of their choice through the DApp.
6. **End Election**: Admins can end the election process once voting is complete.
7. **Result Announcement**: Admins announce the election results, concluding the election process.

## How to Use

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Access the DApp through the provided URL.
5. Connect your Hedera wallet to participate in the election process.
6. Follow the on-screen instructions to deploy the election contract, add candidates and voters, start and end the election, and view election results.

## Discord Integration

- Discord is used for real-time communication and notifications related to the election process.
- Admins and participants receive updates on election status, results, and other relevant information through Discord webhooks.

## Contributing

Contributions to the D.vote project are welcome! Please follow the guidelines outlined in the CONTRIBUTING.md file.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Special thanks to the Hedera team for providing a reliable and secure platform for building decentralized applications.
- Thanks to the Next.js, Solidity, and Discord communities for their invaluable contributions to the technologies used in this project.

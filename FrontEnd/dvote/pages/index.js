import Image from "next/image";
const axios = require("axios");
import { Inter } from "next/font/google";
import { useState } from "react";
import React from "react";
import { useToast } from "@chakra-ui/react";
import MyGroup from "@/components/MyGroup";
import walletConnectFcn from "@/components/hedera/walletConnect";
import contractDeployFcn from "@/components/hedera/contractDeploy";
import contractExecuteFcn from "@/components/hedera/contractExecute";
import AddCandidateModal from "@/components/comps/addcandidate";
import AddVoterModal from "@/components/comps/addvoter";
import VoteModal from "@/components/comps/vote";
import VCModal from "@/components/comps/getvotecount";
import ElectionStatusModal from "@/components/comps/getecstatus";
import PopoverComponent from "@/components/comps/seecandidates";
import WinnerComponent from "@/components/comps/getWinner";
import Footer from "@/components/comps/footer";
import TechStack from "@/components/comps/techstack";
import endelectionfn from "@/components/comps/endelection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [walletData, setWalletData] = useState();
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [contractAddress, setContractAddress] = useState();

  const [connectTextSt, setConnectTextSt] = useState(
    "🔌 Please Connect your wallet"
  );
  const [contractTextSt, setContractTextSt] = useState(
    "Use the Button Below to Deploy the contract"
  );

  const [connectLinkSt, setConnectLinkSt] = useState("");
  const [contractLinkSt, setContractLinkSt] = useState();
  const [executeTextSt, setExecuteTextSt] = useState();
  const [executeLinkSt, setExecuteLinkSt] = useState();

  const toast = useToast();

  async function connectWallet() {
    if (account !== undefined) {
      setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
    } else {
      const wData = await walletConnectFcn();

      let newAccount = wData[0];
      let newNetwork = wData[2];
      if (newAccount !== undefined) {
        setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
        setConnectLinkSt(
          `https://hashscan.io/${newNetwork}/account/${newAccount}`
        );

        setWalletData(wData);
        setAccount(newAccount);
        setNetwork(newNetwork);
        setContractTextSt();
      }
    }
  }

  async function contractDeploy() {
    if (account === undefined) {
      setContractTextSt("🛑 Connect a wallet first! 🛑");
    } else {
      const cAddress = await contractDeployFcn(walletData);

      if (cAddress === undefined) {
      } else {
        setContractAddress(cAddress);
        setContractTextSt(`Contract ${cAddress} deployed ✅`);

        setContractLinkSt(`https://hashscan.io/${network}/address/${cAddress}`);

        // Send message to Discord webhook
        const message = `Contract ${cAddress} deployed successfully on ${network} network. and here is the link https://hashscan.io/${network}/address/${cAddress}`;

        try {
          await axios.post(
            "https://discord.com/api/webhooks/1231166325997699112/Ple8q_XayqkOb2YZZHxs6DHZ5rfymw6QdZ6Y34D5PZ0qUhI-IagbWUsKjJX4QFcCSO5y",
            { content: message }
          );
          console.log("Message sent to Discord via webhook");
        } catch (error) {
          console.error("Error sending message to Discord via webhook:", error);
        }
        toast({
          title: "Contract Deployed",
          description: "Voting contract is deployed Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  }

  async function endelection() {
    if (contractAddress === undefined) {
    } else {
      toast({
        title: "Stop election",
        description: "Please wait for metamask",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-left",
        style: {
          background: "black",
          color: "white",
        },
      });
      const [txHash, finalStatus] = await endelectionfn(
        walletData,
        contractAddress
      );

      if (txHash === undefined || finalStatus === undefined) {
      } else {
        toast({
          title: "Stop Election",
          description: "Voting is not active now",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  }
  async function contractExecute() {
    if (contractAddress === undefined) {
      setExecuteTextSt("🛑 Deploy The contract first! 🛑");
    } else {
      toast({
        title: "Election Activate",
        description: "Please Sign the transaction",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-left",
        style: {
          background: "black",
          color: "white",
        },
      });
      const [txHash, finalStatus] = await contractExecuteFcn(
        walletData,
        contractAddress
      );

      if (txHash === undefined || finalStatus === undefined) {
      } else {
        setExecuteTextSt(
          `Election Status is: ${finalStatus} | Transaction hash: ${txHash} ✅`
        );
        setExecuteLinkSt(`https://hashscan.io/${network}/tx/${txHash}`);
        toast({
          title: "Election Activate",
          description: "Election is Activated now ",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-left",
        });
      }
    }
  }
  return (
    <>
      <main
        className={`flex min-h-full flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="z-10 w-full items-center justify-between font-mono text-sm flex">
          <p className="zinc-button font-mono text-center">
            Welcome to D.vote;
          </p>
          <div>
            <a>
              <button
                className="zinc-button font-mono"
                onClick={connectWallet}
                style={{ width: "150px" }}
              >
                {account ? "Connected" : "Connect Wallet"}
              </button>
            </a>
          </div>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px] mt-8">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/dvo.svg"
            alt="D VOTE Logo"
            width={500}
            height={500}
            priority
          />
        </div>

        <div className="mt-6">
          <MyGroup text={connectTextSt} link={connectLinkSt} />
          <MyGroup text={contractTextSt} link={contractLinkSt} />
          <MyGroup text={executeTextSt} link={executeLinkSt} />
          <div className="grid grid-cols-3 gap-8  mb-2">
            <button className="font-mono zinc-button " onClick={contractDeploy}>
              {contractAddress ? "Election Deployed" : "Deploy Election"}
            </button>
            <button
              className="font-mono zinc-button "
              onClick={contractExecute}
            >
              {executeLinkSt ? "Election is Active" : "Start Election"}
            </button>
            <button className="font-mono zinc-button " onClick={endelection}>
              Stop Election
            </button>
          </div>

          {/* <div className="logo">
    <div className="symbol">
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <path d="M20 0a20 20 0 1 0 20 20A20 20 0 0 0 20 0" className="circle"></path>
        <path d="M28.13 28.65h-2.54v-5.4H14.41v5.4h-2.54V11.14h2.54v5.27h11.18v-5.27h2.54zm-13.6-7.42h11.18v-2.79H14.53z" className="h"></path>
      </svg>
    </div>
    <span>Hedera</span>
  </div> */}
        </div>

        <div className="mb-32 mt-10 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left ">
          <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Step I{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] font-mono text-sm opacity-50`}>
              The Admin (deployer) is gonna start the election.
            </p>
          </a>

          <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Step II{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] font-mono text-sm opacity-50`}>
              Admin add the candidates and voters to take part in the election
              process and verifies them.
            </p>
          </a>

          <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Step III{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] font-mono text-sm opacity-50`}>
              Voters Gonna vote to the address of the candidates of their
              choice.
            </p>
          </a>

          <a className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Step IV{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p
              className={`m-0 max-w-[30ch] font-mono text-sm opacity-50 text-balance`}
            >
              Admin will announce the result and stop the election process.
            </p>
          </a>
        </div>
        <div className="mb-32 mt-10 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 gap-4 lg:text-left">
          <div className="row">
            <div className="">
              <AddCandidateModal
                contractAddress={contractAddress}
                walletData={walletData}
              ></AddCandidateModal>
            </div>
            <div className="">
              <AddVoterModal
                contractAddress={contractAddress}
                walletData={walletData}
              ></AddVoterModal>
            </div>
          </div>
          <div className="row">
            <div className="">
              <VoteModal
                contractAddress={contractAddress}
                walletData={walletData}
              ></VoteModal>
            </div>
            <div className="">
              <VCModal
                contractAddress={contractAddress}
                walletData={walletData}
              ></VCModal>
            </div>
          </div>
          <div className="row">
            <div className="">
              <ElectionStatusModal
                contractAddress={contractAddress}
                walletData={walletData}
              ></ElectionStatusModal>
            </div>
            <div className="">
              <PopoverComponent></PopoverComponent>
            </div>
          </div>
          <div className="row">
            <div className="">
              <WinnerComponent
                contractAddress={contractAddress}
                walletData={walletData}
              ></WinnerComponent>
            </div>
          </div>
        </div>
        <TechStack></TechStack>
        <Footer className=""></Footer>
      </main>
    </>
  );
}

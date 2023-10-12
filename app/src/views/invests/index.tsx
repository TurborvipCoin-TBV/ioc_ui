"use client";
declare var window: any;
import React, { useState } from "react";
import { Flex, Heading, SimpleGrid, Spacer } from "@chakra-ui/react";
import ConnectWalletBtn from "../../components/ConnectWalletBtn";
import WalletInfor from "../../components/WalletInfor";
import { IWalletInfo, TOKEN } from "../../_types_";
import { ethers } from "ethers";
import { packages } from "../../constants";
import InvestCard from "./components/InvestCard";

export default function Invest() {
  const [wallet, setWallet] = useState<IWalletInfo>();
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider>();
  const onConnectMetaMask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await signer.getBalance();
      const ethBalance = Number.parseFloat(
        ethers.utils.formatEther(bigBalance)
      );
      setWallet({ address, amount: ethBalance });
      setWeb3Provider(provider);
    }
  };

  return (
    <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Flex>
        <Heading size={"lg"} fontWeight={"bold"}>
          Blockchain Trainee
        </Heading>
        <Spacer />
        {wallet && <ConnectWalletBtn onClick={onConnectMetaMask} />}
        {wallet && (
          <WalletInfor address={wallet?.address} amount={wallet?.amount || 0} />
        )}
      </Flex>
      <Flex></Flex>
      <SimpleGrid columns={{ base: 1, lg: 3 }}>
        {packages.map((pk, index) => (
          <InvestCard
            pak={pk}
            key={String(index)}
            // isBuying={isProcessing && pak?.key === pk.key}
            // rate = {pk.token === TOKEN.ETH ? rate.ethRate : rawListeners.usdtRate}
            // walletInfo={wallet}
            // onBuy={()=> handleBuyIco(pk)}
          ></InvestCard>
        ))}
      </SimpleGrid>
    </Flex>
  );
}

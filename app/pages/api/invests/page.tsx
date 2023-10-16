"use client";
declare var window: any;
import React, { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import WalletInfor from "../../../src/components/WalletInfor";
import { IPacket, IRate, TOKEN } from "../../../src/_types_";
import { packages } from "../../../src/constants";
import InvestCard from "./components/InvestCard";
import CrowdSaleContract from "../../../src/contracts/CrowdSale.contract";
import UsdtContract from "../../../src/contracts/USDT.constract";
import { SuccessModal } from "../../../src/components";
import { useAppSelector } from "app/src/reduxs/hooks";

export default function Invest() {
  const { wallet, Wed3Provider } = useAppSelector((state) => state.account);

  const [rate, setRate] = useState<IRate>({ ethRate: 0, usdtRate: 0 });
  const [isProcessing, setIsProcessing] = useState<Boolean>(false);
  const [pak, setPak] = useState<IPacket>();
  const [txHash, setTxHash] = useState<string>();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const getRate = useCallback(async () => {
    const crowdContract = new CrowdSaleContract();
    const ethRate = await crowdContract.getEthRate();
    const usdtRate = await crowdContract.getUsdtRate();
    setRate({ ethRate, usdtRate });
  }, []);

  useEffect(() => {
    getRate();
  }, []);

  const handleBuyIco = async (pk: IPacket) => {
    if (!Wed3Provider) return;
    setPak(pk);
    setIsProcessing(true);
    let hash = "";
    const crowdContract = new CrowdSaleContract(Wed3Provider);

    if (pk.token === TOKEN.USDT) {
      const usdtContract = new UsdtContract(Wed3Provider);
      await usdtContract.approve(
        crowdContract._contractAddress,
        pk.amount / rate.ethRate
      );
      hash = await crowdContract.buyTokenBuyUSDT(pk.amount);
    } else {
      hash = await crowdContract.buyTokenByETH(pk.amount);
    }
    setTxHash(hash);
    onOpen();
    try {
    } catch (error: any) {}
    setPak(undefined);
    setIsProcessing(false);
  };

  return (
    <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Flex pb={"20px"}>
        <Heading size={"lg"} fontWeight={"bold"}>
          Blockchain Trainee
        </Heading>
        <Spacer />

        {wallet && (
          <WalletInfor address={wallet?.address} amount={wallet?.amount || 0} />
        )}
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacingY={"20px"}>
        {packages.map((pk, index) => (
          <InvestCard
            pak={pk}
            key={String(index)}
            isBuying={isProcessing && pak?.key === pk?.key}
            rate={pk.token === TOKEN.ETH ? rate.ethRate : rate.usdtRate}
            walletInfo={wallet}
            onBuy={() => handleBuyIco(pk)}
          ></InvestCard>
        ))}
      </SimpleGrid>
      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        hash={txHash}
        title="BUY ICO"
      />
    </Flex>
  );
}

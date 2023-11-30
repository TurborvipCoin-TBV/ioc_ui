"use client";
import { Flex, SimpleGrid, useBoolean, useToast } from "@chakra-ui/react";
import { IAuctionInfo } from "app/src/_types_";
import AuctionContract from "app/src/contracts/Auction.contract";
import NftContract from "app/src/contracts/Nft.contract";
import TPVContract from "app/src/contracts/TPV.contract";
import { useAppSelector } from "app/src/reduxs/hooks";
import { getToast } from "app/src/utils";
import React, { useCallback, useEffect, useState } from "react";
import NftAuction from "./components/NftAuction";
import AuctionModal from "./components/AuctionModal";
import { SuccessModal } from "app/src/components";

function AuctionView() {
  const { wallet, wed3Provider } = useAppSelector((state) => state.account);

  const toast = useToast();

  const [nfts, setNfts] = useState<IAuctionInfo[]>([]);
  const [nftSelected, setNftSelected] = useState<IAuctionInfo>();
  const [isOpen, setIsOpen] = useBoolean();
  const [isAuctionSuccess, setIsAuctionSuccess] = useBoolean(false);
  const [isProcessing, setIsProcessing] = useBoolean(false);
  const [txHash, setTxHash] = useState<string>();

  const getListAuctions = useCallback(async () => {
    if (!wed3Provider) return;
    const auctionContract = new AuctionContract(wed3Provider || undefined);
    const nfts = await auctionContract.getAuctionByStatus();
    const nftContract = new NftContract(wed3Provider);
    const nftAuctions = await nftContract.getNftAuctionInfo(nfts);
    setNfts(nftAuctions);
  }, [wed3Provider]);

  useEffect(() => {
    getListAuctions();
  }, [getListAuctions]);

  const handleAuction = async (bid: number) => {
    if (!wed3Provider || !bid || !nftSelected) return;
    setIsProcessing.on();
    try {
      const auctionContract = new AuctionContract(wed3Provider);
      const tpvContract = new TPVContract(wed3Provider);
      await tpvContract.approve(auctionContract._contractAddress, bid);
      const tx = await auctionContract.joinAuction(nftSelected.auctionId, bid);
      setTxHash(tx);
      setIsAuctionSuccess.on();
      setIsOpen.off();
      await getListAuctions();
    } catch (error: any) {
      setIsOpen.off();
      setIsProcessing.off();
      setIsAuctionSuccess.off();
      toast(getToast(error));
    }
  };
  return (
    <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <SimpleGrid w={"full"} columns={4} spacing={10}>
        {nfts.map((nft) => (
          <NftAuction
            item={nft}
            key={nft.id}
            onAction={() => {
              setNftSelected(nft), setIsOpen.on();
            }}
          />
        ))}
      </SimpleGrid>

      <AuctionModal
        isOpen={isOpen}
        isProcessing={isProcessing}
        nft={nftSelected}
        onClose={() => setIsOpen.off()}
        onAuction={(amount) => handleAuction(amount)}
      />

      <SuccessModal
        hash={txHash}
        title={"Bid Success"}
        isOpen={isAuctionSuccess}
        onClose={() => setIsAuctionSuccess.off()}
      />
    </Flex>
  );
}

export default AuctionView;

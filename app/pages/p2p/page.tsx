"use client";
import { Divider, Flex, Heading, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { INftItem } from "app/src/_types_";
import MarketContract from "app/src/contracts/Market.contract";
import NftContract from "app/src/contracts/Nft.contract";
import NftP2P from "./components/NftP2P";
import { useAppSelector } from "app/src/reduxs/hooks";
import TPVContract from "app/src/contracts/TPV.contract";
import { SuccessModal } from "app/src/components";
import { getToast } from "app/src/utils";

function P2PMarket() {
  const { wallet, wed3Provider } = useAppSelector((state) => state.account);

  const toast = useToast();
  const [nfts, setNfts] = useState<INftItem[]>([]);
  const [currentNft, setCurrentNft] = useState<INftItem>();
  const [txHash, setTxHash] = useState<string>();

  const {
    isOpen: isSuccess,
    onClose: onCloseSuccess,
    onOpen: onOpenSuccess,
  } = useDisclosure();

  const getListedNfts = useCallback(async () => {
    try {
      const marketContract = new MarketContract();
      const nftContract = new NftContract();
      const listedList = await marketContract.getNFTListedOnMarketplace();
      const nftList = await nftContract.getNftInfo(listedList);
      setNfts(nftList);
    } catch (error:any) {
      toast(getToast(error))
    }
  }, []);

  useEffect(() => {
    getListedNfts();
  }, [getListedNfts,wallet,wed3Provider]);

  const handleBuy = async (nft: INftItem) => {
    if (!wed3Provider || !nft?.price) return;
    try {
      setCurrentNft(nft);
      const marketContract = new MarketContract(wed3Provider);
      const tpvContract = new TPVContract(wed3Provider);

      await tpvContract.approve(
        marketContract._contractAddress,
        nft.price || 0
      );

      const tx = await marketContract.buyNft(nft.id,nft.price || 0)
      setTxHash(tx);
      onOpenSuccess();
    } catch (error:any) {
        toast(getToast(error))
    }
  };
  return (
    <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Heading color={"#fedf56"}>P2P TRADING</Heading>
      <Divider my={"10px"} />
      <SimpleGrid w={"full"} columns={4} spacing={20}>
        {nfts.map((nft, index) => (
          <NftP2P
            item={nft}
            key={nft.id}
            isDisable={!wallet}
            isBuying={currentNft?.id === nft.id}
            onAction={() => handleBuy(nft)}
          ></NftP2P>
        ))}
      </SimpleGrid>
      <SuccessModal
        hash={txHash}
        title={"List  - UnList NFT"}
        isOpen={isSuccess}
        onClose={onCloseSuccess}
      />
    </Flex>
  );
}

export default P2PMarket;

"use client";
import {
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { ActionType, INftItem } from "app/src/_types_";
import MarketContract from "app/src/contracts/Market.contract";
import NftContract from "app/src/contracts/Nft.contract";
import { useAppSelector } from "app/src/reduxs/hooks";
import React, { useCallback, useEffect, useState } from "react";
import Nft from "./components/Nft";
import { SuccessModal } from "app/src/components";
import ProcessingModal from "app/src/components/ProcessingModal";
import ListModal from "./components/ListModal";

const Market = () => {
  const { wallet, wed3Provider } = useAppSelector((state) => state.account);

  const [nfts, setNfts] = useState<INftItem[]>([]);
  const [nftsListed, setNftsListed] = useState<INftItem[]>([]);
  const [nft, setNft] = useState<INftItem>();
  const [action, setAction] = useState<ActionType>();

  const [isListing, setIsListing] = useBoolean();
  const [isOpen, setIsOpen] = useBoolean();
  const [txHash, setTxHash] = useState<string>();
  const [isUnList, setIsUnList] = useBoolean();

  const {
    isOpen: isSuccess,
    onClose: onCloseSuccess,
    onOpen: onOpenSuccess,
  } = useDisclosure();

  const getListNft = useCallback(async () => {
    if (!wed3Provider || !wallet || !wallet.address) return;
    const nftContract = new NftContract(wed3Provider);
    const nfts = await nftContract.getListNFT(wallet.address);
    console.log('nfts',nfts,wallet.address)
    setNfts(nfts.filter((p) => p.name));
    const marketContract = new MarketContract(wed3Provider);
    const ids = await marketContract.getNFTListedOnMarketplace();
    const listedNfts = await nftContract.getNftInfo(ids);
    setNftsListed(listedNfts);
  }, [wed3Provider, wallet]);

  useEffect(() => {
    getListNft();
  }, [getListNft,wallet]);

  const selectAction = async (ac: ActionType, item: INftItem) => {
    if ((ac !== "LIST" && ac !== "UNLIST") || !wed3Provider) return;
    setNft(item);
    setAction(ac);
    setIsListing.off();
    switch (ac) {
      case "LIST": {
        setIsOpen.on();
        break;
      }
      case "UNLIST": {
        setIsUnList.on();
        const marketContract = new MarketContract(wed3Provider);
        const tx = await marketContract.unListNft(item.id);
        setTxHash(tx);
        setAction(undefined);
        setNft(undefined);
        setIsUnList.off();
        await getListNft();
        break;
      }
      default:
        break;
    }
  };

  const handleListNft = async (price: number) => {
    if (!price || !wed3Provider || !wallet || !nft) return;
    setIsListing.on();
    try {
      const nftContract = new NftContract(wed3Provider);
      const marketContract = new MarketContract(wed3Provider);
      await nftContract.approve(marketContract._contractAddress, nft.id);
      const tx = await marketContract.listNft(nft.id, price);
      setTxHash(tx);
      onOpenSuccess();
      setAction(undefined);
      setNft(undefined);
      setIsOpen.off();
      await getListNft();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Flex
      w={{ base: "full", lg: "70%" }}
      flexDirection="column"
      margin="50px auto"
    >
      <Tabs>
        <TabList
          borderBottomColor={"#5A5A5A"}
          borderBottomRadius={2}
          mx={"15px"}
        >
          <Tab
            textTransform={"uppercase"}
            color={"#5A5A5A"}
            _selected={{ borderBottomColor: "white", color: "white" }}
          >
            ALL ITEMS
          </Tab>
          <Tab
            textTransform={"uppercase"}
            color={"#5A5A5A"}
            _selected={{ borderBottomColor: "white", color: "white" }}
          >
            active listings
          </Tab>
        </TabList>
        <TabPanels> 
          <TabPanel>
            <SimpleGrid w={'full'} columns={4} spacing={10}>
              {nfts.map((nft, index) => (
                <Nft
                  item={nft}
                  key={index}
                  index={index}
                  isAuction
                  isList
                  isTransfer
                  onAction={(a) => selectAction(a, nft)}
                ></Nft>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid w={"full"} column={4} spacing={10}>
              {nftsListed.map((nft, index) => (
                <Nft
                  item={nft}
                  key={index}
                  index={index}
                  isUnList
                  onAction={(a) => selectAction(a, nft)}
                ></Nft>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ProcessingModal isOpen={isUnList} onClose={() => {}} />
      <ListModal
        isOpen={isOpen}
        nft={nft}
        isListing={isListing}
        onClose={() => setIsOpen.off()}
        onList={(amount) => handleListNft(amount)}
      />
      <SuccessModal
        hash={txHash}
        title={"List  - UnList NFT"}
        isOpen={isSuccess}
        onClose={onCloseSuccess}
      ></SuccessModal>
    </Flex>
  );
};

export default Market;

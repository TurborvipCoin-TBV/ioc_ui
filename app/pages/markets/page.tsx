"use client";
import {
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Wrap,
  WrapItem,
  createStandaloneToast,
  useBoolean,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ActionType, IAuctionInfo, INftItem } from "app/src/_types_";
import MarketContract from "app/src/contracts/Market.contract";
import NftContract from "app/src/contracts/Nft.contract";
import { useAppSelector } from "app/src/reduxs/hooks";
import React, { useCallback, useEffect, useState } from "react";
import Nft from "./components/Nft";
import { SuccessModal } from "app/src/components";
import ProcessingModal from "app/src/components/ProcessingModal";
import ListModal from "./components/ListModal";
import TransferModal from "./components/TransferModal";
import NftAuction from "../auctions/components/NftAuction";
import { Web3Provider } from "@ethersproject/providers";
import AuctionContract from "app/src/contracts/Auction.contract";
import { getToast } from "app/src/utils";

const { toast } = createStandaloneToast();
const Market = () => {

  const toast = useToast();
  const { wallet, wed3Provider } = useAppSelector((state) => state.account);

  const [nfts, setNfts] = useState<INftItem[]>([]);
  const [nftsListed, setNftsListed] = useState<INftItem[]>([]);
  const [nft, setNft] = useState<INftItem>();
  const [action, setAction] = useState<ActionType>();

  const [isListing, setIsListing] = useBoolean();
  const [isOpen, setIsOpen] = useBoolean();
  const [txHash, setTxHash] = useState<string>();
  const [isUnList, setIsUnList] = useBoolean();

  const [isOpenTransferModal, setOpenTransferModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useBoolean();

  const [auctions, setAuctions] = useState<IAuctionInfo[]>([]);
  const [modalType, setModalType] = useState<"LISTING" | "AUCTION">("LISTING");

  const {
    isOpen: isSuccess,
    onClose: onCloseSuccess,
    onOpen: onOpenSuccess,
  } = useDisclosure();

  const getListNft = useCallback(async () => {
    try {
      if (!wed3Provider || !wallet || !wallet.address) return;
      const nftContract = new NftContract(wed3Provider);
      const nfts = await nftContract.getListNFT(wallet.address);
      setNfts(nfts.filter((p) => p.name));
      const marketContract = new MarketContract(wed3Provider);
      const ids = await marketContract.getNFTListedOnMarketplace();
      const listedNfts = await nftContract.getNftInfo(ids);
      setNftsListed(listedNfts);
      console.log('listedNfts',nfts)

      const auctionContract = new AuctionContract();
      const auctionNfts = await auctionContract.getAuctionByStatus();
      const myAuctions = auctionNfts.filter(
        (p) => p.auctioneer === wallet.address
      );
      const nftAuctions = await nftContract.getNftAuctionInfo(myAuctions);
      setAuctions(nftAuctions);
    } catch (error:any) {
      toast(getToast(error))
    }
  }, [wed3Provider, wallet]);

  useEffect(() => {
    getListNft();
  }, [getListNft, wallet]);

  const handleCancelAuction = async (nftAuction: IAuctionInfo) => {
    if(!wed3Provider) return;
    setIsUnList.on();
    try {
      const auctionContract = new AuctionContract(wed3Provider);
      const tx = await auctionContract.cancelAuction(nftAuction.auctionId);
      setTxHash(tx);
      onOpenSuccess();
      await getListNft();
    } catch (error:any) {
      toast(getToast(error))
    }
    setIsUnList.off();
  };
  const handleTransfer = async (toAddress: string) => {
    setIsProcessing.on();
    try {
      if (!wed3Provider || !nft || !wallet) return;
      const nftContract = new NftContract(wed3Provider);
      await nftContract.approve(toAddress, nft.id);
      const tx = await nftContract.safeTransferFrom(
        wallet.address || "",
        toAddress,
        nft.id
      );

      setTxHash(tx);
      setOpenTransferModal(false);
      onOpenSuccess();
      await getListNft();
    } catch (error) {
      setIsProcessing.off();
    }
  };

  const handleListNft = async (price: number, expireDate?: Date | null) => {
    if (!price || !wed3Provider || !wallet || !nft) return;
    setIsListing.on();
    try {
      const nftContract = new NftContract(wed3Provider);
      let tx = "";
      if (modalType === "LISTING") {
        const marketContract = new MarketContract(wed3Provider);
        await nftContract.approve(marketContract._contractAddress, nft.id);
        console.log("hi");
        tx = await marketContract.listNft(nft.id, price);
      } else if (modalType === "AUCTION") {
        if (!expireDate) return;
        const auctionContract = new AuctionContract(wed3Provider);
        await nftContract.approve(auctionContract._contractAddress, nft.id);
        const startTime = Math.round(new Date().getTime() / 1000 + 60);
        tx = await auctionContract.createAuction(
          nft.id,
          price,
          startTime,
          Math.round(expireDate.getTime() / 1000)
        );
      }

      setTxHash(tx);
      onOpenSuccess();
      setAction(undefined);
      setNft(undefined);
      setIsOpen.off();
      await getListNft();
    } catch (error: any) {
      toast(getToast(error))
      setIsOpen.off();
    }
  };

  const handleUnListNft = async (item: INftItem) => {
    try {
      if (!wed3Provider)
        throw Error("Connect wallet MarketContract provider is undefined");

      setIsUnList.on();
      const marketContract = new MarketContract(wed3Provider);
      const tx = await marketContract.unListNft(item.id);
      setTxHash(tx);
      setAction(undefined);
      setNft(undefined);
      setIsUnList.off();
      onOpenSuccess();
      await getListNft();
    } catch (error: any) {
      throw error;
    }
  };

  const selectAction = async (ac: ActionType, item: INftItem) => {
    try {
      if (!wed3Provider) return;
      setNft(item);
      setAction(ac);
      setIsListing.off();
      switch (ac) {
        case "LIST": {
          setIsOpen.on();
          break;
        }
        case "UNLIST": {
          handleUnListNft(item);
          break;
        }
        case "TRANSFER": {
          setOpenTransferModal(true);
          break;
        }
        case "AUCTION": {
          setModalType(ac === "AUCTION" ? "AUCTION" : "LISTING");
          setIsOpen.on();
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      toast(getToast(error))
      setIsUnList.off();
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
            color={useColorModeValue("gray.800","white")}
            _selected={{ borderBottomColor: useColorModeValue("red.600","white"), color: useColorModeValue("red.600","white") }}
          >
            ALL ITEMS
          </Tab>
          <Tab
            textTransform={"uppercase"}
            color={useColorModeValue("gray.800","white")}
            _selected={{ borderBottomColor: useColorModeValue("red.600","white"), color: useColorModeValue("red.600","white") }}
          >
            active listings
          </Tab>
          <Tab
            textTransform={"uppercase"}
            color={useColorModeValue("gray.800","white")}
            _selected={{ borderBottomColor: useColorModeValue("red.600","white"), color: useColorModeValue("red.600","white") }}
          >
            live auction
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid w={"full"} columns={4} spacing={10}>
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
            <SimpleGrid w={"full"} columns={4} spacing={10}>
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
          <TabPanel>
            <SimpleGrid w={"full"} columns={4} spacing={10}>
              {auctions.map((nft, index) => (
                <NftAuction
                  item={nft}
                  key={index}
                  isCancel
                  onAction={async (nft:IAuctionInfo) => handleCancelAuction(nft)}
                ></NftAuction>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ProcessingModal isOpen={isUnList} onClose={() => {}} />
      <ListModal
        type={modalType}
        isOpen={isOpen}
        nft={nft}
        isListing={isListing}
        onClose={() => setIsOpen.off()}
        onList={(amount, expireDate) => handleListNft(amount, expireDate)}
      />
      <SuccessModal
        hash={txHash}
        title={modalType =="LISTING" ? "List  - UnList NFT" : "Auction - UnAuction"}
        isOpen={isSuccess}
        onClose={onCloseSuccess}
      />
      <TransferModal
        isOpen={isOpenTransferModal}
        nft={nft}
        isTransfer={isProcessing}
        onClose={() => setOpenTransferModal(false)}
        onTransfer={(toAddress) => handleTransfer(toAddress)}
      ></TransferModal>
    </Flex>
  );
};

export default Market;

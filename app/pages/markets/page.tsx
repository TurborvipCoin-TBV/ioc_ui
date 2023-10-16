import { Flex, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { INftItem } from "app/src/_types_";
import MarketContract from "app/src/contracts/Market.contract";
import NftContract from "app/src/contracts/Nft.contract";
import { useAppSelector } from "app/src/reduxs/hooks";
import React, { useCallback, useEffect, useState } from "react";
import Ntf from "./components/Nft";
import { SuccessModal } from "app/src/components";

const Market = () => {
  const { wallet, wed3Provider } = useAppSelector((state) => state.account);

  const [nfts, setNfts] = useState<INftItem[]>([]);
  const [nftsListed, setNftsListed] = useState<INftItem[]>([]);

  const getListNft = useCallback(async () => {
    if (!wed3Provider || !wallet || !wallet.address) return;
    const nftContract = new NftContract(wed3Provider);
    const nfts = await nftContract.getListNFT(wallet.address);
    setNfts(nfts.filter((p) => p.name));
    const marketContract = new MarketContract(wed3Provider);
    const ids = await marketContract.getNFTListedOnMarketplace();
    const listedNfts = await nftContract.getNftInfo(ids);
    setNftsListed(listedNfts);
  }, [wed3Provider, wallet]);

  useEffect(() => {
    getListNft()
  }, [getListNft])
  

  return (
      <Flex w={'full'}>
        <Tabs>
          <TabList borderBottomColor={"#5A5A5A"} borderBottomRadius={2} mx={'15px'}>
            <Tab
              textTransform={'uppercase'}
              color={"#5A5A5A"}
              _selected={{borderBottomColor:"white",color:"white"}}
            >
                ALL ITEMS
            </Tab>
            <Tab
              textTransform={'uppercase'}
              color={"#5A5A5A"}
              _selected={{borderBottomColor:"white",color:"white"}}
            >
                active listings
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid w={'full'} column={4} spacing={10}>
                  {
                    nfts.map((nft,index)=>
                      <Nft 
                        item={nft}
                        key={index}
                        isAuction
                        isList
                        isTransfer
                        // onAction={(a)=>selectAction(a,nft)}
                      >
                      </Nft>
                    )
                  }
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid w={'full'} column={4} spacing={10}>
                {nftsListed.map((nft,index)=>
                  <Nft
                    item={nft}
                    key={index}
                    index={index}
                    isUnList
                    // onAction={(a)=>selectAction(a,nft)}
                  >

                  </Nft>
                )}

              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <ProcessingModal isOpen={isUnList} onClose={()=>{}}/>
        <ListModal
          isOpen={isOpen}
          nft={nft}
          isListing={isListing}
          onClose={()=>setIsOpen.off()}
          onList={(amount)=>handleListNft(amount)}
          />
        <SuccessModal
          hash={txHash}
          title={"List  - UnList NFT"}
          isOpen={isSuccess}
          onClose={onCloseSuccess}
        > */}

        </SuccessModal>
      </Flex>
    )
};

export default Market;

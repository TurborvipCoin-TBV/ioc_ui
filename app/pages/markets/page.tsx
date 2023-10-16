import { INftItem } from 'app/src/_types_';
import MarketContract from 'app/src/contracts/Market.contract';
import NftContract from 'app/src/contracts/Nft.contract';
import { useAppSelector } from 'app/src/reduxs/hooks';
import React, { useCallback, useState } from 'react'

const Market = () => {
  const { wallet, wed3Provider } = useAppSelector((state) => state.account);

  const [nfts, setNfts] = useState<INftItem[]>([])
  const [nftsListed, setNftsListed] = useState<INftItem[]>([])


  const getListNft = useCallback(async()=>{
    if(!wed3Provider || !wallet || !wallet.address) return;
    const nftContract = new NftContract(wed3Provider);
    const nfts = await nftContract.getListNFT(wallet.address);
    setNfts(nfts.filter((p)=>p.name));
    const marketContract = new MarketContract(wed3Provider);
    const ids = await marketContract.getNFTListedOnMarketplace();
    const listedNfts = await nftContract.getNftInfo(ids);
    setNftsListed(listedNfts);


  },[wed3Provider,wallet])

  return (
    <div>Market</div>
  )
}

export default Market
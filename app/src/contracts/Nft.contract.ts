import { BigNumber, ethers } from "ethers";
import { Erc721 } from "./interface";
import { getNFTAddress } from "./utils/getAddress";
import { getNftAbi } from "./utils/getAbis";
import { IAuctionInfo, INftItem } from "../_types_";
import { getRPC } from "./utils/common";

export default class NftContract extends Erc721 {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getNFTAddress(), getNftAbi());

    if(!provider){
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      )
    }
  }

  private _listTokenIds = async (address: string) => {
    const urls: BigNumber[] = await this._contract.listTokenIds(address);
    const ids = await Promise.all(urls.map((id) => this._toNumber(id)));
    return ids;
  };

  getListNFT = async (address: string): Promise<INftItem[]> => {
    const ids = await this._listTokenIds(address);
    return Promise.all(
      ids.map(async (id) => {
        const tokenUrl = await this._contract.tokenURI(id);
        const obj = await (await fetch(`${tokenUrl}.json)`)).json();
        const item: INftItem = { ...obj, id };
        return item;
      })
    );
  };

  getNftInfo = async (nfts: Array<any>) => {
    return Promise.all(
      nfts.map(async (o: any) => {
        const tokenUrl = await this._contract.tokenURI(o.tokenId);
        const obj = await (await fetch(`${tokenUrl}.json)`)).json();
        const item: INftItem = { ...obj, id: o.tokenId, author: o.author, price: o.price };
        return item;
      })
    );
  };

  getNftAuctionInfo = async (nftAuctions: IAuctionInfo[]) => {
    return Promise.all(
      nftAuctions.map(async (o: IAuctionInfo) => {
        const tokenUrl = await this._contract.tokenURI(o.tokenId);
        const obj = await (await fetch(`${tokenUrl}.json)`)).json();
        const item: IAuctionInfo = { ...o, ...obj, id: o.tokenId };
        return item;
      })
    );
  };
}

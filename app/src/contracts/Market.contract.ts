import { ethers } from "ethers";
import { Erc721 } from "./interface";
import { getMarketAddress } from "./utils/getAddress";
import { getMarketAbi } from "./utils/getAbis";

export default class MarketContract extends Erc721 {
  constructor(provider: ethers.providers.Web3Provider) {
    super(provider, getMarketAddress(), getMarketAbi());
  }

  getNFTListedOnMarketplace = async () => {
    const items = await this._contract.getListedNft();
    const nfts = items.map((item: any) => ({
      tokenId: this._toNumber(item.tokenId),
      author: item.author,
    }));

    return nfts;
  };

  getMyNftListed = async (address: string) => {
    const nfts = await this.getNFTListedOnMarketplace();
    return nfts.filter((p: any) => p.author === address);
  };

  listNft = async (tokenId: number | string, price: number) => {
    const tx = await this._contract.listNft(
      tokenId,
      this._numberToEth(price),
      this._option
    );
    return this._handleTransactionResponse(tx);
  };

  unListNft = async (tokenId: number | string) => {
    const tx = await this._contract.unlistNft(tokenId, this._option);
    return this._handleTransactionResponse(tx);
  };
}

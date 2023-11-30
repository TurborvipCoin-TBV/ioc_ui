import { ethers } from "ethers";
import { BaseInterface } from "./interface";
import { getAuctionAddress } from "./utils/getAddress";
import { getAuctionAbi } from "./utils/getAbis";
import { IAuctionInfo } from "../_types_";
import { getRPC } from "./utils/common";

export default class AuctionContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getAuctionAddress(), getAuctionAbi());
    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  getAuctionByStatus = async (): Promise<IAuctionInfo[]> => {
    const rs = await this._contract.getAuctionByStatus(true);
    const results: IAuctionInfo[] = [];
    for (let i = 0; i < rs.length; i++) {
      const o = rs[i];
      const item: IAuctionInfo = {
        auctioneer: o[0],
        tokenId: this._toNumber(o[1]),
        initialPrice: this._toEther(o[2]),
        previousBidder: o[3],
        lastBid: this._toEther(o[4]),
        lastBidder: o[5],
        startTime: this._toNumber(o[6]),
        endTime: this._toNumber(o[7]),
        complete: o[8],
        active: o[9],
        id: this._toNumber(o[1]),
        image: "",
        auctionId: this._toNumber(o[10]),
        animation_url: "",
      };
      results.push(item);
    }
    return results;
  };

  createAuction = async (
    tokenId: number,
    initialPrice: number,
    startTime: number,
    endTime: number
  ) => {
    const tx = await this._contract.createAuction(
      tokenId,
      this._numberToEth(initialPrice),
      startTime,
      endTime,
      this._option
    );
    return this._handleTransactionResponse(tx);
  };

  cancelAuction = async (auctionId: number) => {
    const tx = await this._contract.cancelAuction(auctionId, this._option);
    return this._handleTransactionResponse(tx);
  };

  joinAuction = async (auctionId: number, bid: number) => {
    const tx = await this._contract.joinAuction(
      auctionId,
      this._numberToEth(bid),
      this._option
    );
    return this._handleTransactionResponse(tx);
  };
}

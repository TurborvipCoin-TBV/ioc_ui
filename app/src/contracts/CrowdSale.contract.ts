import { ethers } from "ethers";
import { BaseInterface } from "./interface";
import { getRPC } from "./utils/common";
import { getCrowdSaleAddress } from "./utils/getAddress";
import { getCrowdSaleAbi } from "./utils/getAbis";
import { TransactionResponse } from "@ethersproject/providers";

export default class CrowdSaleContract extends BaseInterface {
  constructor(provider?: ethers.providers.Web3Provider) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(provider || rpcProvider, getCrowdSaleAddress(), getCrowdSaleAbi());

    if (!provider) {
      this._contract = new ethers.Contract(
        this._contractAddress,
        this._abis,
        rpcProvider
      );
    }
  }

  async getEthRate(): Promise<number> {
    let rate = await this._contract.ETH_rate();
    return this._toNumber(rate);
  }

  async getUsdtRate(): Promise<number> {
    let rate = await this._contract.USDT_rate();
    return this._toNumber(rate);
  }

  async buyTokenByETH(amount: number) {
    const rate = await this.getEthRate();
    const tx: TransactionResponse = await this._contract.buyTokenByETH({
      ...this._option,
      value: this._numberToEth(amount / rate),
    });
    return this._handleTransactionResponse(tx);
  }

  async buyTokenBuyUSDT(amount: number) {
    const rate = await this.getUsdtRate();
    const tx: TransactionResponse = await this._contract.buyTokenByUSDT(
      this._numberToEth(amount / rate),
      this._option
    );

    return this._handleTransactionResponse(tx);
  }
}

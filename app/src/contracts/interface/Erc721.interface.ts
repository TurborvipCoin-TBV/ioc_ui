import { ethers } from "ethers";
import { BaseInterface } from ".";
import { TransactionResponse } from "@ethersproject/providers";

class Erc721 extends BaseInterface {
  constructor(
    provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
    address: string,
    abi: ethers.ContractInterface
  ) {
    super(provider, address, abi);
  }

  async totalSupply(): Promise<number> {
    const total = this._contract.totalSupply();
    return this._toNumber(total);
  }
  async balanceOf(walletAddress: string): Promise<number> {
    const balance = await this._contract.balanceOf(walletAddress);
    return this._toNumber(balance);
  }
  async ownerOf(tokenId: string | number): Promise<string> {
    return this._contract.ownerOf(tokenId);
  }
  async getApproved(tokenId: string | number): Promise<string> {
    return this._contract.getApproved(tokenId);
  }

  async approve(toAddress: string, tokenId: string | number) {
    return this._contract.approve(toAddress, tokenId);
  }
  async safeTransferFrom(
    fromAddress: string,
    toAddress: string,
    tokenId: string | number
  ): Promise<string> {
    const tx: TransactionResponse = await this._contract[
      "safeTransferFrom(address,address,uint256)]"
    ](fromAddress, toAddress, tokenId);
    return this._handleTransactionResponse(tx);
  }

  async transferFrom(
    fromAddress: string,
    toAddress: string,
    tokenId: string | number
  ): Promise<string> {
    const tx: TransactionResponse = await this._contract.transferFrom(
      fromAddress,
      toAddress,
      tokenId
    );
    return this._handleTransactionResponse(tx);
  }
}
export default Erc721;

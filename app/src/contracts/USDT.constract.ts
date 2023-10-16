import { ethers } from "ethers";
import { Erc20 } from "./interface";
import { getUsdtAddress } from "./utils/getAddress";
import { getUsdtAbi } from "./utils/getAbis";

export default class UsdtContract extends Erc20 {
  constructor(provider: ethers.providers.Web3Provider) {
    super(provider, getUsdtAddress(), getUsdtAbi());
  }
}

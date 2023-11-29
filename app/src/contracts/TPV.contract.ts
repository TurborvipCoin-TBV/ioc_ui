import { ethers } from "ethers"
import { Erc20 } from "./interface"
import { getTPVAbi } from "./utils/getAbis"
import { getTPVAddress } from "./utils/getAddress"

export default class TPVContract extends Erc20 {
    constructor(provider: ethers.providers.Web3Provider){
        super(provider,getTPVAddress(),getTPVAbi())
    }
}
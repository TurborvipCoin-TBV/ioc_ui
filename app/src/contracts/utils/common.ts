export type AddressType = {
  97: string;
  56: string;
};

export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 56,
}

export default function getChainFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) {
    return 97;
  }
  return parseInt(env);
}

export const getRPC = () => {
  if (getChainFromEnv() === CHAIN_ID.MAINNET) {
    return process.env.NEXT_PUBLIC_RPC_MAINNET;
  }
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
};

// CROWD_SALE:0xd3F0d5877d4D349eC5EF320b651BCE3E8234B0d6
export const SMART_ADDRESS = {
  CROWD_SALE: { 97: "0x26c21BC64eb8f5d485f40792643849e4CCf69697", 56: "" },
  USDT: { 97: "0x7906C3867bCb11b92825584d6B2a4449F3F64b2C", 56: "" },
  TPV: { 97: "0x8905cE4f0a88d1c0aadc7eE5cA37C79FCa0EBc48", 56: "" },
  NFT: { 97: "0xedd647fc41A299ddCcC03C4a37d2311F242e01a3" || "", 56: "" },
  MARKET: { 97: "0x2D8B9E0D43cc5c52954EFa79a6224B6B5bEb3b37" || "", 56: "" },
  AUCTION: { 97: "0x5870C68b47E75785B4B2f5016EBbDF85Df0520c6" || "", 56: "" },
};

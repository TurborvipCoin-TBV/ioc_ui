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

export const SMART_ADDRESS = {
  CROWD_SALE: { 97: "0xd3F0d5877d4D349eC5EF320b651BCE3E8234B0d6", 56: "" },
  USDT: { 97: "0x7906C3867bCb11b92825584d6B2a4449F3F64b2C", 56: "" },
  NFT: { 97: "0xedd647fc41A299ddCcC03C4a37d2311F242e01a3" || "", 56: "" },
  MARKET: { 97: "0x2df99590f4E931E8af7414aD78021B2F7aB354e6" || "", 56: "" },
};

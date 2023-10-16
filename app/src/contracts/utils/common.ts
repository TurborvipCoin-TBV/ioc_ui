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
  CROWD_SALE: { 97: "0xa6AD2dbFfe97a7ab2e819c0BE6488d68a2Ce1fE3", 56: "" },
  USDT: { 97: "0xe4e244865002E3B95dC70F85a0C5DFA056863AD9", 56: "" },
  NFT: { 97: "0x35E6283c10CFc41112acF56A0c9895809789D79a", 56: "" },
  MARKET: { 97: "0xDc7483629Eb882DC8199fD25e4DCAe940ef1E068", 56: "" },
};

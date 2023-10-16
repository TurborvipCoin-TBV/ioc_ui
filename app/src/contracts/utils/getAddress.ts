import getChainFromEnv, { AddressType, SMART_ADDRESS } from "./common";

const getAddress = (address: AddressType) => {
  const CHAIN_ID = getChainFromEnv() as keyof AddressType;
  return address[CHAIN_ID];
};

export const getCrowdSaleAddress = () => getAddress(SMART_ADDRESS.CROWD_SALE);
export const getUsdtAddress = () => getAddress(SMART_ADDRESS.USDT);

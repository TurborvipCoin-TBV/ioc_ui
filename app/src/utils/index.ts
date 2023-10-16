export const numberFormat = (number: number | string) =>
  new Intl.NumberFormat().format(Number(number));
export const showShortAddress = (address?: string): string => {
  return `${address?.substring(0, 4)}...${address?.substring(
    address.length - 4,
    address.length - 1
  )}`;
};

export const showTransactionHash = (transHash: string) => {
  return `${transHash?.substring(0, 10)}${"".padStart(
    5,
    "*"
  )}${transHash?.substring(transHash.length - 10, transHash.length)}`;
};

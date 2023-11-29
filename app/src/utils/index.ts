import { UseToastOptions } from "@chakra-ui/react";

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

export const getToast = (
  description: string | object,
  status: UseToastOptions["status"] = "error",
  title = "Error"
): UseToastOptions => {
  if (typeof description === "string")
    return {
      title,
      status,
      position: "top-right",
      description,
      duration: 3000,
    };

  let msg = "Some thing wrong !";

  // @ts-ignore no problem in operation although type error appears
  if (typeof description === "object" && description?.["message"]) {
    // @ts-ignore no problem in operation although type error appears
    msg = description["message"];
  }

  return {
    title,
    status,
    position: "top-right",
    description: msg,
    duration: 3000,
  };
};

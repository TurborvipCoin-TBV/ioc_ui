import {
  Button,
  HStack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { numberFormat, showShortAddress } from "../utils";
import { IWalletInfo } from "../_types_";

export default function WalletInfor({ address, amount }: IWalletInfo) {
  return (
    <Button
      variant={useColorModeValue("outline_light","outline")}
      ml={"10px"}
    >
      <HStack>
        <Text>{showShortAddress(address)}</Text>
        <Image src="/eth.png" w="25px" alt="eth" ml="20px"></Image>
        <Text>{numberFormat(amount)} ETH</Text>
      </HStack>
    </Button>
  );
}

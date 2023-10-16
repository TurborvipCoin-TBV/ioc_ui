import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface IProps extends ButtonProps {}

export default function ConnectWalletBtn({ ...props }: IProps) {
  return (
    <Button
      variant={"primary"}
      rounded={"md"}
      p={"15px 30px"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      {...props}
    >
      Connect wallet
    </Button>
  );
}

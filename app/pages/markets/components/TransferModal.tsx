import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { INftItem } from "app/src/_types_";
import React, { useState } from "react";

interface IProps extends Omit<ModalProps, "children"> {
  nft?: INftItem;
  isTransfer?: boolean;
  onTransfer: (toAddress: string) => void;
}
function TransferModal({ nft, isTransfer, onTransfer, ...props }: IProps) {
  const [toAddress, setToAddress] = useState<string>();
  return (
    <Modal closeOnOverlayClick={false} {...props}>
      <ModalOverlay
        blur={"2xl"}
        bg={"blackAlpha.300"}
        backdropFilter={"blur(10px)"}
      />
      <ModalContent py={"30px"}>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems={"center"} w={"full"} direction={"column"}>
            <Heading size={"md"} mb={"10px"}>
              TRANSFER NFT
            </Heading>
            <Image
              src={nft?.animation_url || nft?.image}
              alt={nft?.name}
              borderRadius={"20px"}
              w={"80%"}
              mb={"20px"}
            />
            <Flex w={"full"} direction={"column"}>
              <Text fontWeight={"bold"}>To wallet</Text>
              <Flex w={"full"} my={"10px"}>
                <Input
                  w={"full"}
                  placeholder={"Input wallet address"}
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                />
              </Flex>
              <Button
                variant={"primary"}
                onClick={() => onTransfer && toAddress && onTransfer(toAddress)}
                disabled={!toAddress || isTransfer}
              >
                {isTransfer ? <Spinner /> : "Transfer now"}
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TransferModal;

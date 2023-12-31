import {
  Button,
  Flex,
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
  type: "LISTING" | "AUCTION";
  nft?: INftItem;
  isListing?: boolean;
  onList?: (amount: number, expireDate?: Date | null) => void;
}

function ListModal({ nft, isListing, type, onList, ...props }: IProps) {
  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>();
  return (
    <Modal closeOnOverlayClick={false} {...props}>
      <ModalOverlay
        blur={"2xl"}
        bg={"blackAlpha.300"}
        backdropFilter={"blur(10px)"}
      >
        <ModalContent py={"30px"}>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems={"center"} w={"full"} direction={"column"}>
              <Image
                src={nft?.animation_url || nft?.image}
                alt={nft?.name}
                borderRadius={"20px"}
                w={"80%"}
                mb={"20px"}
              />
              <Flex w={"full"} direction={"column"}>
                <Text fontWeight={"bold"}>Price listing</Text>
                <Text
                  fontSize={"12px"}
                  fontStyle={"italic"}
                  color={"rgba(255,255,255,0,5)"}
                >
                  Set your price:{" "}
                </Text>
                <Flex w={"full"} my={"10px"}>
                  <Input
                    w={"full"}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    type={"number"}
                  ></Input>
                  <Text
                    fontWeight={"bold"}
                    fontSize={"24px"}
                    position={"absolute"}
                    right={"40px"}
                    color={"rgba(255,255,255,0,4)"}
                  >
                    TBV
                  </Text>
                </Flex>

                {type === "AUCTION" && (
                  <>
                    <Text fontWeight={"bold"} mb={"10px"}>
                      Expiration date:
                    </Text>
                      <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      mb={"10px"}
                      />
                  </>
                )}

                <Button
                  variant={"primary"}
                  onClick={() => onList && onList(amount, startDate  ? new Date(startDate) : null)}
                  isDisabled={!amount || isListing}
                >
                  {isListing ? (
                    <Spinner />
                  ) : type === "LISTING" ? (
                    "List Now"
                  ) : (
                    "Auction Now"
                  )}
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

export default ListModal;

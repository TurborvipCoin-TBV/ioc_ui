import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { checkClarity } from "app/pages/markets/components/Nft";
import { IAuctionInfo } from "app/src/_types_";
import { numberFormat } from "app/src/utils";
import React from "react";
import CountDownTimer from "./CountDownTimer";

interface IProps {
  item: IAuctionInfo;
  isCancel?: boolean;
  onAction?: (nft: IAuctionInfo) => void;
}
function NftAuction({ item, isCancel, onAction }: IProps) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      bg={"#151D14"}
      px={"10px"}
      py={"10px"}
      borderRadius={"10px"}
    >
      <Box position={"relative"}>
        <Image
          src={item?.animation_url || item?.image}
          alt={item?.name}
          objectFit={"cover"}
          borderRadius={"10px"}
          height={300}
        />
        <Box position={"absolute"} top={5} right={10}>
          <Text fontWeight={"bold"} fontSize={"40px"} fontStyle={"italic"}>
            {checkClarity(item)}
          </Text>
        </Box>
        <HStack
          position={"absolute"}
          top={"5px"}
          px={"10px"}
          backgroundColor={"#a3a3a3"}
        >
          <Text w={"full"} backgroundColor={"b7b7b7"}>
            ID: {item.id.toString().padStart(5, "0")}
          </Text>
        </HStack>
      </Box>
      <VStack>
        <Text
          fontWeight={"bold"}
          py={"10px"}
          fontSize={"15px"}
          textTransform={"uppercase"}
          letterSpacing={"5px"}
          color={useColorModeValue("gray.300", "white")}
        >
          {item.name}
        </Text>
        <HStack w={"full"}>
          <Text color={"#fedf5680"} fontWeight={"bold"} fontSize={"14px"}>
            Highest bid:
          </Text>
          <Spacer />
          <Text color={"#fedf56"} fontWeight={"bold"}>
            {numberFormat(item.lastBid || 0)}TPV
          </Text>
        </HStack>
      </VStack>

      <SimpleGrid w={"full"} columns={2} spacingX={"10px"} mt={"10px"}>
        <Button variant={"outline"} disabled>
          <CountDownTimer targetDate={item.endTime * 1000} />
        </Button>
        <Button
          variant={isCancel ? "outline" : "primary"}
          py={"3px !important"}
          onClick={() => onAction && onAction(item)}
        >
          {isCancel ? "Cancel" : "Place a bid"}
        </Button>
      </SimpleGrid>
    </Flex>
  );
}

export default NftAuction;

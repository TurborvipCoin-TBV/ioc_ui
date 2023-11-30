import { Box, Button, HStack, Image, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { IPacket, IWalletInfo } from "app/src/_types_";
import { numberFormat } from "app/src/utils";

interface IProps {
  pak: IPacket;
  isBuying: boolean;
  walletInfo: IWalletInfo | undefined;
  rate: number;
  onBuy?: () => void;
}

function InvestCard({ pak, rate, isBuying, walletInfo, onBuy }: IProps) {
  return (
    <div style={{margin:'auto'}}>
      <Box
        w={"300px"}
        bg={"bg.secondary"}
        borderRadius={"16px"}
        overflow={"hidden"}
        padding={"10px"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.600", "rgba(254,223,86,6)")}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          bgImage={`/${pak.bg}`}
          w="full"
          h="210px"
          borderRadius={"16px"}
          bgSize={"cover"}
          bgPos={"center"}
        >
          <Box
            w="80px"
            h="80px"
            margin={"0px auto"}
            borderRadius={"full"}
            marginTop={"58%"}
            position={"relative"}
          >
            <Image
              src={`/${pak.icon}`}
              alt="eth"
              w="80px"
              h="80px"
              borderRadius="full"
              objectFit="cover"
              border={"6px solid rbga(254,223,86,6)"}
            />
            <Image
              src={`/verified.png`}
              w={"30px"}
              alt="verified"
              position={"absolute"}
              bottom={"2px"}
              right={"-3px"}
            />
          </Box>
        </Box>
        <Text my={"20px"} fontSize={"24px"} fontWeight={"bold"}>
          {pak.name}
        </Text>
        <Button
          disabled
          variant={"primary"}
          my={"20px"}
          bg={"transparent"}
          border={"1px solid"}
          color={useColorModeValue("gray.800", "rgba(255,255,255,0.7)")}
        >
          {numberFormat(pak.amount)} TPV
        </Button>
        <HStack>
          <Text color={"gray"}>Amount of coin to pay: </Text>
          <Text variant={"notoSan"} fontSize={"16px"}>
            {numberFormat(pak.amount / rate)}
            {pak.token}
          </Text>
        </HStack>
        <Button
          w={"full"}
          variant={"primary"}
          isDisabled={!walletInfo?.address || isBuying}
          onClick={onBuy}
        >
          {isBuying ? <Spinner /> : " Buy now"}
        </Button>
      </Box>
    </div>
  );
}

export default InvestCard;

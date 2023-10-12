import { IPacket, IWalletInfo } from "@/app/src/_types_";
import { Box, Image, Text } from "@chakra-ui/react";

interface IProps {
  pak: IPacket;
  //   isBuying: boolean;
  //   walletInfo: IWalletInfo;
  //   rate: number;
  onBuy?: () => void;
}

function InvestCard({
  pak,
}: // isBuying, walletInfo, rate,
// onBuy
IProps) {
  return (
    <Box
      w={"300px"}
      bg={"bg.secondary"}
      borderRadius={"16px"}
      overflow={"hidden"}
      padding={"10px"}
      border={"1px solid rgba(254,223,86,6)"}
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
          margin={'0px auto'}
          borderRadius={"full"}
          marginTop={"50%"}
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
            w={"50px"}
            alt="verified"
            position={"absolute"}
            bottom={"-20%"}
            right={"-20px"}
          />
        </Box>
      </Box>
      <Text my={"20px"} fontSize={"24px"} fontWeight={"bold"}>
        {pak.name}
      </Text>
    </Box>
  );
}

export default InvestCard;

import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ActionType, Clarity, INftItem } from "app/src/_types_";

interface IProps {
  item: INftItem;
  index: number;
  isTransfer?: boolean;
  isUnList?: boolean;
  isList?: boolean;
  isAuction?: boolean;
  onAction?: (action: ActionType) => void;
}

export default function Ntf({
  item,
  index,
  isTransfer,
  isUnList,
  isList,
  isAuction,
  onAction,
}: IProps) {
  const checkClarity = (item: INftItem) => {
    let clarity = 0;
    let traitType =
      item?.attributes?.find((p) => p.trait_type === "Rarity")?.value || null;
    if (typeof traitType == "number") {
      clarity = traitType;
    }
    return Clarity[clarity];
  };

  return (
    <Box>
      <Flex
        justifyContent={"center"}
        alignContent={"center"}
        flexDirection={"column"}
        bg={"#151D14"}
        px={"10px"}
        py={"10px"}
        borderRadius={"10px"}
      >
        <Box position={"relative"}>
          <Image
            src={item?.animation_url || item?.image}
            alt={item.name}
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
        <Text>
          {isList && isAuction && (
            <SimpleGrid w={"full"} paddingTop={3} columns={2} spacingX={"10px"}>
              <Button
                variant={"primary"}
                onClick={() => onAction && onAction("LIST")}
              >
                List
              </Button>
              <Button
                variant={"primary"}
                onClick={() => onAction && onAction("AUCTION")}
              >
                Auction
              </Button>
            </SimpleGrid>
          )}

          {isTransfer && (
            <Button
              variant={"primary"}
              w={"full"}
              mt={"10px"}
              onClick={() => onAction && onAction("TRANSFER")}
            >
              Transfer
            </Button>
          )}
        </Text>
      </Flex>
    </Box>
  );
}

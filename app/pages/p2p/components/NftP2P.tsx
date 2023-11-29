import { Box, Button, Flex, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { checkClarity } from 'app/pages/markets/components/Nft';
import { INftItem } from 'app/src/_types_'
import { numberFormat } from 'app/src/utils';
import React from 'react'

interface IProps {
    item: INftItem;
    isBuying: boolean;
    isDisable: boolean;
    onAction: () => void;
}

function NftP2P({item,isBuying, isDisable, onAction}:IProps) {
  return (
    <Flex
        justifyContent={'center'}
        alignItems={"center"}
        flexDirection={"column"}
        bg={'#151D14'}
        px={'10px'}
        py={'10px'}
        borderRadius={'10px'}
    >
        <Box position={'relative'}>
            <Image
                src={item?.animation_url || item?.image}
                alt={item?.name}
                objectFit={'cover'}
                borderRadius={'10px'}
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
            <Text fontWeight={'bold'} py={'10px'} fontSize={'15px'} textTransform={'uppercase'} letterSpacing={'5px'}>
                {item.name}
            </Text>
            <HStack w={'full'}>
                <Text color={"#fedf5680"} fontWeight={'bold'} fontSize={'14px'}>Price:</Text>
                <Spacer/>
                <Text color={'#fedf56'} fontWeight={'bold'}>{numberFormat(item.price || 0)}TPV</Text>
            </HStack>
        </VStack>

        <Button
            variant={isBuying || isDisable ? "outline" : "primary"}
            w={'full'}
            mt={'10px'}
            onClick={onAction}
            disabled={isBuying || isDisable}
        >
            Buy
        </Button>
    </Flex>
  )
}

export default NftP2P
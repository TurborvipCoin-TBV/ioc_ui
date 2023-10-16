import { Flex } from "@chakra-ui/react";
import { INftItem } from "app/src/_types_";

interface IProps {
    item: INftItem;
    index:number;
    isTransfer?: boolean;
    isUnList?: boolean; 
    isList?: boolean;
    isAuction?: boolean;
    onAction?: (action: ActionType)=>void;
}

export default function Ntf({
    item,
    index,isTransfer,
    isUnList,
    isList,
    isAuction,
    onAction
}: IProps) {
    return(
        <Flex
            justifyContent={"center"}
            alignContent={"center"}
            flexDirection={"column"}
            bg={"#151D14"}
        >

        </Flex>
    )
}
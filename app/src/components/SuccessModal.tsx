import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";

import { showTransactionHash } from "../utils";

interface IProps extends Omit<ModalProps, "children"> {
  hash?: string;
  title?: string;
}

export default function SuccessModal({ hash, title, ...props }: IProps) {
  const onNavigation = () => {
    if (window) {
      window.open(`https://sepolia.etherscan.io/tx/${hash}`, "_blank");
    }
  };

  return (
    <Modal closeOnOverlayClick={false} {...props}>
      <ModalOverlay
        blur={"2xl"}
        bg={"backAlpha.300"}
        backdropFilter={"blur(10px)"}
      />
      <ModalContent py={"30px"}>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            alignItems="center"
            justifyContent={"center"}
            w={"full"}
            direction={"column"}
          >
            <Text variant={"notoSan"} fontSize={"20px"}>
              {title}
            </Text>
            <Text fontStyle={"italic"} fontSize={"12px"} mt={"10px"}>
              (Your transaction is successfully!)
            </Text>
            <Button
              w={"full"}
              variant={"primary"}
              mt={"20px"}
              onClick={onNavigation}
            >
              {showTransactionHash(hash || "")}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

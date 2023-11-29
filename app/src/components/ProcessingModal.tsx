import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {
  hash?: string;
  title?: string;
}

function ProcessingModal({ hash, title, ...props }: IProps) {
  return (
    <>
      <Modal closeOnOverlayClick={false} {...props} size={"md"} isCentered>
        <ModalOverlay
          py={"30px"}
          blur={"2xl"}
          backdropFilter="auto"
          backdropInvert="40%"
          backdropBlur="2px"
        >
          <ModalContent py={"30px"}>
            <ModalBody>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                w={"full"}
                direction={"column"}
              >
                <Spinner size={"lg"} />
                <Text mt="20px" fontStyle={"italic"}>
                  Your transaction is processing please wait
                </Text>
              </Flex>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

export default ProcessingModal;

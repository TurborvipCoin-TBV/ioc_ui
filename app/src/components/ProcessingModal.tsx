import {
  Flex,
  Modal,
  ModalBody,
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
      <Modal closeOnOverlayClick={false} {...props}>
        <ModalOverlay py={"30px"} bg={"rgba(0,0,0,6)"}>
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
        </ModalOverlay>
      </Modal>
    </>
  );
}

export default ProcessingModal;

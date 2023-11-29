"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Flex, Heading, Spacer, useDisclosure } from "@chakra-ui/react";
import { ConnectWalletBtn, SuccessModal, WalletInfor } from "../components";
import { ethers } from "ethers";
import { IPacket, IRate, IWalletInfo } from "../_types_";
import CrowdSaleContract from "../contracts/CrowdSale.contract";

interface IProps {
  children: ReactNode;
}

function MainLayout({ children }: IProps) {
  return (
    <>
      <Navbar />
      <Flex minHeight={600}>{children}</Flex>
      <Footer />
    </>
  );
}

export default MainLayout;

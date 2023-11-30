import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  IconButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { menus } from "../constants";
import { IMenu } from "../_types_";
import { useAppDispatch, useAppSelector } from "../reduxs/hooks";
import { ethers } from "ethers";
import {
  setWalletInfo,
  setWeb3Provider,
} from "../reduxs/accounts/account.slice";
import { ConnectWalletBtn, WalletInfor } from ".";

interface Props {
  children: React.ReactNode;
  href: string;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}


const NavLink = (props: Props) => {
  const { children, href } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={href}
    >
      {children}
    </Box>
  );
};

const Links = menus;

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { wallet } = useAppSelector((state) => state.account);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onConnectMetaMask = async () => {
    const ethereum = global?.window?.ethereum;
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window?.ethereum,
        undefined
      );

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await signer.getBalance();
      const ethBalance = Number.parseFloat(
        ethers.utils.formatEther(bigBalance)
      );
      dispatch(setWalletInfo({ address, amount: ethBalance }));
      dispatch(setWeb3Provider(provider));
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={"center"}
            color={useColorModeValue("gray.900", "gray.100")}
          >
            <Box><Text fontWeight={'bold'}>TURBORVIP</Text></Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link: IMenu) => (
                <NavLink key={link.name} href={link.url}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {!wallet && <ConnectWalletBtn onClick={onConnectMetaMask} />}
              {wallet && (
                <WalletInfor
                  address={wallet?.address}
                  amount={wallet?.amount || 0}
                />
              )}
              {/* <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu> */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

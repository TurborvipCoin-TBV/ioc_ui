"use client";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Image,
  Flex,
  StackDivider,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import { FcAssistant, FcInTransit, FcDonate } from "react-icons/fc";
import { ReactElement, ReactNode } from "react";
interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
  title?: string;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const FeatureNew = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function Home() {
  return (
    <>
      <Container maxW={"7xl"} position={"relative"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome to Turborvip <br />
            <Text as={"span"} color={"green.400"}>
              a blockchain application
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Conquer Challenges, Create Value with TurboVip - NFTs and Coins
            Redefined! Transform challenges into triumphs as you redefine the
            value of digital assets in the TurborVip ecosystem.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              <Link href="../pages/invests">Get Started</Link>
            </Button>
            <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              <Link href="#ourStory">Learn more</Link>
            </Button>
            <Box>
              <Icon
                as={Arrow}
                color={useColorModeValue("gray.800", "gray.300")}
                w={71}
                position={"absolute"}
                right={-71}
                top={"10px"}
              />
              <Text
                fontSize={"lg"}
                fontFamily={"Caveat"}
                position={"absolute"}
                right={"-125px"}
                top={"-15px"}
                transform={"rotate(10deg)"}
              >
                Starting at $0/mo :)) free
              </Text>
            </Box>
          </Stack>
        </Stack>
        <Box p={4} mb={"100px"}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <FeatureNew
              icon={<Icon as={FcAssistant} w={10} h={10} />}
              title={"Lifetime Support"}
              text={
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
              }
              iconBg={""}
            />
            <FeatureNew
              icon={<Icon as={FcDonate} w={10} h={10} />}
              title={"Unlimited Donations"}
              text={
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
              }
              iconBg={""}
            />
            <FeatureNew
              icon={<Icon as={FcInTransit} w={10} h={10} />}
              title={"Instant Delivery"}
              text={
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
              }
              iconBg={""}
            />
          </SimpleGrid>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} id="ourStory">
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Our Story
            </Text>
            <Heading>A digital Product design agency</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Feature
                icon={
                  <Icon
                    as={IoAnalyticsSharp}
                    color={"yellow.500"}
                    w={5}
                    h={5}
                  />
                }
                iconBg={useColorModeValue("yellow.100", "yellow.900")}
                text={"Business Planning"}
              />
              <Feature
                icon={
                  <Icon as={IoLogoBitcoin} color={"green.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("green.100", "green.900")}
                text={"Financial Planning"}
              />
              <Feature
                icon={
                  <Icon as={IoSearchSharp} color={"purple.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={"Market Analysis"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>

        <Box bg={useColorModeValue("white.800","gray.800")} position={"relative"}>
          <Flex
            flex={1}
            zIndex={0}
            display={{ base: "none", lg: "flex" }}
            backgroundImage="url('/templates/stats-grid-with-image.png')"
            backgroundSize={"cover"}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            position={"absolute"}
            width={"50%"}
            insetY={0}
            right={0}
          >
            <Flex
              bgGradient={"linear(to-r, gray.800 10%, transparent)"}
              w={"full"}
              h={"full"}
            />
          </Flex>
          <Container maxW={"7xl"} zIndex={10} position={"relative"}>
            <Stack direction={{ base: "column", lg: "row" }}>
              <Stack
                flex={1}
                color={"gray.400"}
                justify={{ lg: "center" }}
                py={{ base: 4, md: 20, xl: 60 }}
              >
                <Box mb={{ base: 8, md: 20 }}>
                  <Text
                    fontFamily={"heading"}
                    fontWeight={700}
                    textTransform={"uppercase"}
                    mb={3}
                    fontSize={"xl"}
                    color={"gray.500"}
                  >
                    Technology
                  </Text>
                  <Heading
                    color={"white"}
                    mb={5}
                    fontSize={{ base: "3xl", md: "5xl" }}
                  >
                    21st century agriculture
                  </Heading>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    The NewLife™ technology allows you to monitor your crops and
                    get complete insights at real time. The proprietary
                    software/hardware ecosystem prevents your plants from
                    getting neglected.
                  </Text>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  {stats.map((stat) => (
                    <Box key={stat.title}>
                      <Text
                        fontFamily={"heading"}
                        fontSize={"3xl"}
                        color={"white"}
                        mb={3}
                      >
                        {stat.title}
                      </Text>
                      <Text fontSize={"xl"} color={"gray.400"}>
                        {stat.content}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Container>
    </>
  );
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={"span"} fontWeight={700} color={"white"}>
    {children}
  </Text>
);

const stats = [
  {
    title: "10+",
    content: (
      <>
        <StatsText>Software modules</StatsText> for detailed monitoring and
        real-time analytics
      </>
    ),
  },
  {
    title: "24/7",
    content: (
      <>
        <StatsText>Analytics</StatsText> enabled right in your dashboard without
        history limitations
      </>
    ),
  },
  {
    title: "13%",
    content: (
      <>
        <StatsText>Farms</StatsText> in North America has chosen NewLife™ as
        their management solution
      </>
    ),
  },
  {
    title: "250M+",
    content: (
      <>
        <StatsText>Plants</StatsText> currently connected and monitored by the
        NewLife™ software
      </>
    ),
  },
];

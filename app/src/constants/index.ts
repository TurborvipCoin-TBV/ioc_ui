import { IMenu, IPacket, TOKEN } from "../_types_";

export const menus: IMenu[] = [
  { name: "Invest", url: "/pages/invests" },
  { name: "Market", url: "/pages/markets" },
  { name: "P2P", url: "/pages/p2p" },
  { name: "Auction", url: "/pages/auctions" },

];

export const packages: IPacket[] = [
  {
    key: "eth-001",
    name: "ETH package 01",
    amount: 10,
    bg: "eth_bg.png",
    icon: "eth.png",
    token: TOKEN.ETH,
  },
  {
    key: "eth-002",
    name: "ETH package 02",
    amount: 300,
    bg: "eth_bg.png",
    icon: "eth.png",
    token: TOKEN.ETH,
  },
  {
    key: "eth-003",
    name: "ETH package 03",
    amount: 150,
    bg: "eth_bg.png",
    icon: "eth.png",
    token: TOKEN.ETH,
  },
  // {
  //   key: "usdt-001",
  //   name: "USDT package 01",
  //   amount: 10,
  //   bg: "usdt_bg.jpg",
  //   icon: "usdt.png",
  //   token: TOKEN.USDT,
  // },
  // {
  //   key: "usdt-002",
  //   name: "USDT package 02",
  //   amount: 2000,
  //   bg: "usdt_bg.jpg",
  //   icon: "usdt.png",
  //   token: TOKEN.USDT,
  // },
  // {
  //   key: "usdt-003",
  //   name: "USDT package 03",
  //   amount: 6000,
  //   bg: "usdt_bg.jpg",
  //   icon: "usdt.png",
  //   token: TOKEN.USDT,
  // },
];

import { IPacket, TOKEN } from "../_types_";

export const packages: IPacket[] = [
  {
    key: "eth-001",
    name: "ETH package 01",
    amount: 1000,
    bg: "eth_bg.jpg",
    icon: "eth.png",
    token: TOKEN.ETH,
  },
  {
    key: "eth-002",
    name: "ETH package 02",
    amount: 3000,
    bg: "eth_bg.jpg",
    icon: "eth.png",
    token: TOKEN.ETH,
  },
  {
    key: "eth-003",
    name: "ETH package 03",
    amount: 1500,
    bg: "eth_bg.jpg",
    icon: "eth.png",
    token: TOKEN.ETH,
  },
  {
    key: "usdt-001",
    name: "USDT package 01",
    amount: 1000,
    bg: "usdt_bg.jpg",
    icon: "usdt.png",
    token: TOKEN.USDT,
  },
  {
    key: "usdt-002",
    name: "USDT package 02",
    amount: 2000,
    bg: "usdt_bg.jpg",
    icon: "usdt.png",
    token: TOKEN.USDT,
  },
  {
    key: "usdt-003",
    name: "USDT package 03",
    amount: 6000,
    bg: "usdt_bg.jpg",
    icon: "usdt.png",
    token: TOKEN.USDT,
  },
];

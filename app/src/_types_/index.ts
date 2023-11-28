import { type } from "os";

export interface IWalletInfo {
  address?: string;
  amount: number;
}

export interface IRate {
  usdtRate: number;
  ethRate: number;
}

export enum TOKEN {
  ETH = "ETH",
  USDT = "USDT",
}

export interface IPacket {
  key: string;
  name: string;
  amount: number;
  icon: string;
  bg: string;
  token: TOKEN;
}

export interface IMenu {
  name:string,
  url:string
}

export interface IAtribute {
  trait_type: string;
  value: string| number;
}

export interface INftItem {
  animation_url: string | undefined;
  id:number;
  name?:string,
  description?:string,
  image?:string,
  attributes?:IAtribute[];
  // Listing
  priceListing?:number;
  author?:string;
  // Auction
  owner?:string,
  ownerImage?:string,
  highestBid?:number,
}

export enum Clarity {
  "A",
  "B",
  "C",
  "D",
  "E",
  "S",
  "SS",
  "SSS"
}

export type ActionType = "LIST" | "UNLIST" | "TRANSFER" | "AUCTION"


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
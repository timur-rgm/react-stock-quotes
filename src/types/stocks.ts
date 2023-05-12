export type StocksType = StockType[];

type StockType = {
  avgTotalVolume: number;
  calculationPrice: string;
  change: number;
  changePercent: number;
  close?: any;
  closeSource: string;
  closeTime?: any;
  companyName: string;
  currency: string;
  delayedPrice?: any;
  delayedPriceTime?: any;
  extendedChange?: any;
  extendedChangePercent?: any;
  extendedPrice?: any;
  extendedPriceTime?: any;
  high?: any;
  highSource?: any;
  highTime?: any;
  iexAskPrice: number;
  iexAskSize: number;
  iexBidPrice: number;
  iexBidSize: number;
  iexClose: number;
  iexCloseTime: number;
  iexLastUpdated: number;
  iexMarketPercent: number;
  iexOpen: number;
  iexOpenTime: number;
  iexRealtimePrice: number;
  iexRealtimeSize: number;
  iexVolume: number;
  lastTradeTime: number;
  latestPrice: number;
  latestSource: string;
  latestTime: string;
  latestUpdate: number;
  latestVolume: number;
  low: number;
  lowSource: string;
  lowTime: number;
  marketCap: number;
  oddLotDelayedPrice?: any;
  oddLotDelayedPriceTime?: any;
  open?: any;
  openTime?: any;
  openSource: string;
  peRatio: number;
  previousClose: number;
  previousVolume: number;
  primaryExchange: string;
  symbol: string;
  volume: number;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  isUSMarketOpen: boolean;
};

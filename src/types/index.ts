export interface Market {
  id: string;
  symbol: string;
  name: string;
  description: string;
  lastPrice: number;
}

export type RootStackParamList = {
  MarketsList: undefined;
  MarketDetail: { market: Market };
};

import { Market } from '../types';
import BASE_MARKETS_JSON from './initialMarkets.json';

const BASE_MARKETS: Market[] = BASE_MARKETS_JSON;

const ALL_MARKETS: Market[] = [
  ...BASE_MARKETS,
  ...Array.from({ length: 95 }).map((_, i) => ({
    id: `${i + 6}`,
    symbol: `MKT${i + 6}`,
    name: `Market Test ${i + 6}`,
    description: `Description for Market Test ${i + 6}`,
    lastPrice: 100 + Math.random() * 1000,
  })),
];

export const fetchMarkets = async (page: number, pageSize: number = 20): Promise<Market[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      resolve(ALL_MARKETS.slice(start, end));
    }, 1000);
  });
};

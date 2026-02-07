import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Market } from '../types';
import { fetchMarkets } from '../data/markets';

interface MarketsContextType {
  markets: Market[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMarkets: (page: number) => Promise<void>;
  updateMarketPrice: (id: string, newPrice: number) => void;
}

const MarketsContext = createContext<MarketsContextType | undefined>(undefined);

export const MarketsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMarkets = useCallback(async (page: number) => {
    if (page === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const newMarkets = await fetchMarkets(page);
      if (newMarkets.length === 0) {
        setHasMore(false);
      } else {
        setMarkets((prev) => {
          if (page === 1) return newMarkets;

          return [...prev, ...newMarkets];
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const updateMarketPrice = useCallback((id: string, newPrice: number) => {
    setMarkets((prevMarkets) =>
      prevMarkets.map((market) =>
        market.id === id ? { ...market, lastPrice: newPrice } : market
      )
    );
  }, []);

  return (
    <MarketsContext.Provider value={{ markets, loading, loadingMore, hasMore, loadMarkets, updateMarketPrice }}>
      {children}
    </MarketsContext.Provider>
  );
};

export const useMarkets = () => {
  const context = useContext(MarketsContext);
  if (context === undefined) {
    throw new Error('useMarkets must be used within a MarketsProvider');
  }
  return context;
};

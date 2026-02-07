import { useState, useRef, useEffect } from 'react';
import { Market } from '../types';
import { usePriceTicker } from './usePriceTicker';
import { useMarkets } from '../context/MarketsContext';

export const useMarketDetailViewModel = (market: Market) => {
  const { updateMarketPrice } = useMarkets();
  const [isActive, setIsActive] = useState(false);

  const currentPrice = usePriceTicker(market.lastPrice, isActive);

  const priceRef = useRef(currentPrice);
  useEffect(() => {
    priceRef.current = currentPrice;
  }, [currentPrice]);

  useEffect(() => {
    return () => {
      updateMarketPrice(market.id, priceRef.current);
    };
  }, [market.id, updateMarketPrice]);

  const toggleSimulation = () => setIsActive(!isActive);

  return {
    currentPrice,
    isActive,
    toggleSimulation
  };
};

import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState } from 'react-native';

export const usePriceTicker = (initialPrice: number, isActive: boolean = true) => {
  const [price, setPrice] = useState(initialPrice);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const appState = useRef(AppState.currentState);

  const updatePrice = useCallback(() => {
    setPrice((currentPrice) => {
      const change = currentPrice * ((Math.random() - 0.5) * 0.01);
      return Number((currentPrice + change).toFixed(2));
    });
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const clearTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    clearTimer();

    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (appState.current === 'active') {
          updatePrice();
        }
      }, 1000);
    }

    return () => {
      clearTimer();
    };
  }, [isActive, updatePrice]);

  return price;
};

import { useState, useEffect, useCallback } from 'react';
import { useMarkets } from '../context/MarketsContext';
import { Market, RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MarketsListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MarketsList'>;

export const useMarketsListViewModel = (navigation: MarketsListScreenNavigationProp) => {
  const { markets, loading, loadingMore, hasMore, loadMarkets } = useMarkets();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (markets.length === 0) {
      loadMarkets(1);
    }
  }, []);

  const handlePress = useCallback((market: Market) => {
    navigation.navigate('MarketDetail', { market });
  }, [navigation]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMarkets(nextPage);
    }
  }, [loadingMore, hasMore, loading, page, loadMarkets]);

  return {
    markets,
    loading,
    loadingMore,
    hasMore,
    handlePress,
    handleLoadMore,
  };
};

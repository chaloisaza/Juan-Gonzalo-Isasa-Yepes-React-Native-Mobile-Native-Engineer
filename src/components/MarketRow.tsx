import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Market } from '../types';

interface MarketRowProps {
  market: Market;
  onPress: (market: Market) => void;
}

export const MarketRow: React.FC<MarketRowProps> = ({ market, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(market)}>
      <View style={styles.infoContainer}>
        <Text style={styles.symbol}>{market.symbol}</Text>
        <Text style={styles.name}>{market.name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{market.lastPrice.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  infoContainer: {
    flex: 1,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  priceContainer: {
    minWidth: 80,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

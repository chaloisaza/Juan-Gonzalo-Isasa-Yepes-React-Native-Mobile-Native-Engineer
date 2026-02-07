import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PriceDisplayProps {
  price: number;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ price }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Price</Text>
      <Text style={styles.price}>{price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  price: {
    fontSize: 48,
    fontWeight: '800',
    color: '#333',
  },
});

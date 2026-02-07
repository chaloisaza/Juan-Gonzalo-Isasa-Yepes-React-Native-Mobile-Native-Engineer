import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { PriceDisplay } from '../components/PriceDisplay';
import { useMarketDetailViewModel } from '../hooks/useMarketDetailViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketDetail'>;

export const MarketDetailScreen: React.FC<Props> = ({ route }) => {
  const { market } = route.params;
  const { currentPrice, isActive, toggleSimulation } = useMarketDetailViewModel(market);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{market.name}</Text>
        <Text style={styles.subtitle}>{market.description}</Text>

        <PriceDisplay price={currentPrice} />

        <View style={styles.controls}>
          <Button
            title={isActive ? "Stop Updates" : "Resume Updates"}
            onPress={toggleSimulation}
            color={isActive ? "#FF3B30" : "#007AFF"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  controls: {
    marginTop: 20,
  },
});

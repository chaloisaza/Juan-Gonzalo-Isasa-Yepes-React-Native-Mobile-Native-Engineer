import React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MarketRow } from '../components/MarketRow';
import { RootStackParamList } from '../types';
import { useMarketsListViewModel } from '../hooks/useMarketsListViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketsList'>;

export const MarketsListScreen: React.FC<Props> = ({ navigation }) => {
  const {
    markets,
    loading,
    loadingMore,
    handlePress,
    handleLoadMore
  } = useMarketsListViewModel(navigation);

  const renderFooter = () => {
    if (!loadingMore) return <View style={styles.footer} />;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={markets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MarketRow market={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

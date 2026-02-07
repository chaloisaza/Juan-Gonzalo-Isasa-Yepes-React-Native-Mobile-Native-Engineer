import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MarketsListScreen } from '../screens/MarketsListScreen';
import { MarketDetailScreen } from '../screens/MarketDetailScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MarketsList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerBackTitle: 'Markets',
        }}
      >
        <Stack.Screen
          name="MarketsList"
          component={MarketsListScreen}
          options={{ title: 'Markets' }}
        />
        <Stack.Screen
          name="MarketDetail"
          component={MarketDetailScreen}
          options={({ route }) => ({ title: route.params.market.symbol })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

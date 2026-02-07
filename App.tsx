import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { MarketsProvider } from './src/context/MarketsContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <MarketsProvider>
        <AppNavigator />
      </MarketsProvider>
    </SafeAreaProvider>
  );
}

export default App;

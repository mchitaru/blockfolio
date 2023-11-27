import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import StackNavigator from './components/StackNavigator';
import WatchlistProvider from './contexts/WatchlistContext';
import PortfolioProvider from './contexts/PortfolioContext';

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#00002F'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortfolioProvider>
          <WatchlistProvider>
            <View style={styles.container}>
              <StackNavigator />
              <StatusBar style='light' />
            </View>
          </WatchlistProvider>
        </PortfolioProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00002F',
    paddingTop: 50,
  }
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CoinScreen from './screens/CoinScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import Navigation from './Navigation';

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
          <View style={styles.container}>
            <Navigation />
            <StatusBar style='light' />
          </View>
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

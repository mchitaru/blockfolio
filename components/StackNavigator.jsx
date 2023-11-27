import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CoinScreen from '../screens/CoinScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import SelectMarketScreen from '../screens/SelectMarketScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return ( 
    <>
      <Stack.Navigator
        initialRouteName="Root"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="Root" 
          component={TabNavigator}
        />
        <Stack.Screen 
          name="Coin" 
          component={CoinScreen}
        />
        <Stack.Screen 
          name="SelectMarket" 
          component={SelectMarketScreen}
        />
        <Stack.Screen 
          name="AddTransaction" 
          component={AddTransactionScreen}
        />
      </Stack.Navigator>
    </>
   );
}
 
export default StackNavigator;
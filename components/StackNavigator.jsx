import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CoinScreen from '../screens/CoinScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return ( 
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen 
          name="Root" 
          component={TabNavigator} 
        />
        <Stack.Screen 
          name="Coin" 
          component={CoinScreen} 
        />
      </Stack.Navigator>
    </>
   );
}
 
export default StackNavigator;
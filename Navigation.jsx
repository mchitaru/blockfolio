import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CoinScreen from './screens/CoinScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return ( 
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Coin" component={CoinScreen} />
    </Stack.Navigator>
   );
}
 
export default Navigation;
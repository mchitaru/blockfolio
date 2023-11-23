import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CoinScreen from '../screens/CoinScreen';
import AddAssetScreen from '../screens/AddAssetScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return ( 
    <>
      <Stack.Navigator
        initialRouteName="Root"
      >
        <Stack.Screen 
          name="Root" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Coin" 
          component={CoinScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddAsset" 
          component={AddAssetScreen}
          options={{
            title: "Add New Asset",
            headerStyle: {
              backgroundColor: "#00002F",
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }} 
        />
      </Stack.Navigator>
    </>
   );
}
 
export default StackNavigator;
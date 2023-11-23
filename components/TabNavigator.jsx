import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, Foundation } from "@expo/vector-icons";

import MarketsScreen from '../screens/MarketsScreen';
import WatchScreen from '../screens/WatchScreen';
import PortfolioScreen from '../screens/PortfolioScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return ( 
    <>
      <Tab.Navigator
        initialRouteName="Portfolio"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
            backgroundColor: "#00002F"
          }
        }}
      >
        <Tab.Screen
          name="Markets"
          component={MarketsScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Entypo name="line-graph" size={focused ? 30 : 25}  color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={PortfolioScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Foundation name="graph-pie" size={focused ? 35 : 30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <FontAwesome name="star" size={focused ? 30 : 25} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
   );
}
 
export default TabNavigator;
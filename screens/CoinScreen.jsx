import { Image, StyleSheet, Text, View } from "react-native";
import CoinHeader from "./components/CoinHeader";
import data from '../assets/data/crypto.json';
import HomeScreen from "./HomeScreen";

const CoinScreen = () => {
  return ( 
    <View style={{paddingHorizontal: 10}}>
      <CoinHeader 
        image={data.image.small}
        symbol={data.symbol}
        rank={data.market_data.market_cap_rank}
      />
      <View>
        <Text style={{color: "white"}}>{data.name}</Text>
        <Text style={{color: "white"}}>{data.market_data.current_price.usd}</Text>
      </View>
    </View>
   );
}

const styles = StyleSheet.create({
});
 
export default CoinScreen;
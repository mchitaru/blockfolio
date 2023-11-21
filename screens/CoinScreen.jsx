import { Image, StyleSheet, Text, View } from "react-native";
import CoinHeader from "./components/CoinHeader";
import data from '../assets/data/crypto.json';
import { AntDesign } from '@expo/vector-icons';

const CoinScreen = () => {

  const priceColor = data.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  return ( 
    <View style={{paddingHorizontal: 10}}>
      <CoinHeader 
        image={data.image.small}
        symbol={data.symbol}
        rank={data.market_data.market_cap_rank}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>
            {data.name}
          </Text>
          <Text style={styles.price}>
            {data.market_data.current_price.usd}
          </Text>
        </View>
        <View style={StyleSheet.flatten([styles.priceChangeContainer, {backgroundColor: priceColor}])}>
          <AntDesign 
            name={data.price_change_percentage_24h < 0 ? "caretdown": "caretup"}
            size={14} 
            color="white"
            style={styles.caretIcon}
          />
          <Text style={styles.priceChange}>
            {data.market_data.price_change_percentage_24h.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
   );
}

const styles = StyleSheet.create({
  name: {
    color: "white", 
    fontSize: 15
  },
  price: {
    color: "white", 
    fontSize: 30, 
    fontWeight: "bold", 
    letterSpacing: 1
  },
  priceContainer: {
    padding: 15, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  priceChangeContainer: {
    padding: 5,
    borderRadius: 5,
    flexDirection: "row"
  },
  priceChange: {
    color: "white", 
    fontSize: 17,
    fontWeight: "500"
  }
});
 
export default CoinScreen;
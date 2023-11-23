import { Text, View, Image, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const PortfolioItem = () => {
  return ( 
    <View style={styles.itemContainer}>
      <Image
        source={{uri: ""}}
        width={30}
        height={30}
      />
      <View>
        <Text style={styles.title}>Bitcoin</Text>
        <Text style={styles.symbol}>BTC</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.title}>$4000</Text>
        <View style={styles.priceChangeContainer}>
          <AntDesign 
            name={"caretup"}
            size={14} 
            color="#16c784"
            style={styles.caretIcon}
          />
          <Text style={styles.priceChangePercentage}>1.2%</Text>
        </View>
      </View>
      <View style={styles.holdingsCointainer}>
        <Text style={styles.title}>$8000</Text>
        <Text style={styles.symbol}>2 BTC</Text>
      </View>
    </View>
   );
}

const styles = StyleSheet.create({
  image: {

  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  symbol: {
    color: "grey",
    fontWeight: "600"
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15
  },
  priceContainer: {
    marginLeft: "auto"
  },
  priceChangeContainer: {
    flexDirection: "row"
  },
  priceChangePercentage: {
    color: "#16c784",
    fontWeight: "600"
  },
  caretIcon: {
    alignSelf: 'center',
    marginRight: 5
  },
  holdingsCointainer: {
    marginLeft: "auto",
    alignItems: "flex-end"
  }
});
 
export default PortfolioItem;
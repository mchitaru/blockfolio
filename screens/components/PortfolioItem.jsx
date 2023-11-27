import { Text, View, Image, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const PortfolioItem = ({item}) => {
  return ( 
    <View style={styles.itemContainer}>
      <Image
        source={{uri: item.image}}
        width={30}
        height={30}
      />
      <View style={styles.assetContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.title}>
        {item.current_price.toLocaleString("en-US", {currency: "USD", style: "currency", minimumFractionDigits: 2, useGrouping: true})}
        </Text>
        <View style={styles.priceChangeContainer}>
          <AntDesign 
            name={"caretup"}
            size={14} 
            color="#16c784"
            style={styles.caretIcon}
          />
          <Text style={styles.priceChangePercentage}>{item.price_change_percentage_24h}%</Text>
        </View>
      </View>
      <View style={styles.holdingsCointainer}>
        <Text style={styles.title}>
          {item.value.toLocaleString("en-US", {currency: "USD", style: "currency", minimumFractionDigits: 2, useGrouping: true})}
        </Text>
        <Text style={styles.symbol}>
          {item.quantity} {item.symbol.toUpperCase()}
        </Text>
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
    display: "grid",
    flexDirection: "row",
    padding: 15
  },
  assetContainer: {
    width: 100,
    alignItems: "flex-start"
  },
  priceContainer: {
    marginLeft: "auto",
    alignItems: "flex-end",
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
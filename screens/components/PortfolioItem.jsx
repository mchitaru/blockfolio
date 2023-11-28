import { Text, View, Image, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const PortfolioItem = ({item, total}) => {
  const changeColor = (item.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784") || "white";

  return ( 
    <View style={styles.itemContainer}>
      <View style={styles.assetContainer}>
        <Image
          source={{uri: item.image}}
          width={30}
          height={30}
          style={styles.image}
        />
        <Text style={styles.title}>{item.symbol.toUpperCase()}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.number}>
          {item.current_price.toLocaleString("en-US", {currency: "USD", style: "currency", minimumFractionDigits: 2, useGrouping: true})}
        </Text>
        <View style={styles.priceChangeContainer}>
          <AntDesign 
            name={(item.price_change_percentage_24h < 0 ? "caretdown": "caretup") || "caretup"}
            size={14} 
            color={changeColor}
            style={styles.caretIcon}
          />
          <Text style={StyleSheet.flatten([styles.priceChangePercentage, {color: changeColor}])}>{item.price_change_percentage_24h.toFixed(2)}%</Text>
        </View>
      </View>
      <View style={styles.holdingsCointainer}>
        <Text style={styles.number}>
          {/* {item.value.toLocaleString("en-US", {currency: "USD", style: "currency", minimumFractionDigits: 2, useGrouping: true})} */}
          {((item.value/total) * 100.00).toFixed(2)}%
        </Text>
        <Text style={styles.symbol}>
          {item.quantity} {item.symbol.toUpperCase()}
        </Text>
      </View>
      <View style={styles.notificationsCointainer}>
        <FontAwesome name="bell-o" size={20} color="white" />
      </View>
    </View>
   );
}

const styles = StyleSheet.create({
  image: {
    marginRight: 10,
    alignSelf: 'center'
  },
  title: {
    color: "white",
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: "bold"
  },
  number: {
    color: "white",
    fontSize: 16,
  },
  symbol: {
    color: "grey",
    fontWeight: "500"
  },
  itemContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#282828',
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  assetContainer: {
    flexDirection: "row",
    minWidth: 80,
    marginRight: "auto",
    // backgroundColor: "grey",
    alignItems: "flex-start"
  },
  priceContainer: {
    minWidth: 100,
    // backgroundColor: "grey",
    alignItems: "flex-end",
  },
  holdingsCointainer: {
    minWidth: 100,
    // backgroundColor: "grey",
    alignItems: "flex-end"
  },
  notificationsCointainer: {
    marginLeft: 20,
    marginRight: 5,
    alignSelf: 'center'
  },
  priceChangeContainer: {
    flexDirection: "row",
  },
  priceChangePercentage: {
    fontWeight: "600"
  },
  caretIcon: {
    alignSelf: 'center',
    marginRight: 5
  },
});
 
export default PortfolioItem;
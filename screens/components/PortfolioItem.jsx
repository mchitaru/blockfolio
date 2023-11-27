import { Text, View, Image, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const PortfolioItem = ({item}) => {
  return ( 
    <View style={styles.itemContainer}>
      <Image
        source={{uri: item.image}}
        width={30}
        height={30}
        style={styles.image}
      />
      <Text style={styles.title}>{item.symbol.toUpperCase()}</Text>
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
          <Text style={styles.priceChangePercentage}>{item.price_change_percentage_24h.toFixed(2)}%</Text>
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
      <View style={styles.notificationsCointainer}>
        <FontAwesome name="bell" size={24} color="white" />
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
    fontWeight: "bold",
    alignSelf: 'center'
  },
  symbol: {
    color: "grey",
    fontWeight: "600"
  },
  itemContainer: {
    display: "grid",
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#282828',
    padding: 15,
  },
  assetContainer: {
    width: 70,
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
  },
  notificationsCointainer: {
    marginLeft: "auto",
    alignSelf: 'center'
  }
});
 
export default PortfolioItem;
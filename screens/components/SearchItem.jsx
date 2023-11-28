import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchItem = ({item}) => {
  const navigation = useNavigation();
    
  return ( 
    <Pressable 
      style={styles.coinContainer}
      onPress={() => navigation.navigate("AddTransaction", {id: item.id, image: item.large, symbol: item.symbol})}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.large}}
          width={30}
          height={30}
        />
        <View>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </View>
    </Pressable>
   );
}

const styles = StyleSheet.create({
  coinContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
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
 
export default SearchItem;
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { usePortfolio } from "../contexts/PortfolioContext";
import PortfolioHeader from "./components/PortfolioHeader";
import { getCoinPrice } from "../lib/api";

const AddTransactionScreen = ({route, navigation}) => {
  const {id, image, symbol} = route.params;
  const {portfolio, storeTransaction, removeTransaction} = usePortfolio();

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [buy, setBuy] = useState(true);

  const addTransaction = async () => {
    await storeTransaction(
      { 
        id, 
        date: Date.now(), 
        quantity:( buy ? quantity: -quantity ),
        price
      }
    );
    navigation.navigate("Portfolio");
  }

  const fetchMarketPrice = async () => {    

    if(loading) return;
    
    setLoading(true);
    const coinPrice = await getCoinPrice([id]);
    setPrice(coinPrice[id]?.usd || 0);
    setLoading(false);    
  }

  useEffect(() => {
    fetchMarketPrice();
  }, []);

  return ( 
      <View style={{flex: 1}}>
        <PortfolioHeader
          id={id}
          image={image}
          symbol={symbol}
        />
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Pressable 
            style={StyleSheet.flatten([styles.tabContainer, {borderBottomWidth: (buy?1:0)}])}
            onPress={() => setBuy(true)}
          >
            <Text style={styles.tabText}>Buy</Text>
          </Pressable>
          <Pressable 
            style={StyleSheet.flatten([styles.tabContainer, {borderBottomWidth: (buy?0:1)}])}
            onPress={() => setBuy(false)}
          >
            <Text style={styles.tabText}>Sell</Text>
          </Pressable>
        </View>
        <View style={styles.quantityContainer}>
          <View style={styles.inputContainer}>
            <TextInput 
              value={quantity} 
              placeholder="0"
              placeholderTextColor="white"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={setQuantity}
            />
            <Text style={styles.symbol}>{symbol}</Text>
          </View>
          <Text style={styles.pricePerCoin}>
            {price.toLocaleString("en-US", {currency: "USD", style: "currency", minimumFractionDigits: 2, useGrouping: true})} per coin
          </Text>
        </View>
        <Pressable 
          style={styles.buttonContainer}
          onPress={addTransaction}
        >
          <Text style={styles.buttonText}>Add transaction</Text>
        </Pressable>
      </View>
   );
}
 
const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5
  },
  input: {
    color: "white",
    fontSize: 90,
  },
  symbol: {
    color: "grey",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 25,
    marginLeft: 5

  },
  inputContainer: {
    flexDirection: "row"
  },
  quantityContainer: {
    alignItems: "center",
    marginTop: 50,
    flex: 1
  },
  buttonContainer: {
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600"
  },
  pricePerCoin: {
    color: "grey",
    fontWeight: "600",
    fontSize: 17
  },
  tabContainer: {
    padding: 10,
    textDecorationColor: "white",
    alignItems: "center",
    marginVertical: 30,
    width: "40%",
    borderBottomColor: "white"
  },
  tabText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600"
  },
});

export default AddTransactionScreen;
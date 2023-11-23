import { StyleSheet, Text, View } from "react-native";

import PortfolioList from "./components/PortfolioList";

const PortfolioScreen = () => {
  return (
    <View>
      <PortfolioList />
    </View>
  )
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
 
export default PortfolioScreen;
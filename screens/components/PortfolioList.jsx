import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import PortfolioItem from "./PortfolioItem";

const PortfolioList = () => {
  const navigator = useNavigation();

  const handleHeader = () => {
    return (
      <>
        <View style={styles.balanceContainer}>
          <View>
            <Text style={styles.balance}>Current balance</Text>
            <Text style={styles.balanceValue}>$20000</Text>
            <Text style={styles.valueChange}>$1000 (All Time)</Text>
          </View>
          <View style={styles.percentageChangeContainer}>
            <AntDesign 
              name={"caretup"}
              size={14} 
              color="white"
              style={styles.caretIcon}
            />
            <Text style={styles.percentageChange}>1.2%</Text>
          </View>
        </View>
        <View>
          <Text style={styles.assetsTitle}>Your assets</Text>
        </View>
      </>
    )
  }

  const handleFooter = () => {
    return (
      <Pressable 
        style={styles.buttonContainer}
        onPress={() => (navigator.navigate("SelectMarket"))}
      >
        <Text style={styles.buttonText}>Add transaction</Text>
      </Pressable>
    )
  }

  return ( 
    <View>
      <FlatList 
        data={[{id: "bitcoin"}]}
        renderItem={(item) => <PortfolioItem data={item}/>}
        ListHeaderComponent={handleHeader}
        ListFooterComponent={handleFooter}
      />
    </View>
   );
}

const styles = StyleSheet.create({
  balance: {
    color: "white",
    fontWeight: "600",
    fontSize: 15
  },
  balanceValue: {
    color: "white",
    fontSize: 40,
    fontWeight: "700"
  },
  valueChange: {
    color: "#16c784",
    fontWeight: "600",
    fontSize: 16
  },
  percentageChange: {
    color: "white",
    fontWeight: "500",
    fontSize: 17
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10
  },
  percentageChangeContainer: {
    flexDirection: "row",
    backgroundColor: "#16c784",
    paddingHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 5
  },
  assetsTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600"
  },
  caretIcon: {
    alignSelf: 'center',
    marginRight: 5
  }
});
 
export default PortfolioList;
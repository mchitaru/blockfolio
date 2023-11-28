import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PortfolioItem from "./PortfolioItem";

const PortfolioList = ({data, loading}) => {
  const navigator = useNavigation();

  const handleHeader = () => {
    return (
      <View>
        <Text style={styles.assetsTitle}>Your assets</Text>
      </View>
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
        data={data}
        refreshing={loading} 
        renderItem={({item}) => <PortfolioItem item={item}/>}
        ListHeaderComponent={handleHeader}
        ListFooterComponent={handleFooter}
      />
    </View>
   );
}

const styles = StyleSheet.create({
  assetsTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#00005F",
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
});
 
export default PortfolioList;
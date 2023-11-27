import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation  } from "@react-navigation/native";

const PortfolioHeader = ({id = null, text = null, image = null, symbol = null}) => {

  const navigation = useNavigation();

  return ( 
    <View style={styles.container}>
      <Ionicons 
        name="chevron-back-sharp" 
        size={30} 
        color="white"
        onPress={() => navigation.goBack()}
      />
      {text && 
      <Text style={styles.text}>{text}</Text>}
      <View style={styles.symbolContainer}>
        {image && 
          <Image 
            source={{uri: image}}
            width={25}
            height={25}
        />}
        {symbol &&
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>}
      </View>
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  symbolContainer: {
    flexDirection: "row", 
    alignItems: "center",
    marginHorizontal: 5,
    marginRight: "auto"
  },
  symbol: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 5
  },
  text: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 5,
    marginRight: "auto"
  },
});
 
export default PortfolioHeader;
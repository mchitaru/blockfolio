import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CoinHeader = ({image, symbol, rank}) => {
  return ( 
    <View style={styles.container}>
      <Ionicons name="chevron-back-sharp" size={30} color="white" />
      <View style={styles.tickerContainer}>
        <Image 
          source={{uri: image}}
          width={25}
          height={25}
        />
        <Text style={styles.ticker}>{symbol.toUpperCase()}</Text>
        <View style={styles.badge}>
            <Text style={styles.rank}>{rank}</Text>
        </View>
      </View>
      <Ionicons name="person-circle-outline" size={24} color="white" />
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
  tickerContainer: {
    flexDirection: "row", 
    alignItems: "center"
  },
  ticker: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 5
  },
  rank: {
    color: "white",
    fontWeight: "bold"
  },
  badge: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#585858',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5
  },
});
 
export default CoinHeader;
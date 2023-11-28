import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation  } from "@react-navigation/native";

import { useWatchlist } from "../../contexts/WatchlistContext";

const MarketHeader = ({id, image, symbol, rank}) => {

  const navigation = useNavigation();
  const {watchlist, storeData, removeData} = useWatchlist();
  console.log(watchlist);

  const isWatchlisted = () => (watchlist.some((item) => (item === id)));

  const handleClick = () => {
    isWatchlisted() ? removeData(id) : storeData(id);
  }

  return ( 
    <View style={styles.container}>
      <Ionicons 
        name="chevron-back-sharp" 
        size={30} 
        color="white"
        onPress={() => navigation.goBack()}
      />
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
      <FontAwesome 
        name={isWatchlisted() ? "star" : "star-o"} 
        size={20} 
        color="white"
        onPress={handleClick}
      />
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
 
export default MarketHeader;
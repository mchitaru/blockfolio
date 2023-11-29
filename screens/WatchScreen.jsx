import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import CoinItem from '../components/CoinItem';
import { useWatchlist } from '../contexts/WatchlistContext';
import { getMarketData } from '../lib/api';

const PAGE_SIZE = 50;

const WatchScreen = () => {
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const {watchlist} = useWatchlist();
  
  const screenHeight = Dimensions.get("window").height;
  
  const fetchMarketData = async (page) => {    

    if(loading) return;
    if(!Number.isInteger(page)) return;
    
    if(watchlist.length === 0) {
      setData([]);
    } else {
      setLoading(true);
      const mdata = await getMarketData(watchlist, page, PAGE_SIZE);
      setData((prevData) => (page === 1 ? mdata : prevData.concat(mdata)));
      setLoading(false);    
    }

  }

  useEffect(() => {
    fetchMarketData(1);
  }, [watchlist]);

  const handleEmpty = () => {
    return (
      <View style={StyleSheet.flatten([styles.emptyContainer, { height: screenHeight*0.7 } ])}>
        <Text style={styles.emptyText}>Nothing here</Text>
      </View>
    )
};

  const handleLoading = () => {
    return (
      loading && <ActivityIndicator size="large" /> ||
      <></>
      );
  };

  return ( 
    <View>
      <Text style={styles.title}>Watchlist</Text>
      <FlatList 
        data={data}
        renderItem={({item}) => (<CoinItem item={item}/>)}
        keyExtractor={item => item.id} 
        onEndReached={() => {
          fetchMarketData(data.length / PAGE_SIZE + 1);
        }}
        refreshing={loading} 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        ListFooterComponent={handleLoading}
        ListEmptyComponent={handleEmpty}
        refreshControl={
          <RefreshControl
            refreshing={loading} 
            tintColor="white"
            onRefresh={() => fetchMarketData(1)}
          />
        }
      />
    </View>
   );
}
 
const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingBottom: 5
  },
  emptyContainer: {
    alignItems: "center", 
    flex: 1, 
    justifyContent: "center"
  },
  emptyText: {
    color: "white", 
    fontSize: 20, 
    fontWeight: "bold"
  },
});

export default WatchScreen;
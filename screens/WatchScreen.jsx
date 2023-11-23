import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import CoinItem from '../components/CoinItem';
import { useWatchlist } from '../contexts/WatchlistContext';

import { getMarketData } from '../lib/api';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 50;

const WatchScreen = () => {
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const {watchlist} = useWatchlist();
  
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
    return <Text style={{color: "white"}}> No data present!</Text>;
  };

  const handleLoading = () => {
    return (
      loading && <ActivityIndicator size="large" /> ||
      <></>
      );
  };

  if(data.length === 0) {
    return (
      <View style={{alignItems: "center", flex: 1, justifyContent: "center"}}>
        <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Nothing here</Text>
      </View>
    );
  }
  
  return ( 
    <FlatList 
      data={data}
      renderItem={({item}) => (<CoinItem item={item}/>)}
      keyExtractor={item => item.id} 
      onEndReached={() => {
        fetchMarketData(data.length / PAGE_SIZE + 1);
      }}
      refreshing={loading} 
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
   );
}
 
export default WatchScreen;
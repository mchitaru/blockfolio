import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import CoinItem from '../components/CoinItem';
import { useEffect, useState } from 'react';

import { getMarketData } from "../lib/api";

const PAGE_SIZE = 50;

const MarketsScreen = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchMarketData = async (page) => {    

    if(loading) return;
    if(!Number.isInteger(page)) return;
    
    setLoading(true);
    const mdata = await getMarketData(page, PAGE_SIZE);
    setData((prevData) => (page === 1 ? mdata : prevData.concat(mdata)));
    setLoading(false);    
  }

  useEffect(() => {
    fetchMarketData(1);
  }, []);

  const handleLoading = () => {
    return (
        <ActivityIndicator size="large" />
      );
  };
  
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
 
export default MarketsScreen;
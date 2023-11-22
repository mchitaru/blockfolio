import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import CoinItem from '../components/CoinItem';
import { useEffect, useState } from 'react';

import { getMarketData } from "../lib/api";

const HomeScreen = () => {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchMarketData = async () => {    

    if(loading) return;
    
    setLoading(true);
    const mdata = await getMarketData(page);
    setData((prevData) => ([...prevData, ...mdata]));
    setLoading(false);

    console.log("fetch");
  }

  useEffect(() => {
    fetchMarketData();
  }, [page]);

  if(loading || !data) {
    return <ActivityIndicator size="large" />
  }  
  return ( 
    <FlatList 
      data={data}
      renderItem={({item}) => (<CoinItem item={item}/>)}
      keyExtractor={item => item.id}
      onEndReachedThreshold={0.2}
      onEndReached={() => setPage(data.length / 10 + 1)}
      refreshControl={
        <RefreshControl
          refreshing={loading} 
          tintColor="white"
          onRefresh={() => setPage(1)}
        />
      }
    />
   );
}
 
export default HomeScreen;
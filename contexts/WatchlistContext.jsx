import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

const WatchlistProvider = ({children}) => {
  const [watchlist, setWatchlist] = useState([]);

  const storeData = async (id) => {

    if(!id) return;

    try {
      const list = [...watchlist, id];
      const jsonValue = JSON.stringify(list);
      await AsyncStorage.setItem("watchlist", jsonValue);
      setWatchlist(list);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("watchlist");
      setWatchlist(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };  

  const removeData = async (id) => {

    if(!id) return;

    try {
      const list = watchlist.filter((item) => (item !== id));
      const jsonValue = JSON.stringify(list);
      await AsyncStorage.setItem("watchlist", jsonValue);
      setWatchlist(list);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  return ( 
    <WatchlistContext.Provider value={{watchlist, storeData, removeData}}>
      {children}
    </WatchlistContext.Provider>
   );
}
 
export default WatchlistProvider;
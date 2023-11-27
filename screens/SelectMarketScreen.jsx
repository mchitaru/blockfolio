import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput } from "react-native";

import PortfolioHeader from "./components/PortfolioHeader";
import SearchItem from "./components/SearchItem";

import { useEffect, useState } from 'react';

import { searchMarkets } from "../lib/api";
import { debounce } from "../lib/utils";

const SelectMarketScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchSearchResults = async (query) => {    

    if(loading) return;

    setLoading(true);
    const mdata = await searchMarkets(query);
    setData(mdata);
    setLoading(false);    
  }
        
  const debouncedSearch = debounce(fetchSearchResults, 500);

  const handleSearch = (text) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  
  const handleHeader = () => {
    return (
      <Text style={styles.assetsTitle}>Markets</Text>
    )
  }

  return ( 
    <View>
      <PortfolioHeader
        text="Add transaction"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        placeholder="Search..."
        placeholderTextColor="white"
      />
      <FlatList 
        data={data}
        renderItem={({item}) => (<SearchItem item={item}/>)}
        ListHeaderComponent={handleHeader}
      />
    </View>
   );
}

const styles = StyleSheet.create({
  assetsTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    padding: 10,
  },
  input: {
    color: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "white",
    backgroundColor: "grey"
  },
});
 
export default SelectMarketScreen;
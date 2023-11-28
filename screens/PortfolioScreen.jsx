import { View, Text, FlatList, StyleSheet, Pressable, RefreshControl } from "react-native";
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import PortfolioItem from "./components/PortfolioItem";
import { usePortfolio } from "../contexts/PortfolioContext";
import { getMarketData } from '../lib/api';
import { computePortfolio } from "../lib/utils";

const PAGE_SIZE = 50;

const PortfolioScreen = () => {
  const navigation = useNavigation();
  const { portfolio } = usePortfolio();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchMarketData = async (page) => {    

    if(loading) return;
    if(!Number.isInteger(page)) return;
    
    if(portfolio.length === 0) {
      setData([]);
    } else {
      setLoading(true);
      const ids = portfolio.map((item) => (item.id));
      const mdata = await getMarketData(ids, page, PAGE_SIZE);
      const fulldata = computePortfolio(portfolio, mdata);
      setData((prevData) => (page === 1 ? fulldata.assets : prevData.concat(fulldata.assets)));
      setLoading(false);    
    }
  }

  useEffect(() => {
    fetchMarketData(1);
  }, [portfolio]);

  const handleHeader = () => {
    return (
      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.balance}>Portfolio 1</Text>
          <Text style={styles.balanceValue}>$20000</Text>
        </View>
        <View>
          <View style={styles.percentageChangeContainer}>
            <AntDesign 
              name={"caretup"}
              size={14} 
              color="#16c784"
              style={styles.caretIcon}
            />
            <Text style={styles.percentageChange}>1.2%</Text>
          </View>
          <AntDesign 
            name="areachart" 
            size={24} color="white" 
            style={styles.chartIcon}
          />          
        </View>
      </View>
    )
  }

  const handleFooter = () => {
    return (
      <Pressable 
        style={styles.buttonContainer}
        onPress={() => (navigation.navigate("SelectMarket"))}
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
        refreshControl={
          <RefreshControl
            refreshing={loading} 
            tintColor="white"
            onRefresh={() => {}}
          />
        }  
      />
    </View>
  )
}

const styles = StyleSheet.create({
  balance: {
    color: "white",
    fontWeight: "600",
    fontSize: 15
  },
  balanceValue: {
    color: "white",
    fontSize: 40,
    fontWeight: "700"
  },
  valueChange: {
    color: "#16c784",
    fontWeight: "600",
    fontSize: 16
  },
  percentageChange: {
    color: "#16c784",
    fontWeight: "500",
    fontSize: 18
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: "#00005F",
    borderRadius: 15
  },
  percentageChangeContainer: {
    flexDirection: "row",
    // backgroundColor: "#16c784",
    paddingHorizontal: 5,
    // paddingVertical: 20,
    borderRadius: 5,
  },
  caretIcon: {
    alignSelf: 'center',
    marginRight: 5,
  },
  chartIcon: {
    alignSelf: "flex-end",
    marginRight: 5,
    paddingVertical: 15
  },
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
 
export default PortfolioScreen;
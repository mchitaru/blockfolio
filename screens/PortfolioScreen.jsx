import { View, Text, FlatList, StyleSheet, Pressable, RefreshControl } from "react-native";
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

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
  const [value, setValue] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  const changeColor = (percentageChange < 0 ? "#ea3943" : "#16c784") || "white";

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
      setValue(fulldata.value);
      setPercentageChange(fulldata.percentageChange);
      setData((prevData) => (page === 1 ? fulldata.assets : prevData.concat(fulldata.assets)));
      setLoading(false);    
    }
  }

  useEffect(() => {
    fetchMarketData(1);
  }, [portfolio]);

  const handleHeader = () => {
    return (
      <View>
        <View style={styles.balanceContainer}>
          <View>
            <Text style={styles.balance}>Portfolio 1</Text>
            <Text style={styles.balanceValue}>
              {value.toLocaleString("en-US", {currency: "USD", style: "currency", minimumFractionDigits: 2, useGrouping: true})}
            </Text>
          </View>
          <View>
            <View style={styles.percentageChangeContainer}>
              <AntDesign 
                name={(percentageChange < 0 ? "caretdown": "caretup") || "caretup"}
                size={14} 
                color={changeColor}
                style={styles.caretIcon}
              />
              <Text style={StyleSheet.flatten([styles.percentageChange, {color: changeColor}])}>{percentageChange.toFixed(2)}%</Text>
            </View>
            <AntDesign 
              name="areachart" 
              size={20} color="white" 
              style={styles.chartIcon}
            />          
          </View>
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.assetContainer}>          
            <Text style={styles.headerText}>Asset</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.headerText}>Price</Text>
          </View>
          <View style={styles.allocationContainer}>
            <Text style={styles.headerText}>Allocation</Text>
          </View>
          <View style={styles.notificationsCointainer}>
            <FontAwesome name="bell" size={10} color="white" />
          </View>
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
        renderItem={({item}) => <PortfolioItem item={item} total={value}/>}
        ListHeaderComponent={handleHeader}
        ListFooterComponent={handleFooter}
        refreshControl={
          <RefreshControl
            refreshing={loading} 
            tintColor="white"
            onRefresh={() => fetchMarketData(1)}
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
    fontSize: 30,
    fontWeight: "700",
    paddingTop: 10
  },
  valueChange: {
    color: "#16c784",
    fontWeight: "600",
    fontSize: 16
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: "#00005F",
    borderRadius: 15
  },
  percentageChange: {
    color: "#16c784",
    fontWeight: "500",
  },
  percentageChangeContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  caretIcon: {
    alignSelf: 'center',
    marginRight: 5,
  },
  chartIcon: {
    alignSelf: "flex-end",
    marginRight: 5,
    paddingTop: 10,
    marginVertical: 10,    
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#282828',
  },
  assetContainer: {
    minWidth: 80,
    marginRight: "auto",
    alignItems: "flex-start"
  },
  priceContainer: {
    minWidth: 150,
    alignItems: "flex-end",
  },
  allocationContainer: {
    minWidth: 100,
    alignItems: "flex-end"
  },
  notificationsCointainer: {
    marginLeft: 25,
    marginRight: 10,
    alignSelf: 'center'
  },
  headerText: {
    color: "grey",
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
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import PortfolioList from "./components/PortfolioList";
import { usePortfolio } from "../contexts/PortfolioContext";
import { getMarketData } from '../lib/api';
import { computePortfolio } from "../lib/utils";

const PAGE_SIZE = 50;

const PortfolioScreen = () => {
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

  return (
    <View>
      <View style={styles.balanceContainer}>
        <View>
          <Text style={styles.balance}>Current balance</Text>
          <Text style={styles.balanceValue}>$20000</Text>
          <Text style={styles.valueChange}>$1000 (All Time)</Text>
        </View>
        <View style={styles.percentageChangeContainer}>
          <AntDesign 
            name={"caretup"}
            size={14} 
            color="white"
            style={styles.caretIcon}
          />
          <Text style={styles.percentageChange}>1.2%</Text>
        </View>
      </View>
      <PortfolioList 
        data={data}
        loading={loading}
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
    color: "white",
    fontWeight: "500",
    fontSize: 17
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    padding: 15,
    // backgroundColor: "#00008F",
    // borderRadius: 15
  },
  percentageChangeContainer: {
    flexDirection: "row",
    backgroundColor: "#16c784",
    paddingHorizontal: 3,
    paddingVertical: 8,
    borderRadius: 5
  },
  caretIcon: {
    alignSelf: 'center',
    marginRight: 5,
  }

});
 
export default PortfolioScreen;
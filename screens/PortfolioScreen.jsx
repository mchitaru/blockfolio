import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from 'react';

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
      <PortfolioList 
        data={data}
        loading={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
});
 
export default PortfolioScreen;
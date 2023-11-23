import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CoinHeader from "./components/CoinHeader";
import { AntDesign } from '@expo/vector-icons';
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { useRoute } from "@react-navigation/native";

import { getCoinData, getCoinChart } from "../lib/api";
import { useEffect, useState } from "react";

const CoinScreen = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chart, setChart] = useState([]);

  const route = useRoute();
  const id = route.params.id;

  const screenWidth = Dimensions.get("window").width;

  const formatPrice = ({ value }) => {
    "worklet";

    const price = Number(value != "" ? value : data.market_data.current_price.usd);
    return price.toLocaleString("en-US", {currency: "USD", style: "currency", minimumFractionDigits: 2, useGrouping: true});
  };

  const fetchCoinData = async () => {    

    setLoading(true);

    const data = await getCoinData(id);
    setData(data);

    const chart = await getCoinChart(id);
    setChart(chart);

    setLoading(false);
  }

  useEffect(() => {
    fetchCoinData();
  }, []);

  if(loading || data.length === 0 || chart.length === 0) {
    return <ActivityIndicator size="large" />
  }

  const priceColor = data.market_data.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
  const chartColor = data.market_data.current_price.usd > chart.prices[0][1] ? "#16c784" : "#ea3943";

  return ( 
      <LineChart.Provider
        data={chart.prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <View style={{paddingHorizontal: 10}}>
          <CoinHeader
            id={data.id}
            image={data.image.small}
            symbol={data.symbol}
            rank={data.market_data.market_cap_rank}
          />
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.name}>
                {data.name}
              </Text>
              <LineChart.PriceText
                format={formatPrice}
                style={styles.price}
              />
            </View>
            <View style={StyleSheet.flatten([styles.priceChangeContainer, {backgroundColor: priceColor}])}>
              <AntDesign 
                name={data.market_data.price_change_percentage_24h < 0 ? "caretdown": "caretup"}
                size={14} 
                color="white"
              />
              <Text style={styles.priceChange}>
                {data.market_data.price_change_percentage_24h.toFixed(2)}
              </Text>
            </View>
          </View>
          <LineChart height={screenWidth / 2}>
            <LineChart.Path color={chartColor} />
            <LineChart.CursorCrosshair color={chartColor} />
          </LineChart>
        </View>
      </LineChart.Provider>
   );
}

const styles = StyleSheet.create({
  name: {
    color: "white", 
    fontSize: 15
  },
  price: {
    color: "white", 
    fontSize: 30, 
    fontWeight: "bold",
  },
  priceContainer: {
    padding: 15, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  priceChangeContainer: {
    padding: 5,
    borderRadius: 5,
    flexDirection: "row"
  },
  priceChange: {
    color: "white", 
    fontSize: 17,
    fontWeight: "500"
  }
});
 
export default CoinScreen;
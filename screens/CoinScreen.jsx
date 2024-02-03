import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import MarketHeader from "./components/MarketHeader";
import { AntDesign } from '@expo/vector-icons';
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

import { getCoinData, getCoinChart } from "../lib/api";
import ChartFilter from "./components/ChartFilter";

const chartFilterDays = [
  { days: "1", text: "24h" },
  { days: "7", text: "7d" },
  { days: "30", text: "30d" },
  { days: "365", text: "1y" },
  { days: "max", text: "All" },
];

const CoinScreen = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);
  const [selectedRange, setSelectedRange] = useState("1");

  const route = useRoute();
  const id = route.params.id;

  const screenWidth = Dimensions.get("window").width;

  const formatPrice = ({ value }) => {
    "worklet";

    const price = Number(value != "" ? value : (data?.market_data.current_price.usd || 0));
    return price.toLocaleString("en-US", {currency: "USD", style: "currency", minimumFractionDigits: 2, useGrouping: true});
  };

  const fetchCoinData = async () => {    

    setLoading(true);

    const data = await getCoinData(id);
    setData(data);

    setLoading(false);
  }

  const fetchChartData = async (range) => {    

    setChart(null);
    const chart = await getCoinChart(id, range);
    setChart(chart);
  }

  useEffect(() => {
    fetchCoinData();
    fetchChartData(1);
  }, []);

  const onSelectedRangeChange = (range) => {
    setSelectedRange(range);
    fetchChartData(range);
  };

  const memoOnSelectedRangeChange = useCallback((range) => 
    onSelectedRangeChange(range), 
  []);

  if(loading || !data || !chart) {
    return <ActivityIndicator size="large" />
  }

  const priceColor = data.market_data.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  const chartColor = data.market_data.current_price.usd > chart?.prices[0][1] ? "#16c784" : "#ea3943" || "white";

  return ( 
      <LineChart.Provider
        data={chart?.prices.map(([timestamp, value]) => ({ timestamp, value })) || {}}
      >
        <View style={{paddingHorizontal: 10}}>
          <MarketHeader
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
                style={styles.caretIcon}
              />
              <Text style={styles.priceChange}>
                {data.market_data.price_change_percentage_24h?.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.filtersContainer}>
            {chartFilterDays.map((item) => (
              <ChartFilter
                key={item.text}
                days={item.days}
                text={item.text}
                selectedRange={selectedRange}
                setSelectedRange={memoOnSelectedRangeChange}
              />
            ))}
          </View>
          <LineChart width={screenWidth}>
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
  },
  caretIcon: {
    alignSelf: "center", 
    marginRight: 5
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2B2B2B",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 20
  },  
});
 
export default CoinScreen;
import axios from "axios";
import data from '../assets/data/cryptocurrencies.json';

export const getMarketData = async (page) => {
  try {

    console.log(`Page: ${page}`);

    if(page > 6) return [];

    return data[page - 1];
        
    // const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=24h&locale=en`);
    // return res.data;

  } catch (e) {
    console.log(e);
    return [];
  }
}

export const getCoinData = async (id) => {
  try {

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    return res.data;

  } catch (e) {
    console.log(e);
  }
}

export const getCoinChart = async (id) => {
  try {

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&precision=full`);
    return res.data;

  } catch (e) {
    console.log(e);
  }
}
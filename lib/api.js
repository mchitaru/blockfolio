import axios from "axios";
import data from '../assets/data/markets.json';
import coin from '../assets/data/coin.json';
import chart from '../assets/data/chart.json';

const DEBUG = 1;

export const getMarketData = async (page, size) => {
  try {

    if(DEBUG) {      
      if(page > data.length) return [];
      return data[page - 1];
    }
        
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${size}&page=${page}&sparkline=false&price_change_percentage=24h&locale=en`);
    return res.data;

  } catch (e) {
    console.log(e);
    return [];
  }
}

export const getCoinData = async (id) => {
  try {

    if(DEBUG) {      
      return coin;
    }

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    return res.data;

  } catch (e) {
    console.log(e);
    return [];
  }
}

export const getCoinChart = async (id) => {
  try {

    if(DEBUG) {      
      return chart;
    }

    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&precision=full`);
    return res.data;

  } catch (e) {
    console.log(e);
    return [];
  }
}
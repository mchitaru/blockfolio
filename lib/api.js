import axios from "axios";
import markets from '../assets/data/markets.json';
import watchlist from '../assets/data/watchlist.json';
import coin from '../assets/data/coin.json';
import price from '../assets/data/price.json';
import chart from '../assets/data/chart.json';
import search from '../assets/data/search.json';

const DEBUG = 1;

export const getMarketData = async (ids, page, size) => {
  try {

    const formatIds = (ids) => (ids.join("%2c"));

    if(DEBUG) {      

      if(ids.length === 0){
        if(page > markets.length) return [];
        return markets[page - 1];  
      }else{
        if(page > watchlist.length) return [];
        return watchlist[page - 1];  
      }
    }
        
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${formatIds(ids)}&order=market_cap_desc&per_page=${size}&page=${page}&sparkline=false&price_change_percentage=24h&locale=en`);
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

export const getCoinPrice = async (ids) => {
  try {

    const formatIds = (ids) => (ids.join("%2c"));

    if(DEBUG) {      
      return price;
    }

    const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${formatIds}&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`);
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

export const searchMarkets = async (query) => {
  try {

    if(DEBUG) {      

      return search.coins;  
    }

    const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
    return res.data.coins;

  } catch (e) {
    console.log(e);
    return [];
  }
}

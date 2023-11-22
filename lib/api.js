import axios from "axios";

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
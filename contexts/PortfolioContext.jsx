import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

const PortfolioProvider = ({children}) => {
  const [portfolio, setPortfolio] = useState([]);

  const storeTransaction = async ({id, date, quantity, price}) => {

    if(!id) return;

    try {
      const list = [...portfolio, 
        {
          key: id + uuid.v4(), 
          id, 
          date, 
          quantity,
          price
        }
      ];
      const jsonValue = JSON.stringify(list);
      await AsyncStorage.setItem("portfolio", jsonValue);
      setPortfolio(list);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTransactions = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("portfolio");
      setPortfolio(jsonValue != null ? JSON.parse(jsonValue) : []);
      console.log(portfolio);
    } catch (e) {
      console.log(e);
    }
  };  

  const removeTransaction = async (key) => {

    if(!key) return;

    try {
      const list = portfolio.filter((item) => (item !== key));
      const jsonValue = JSON.stringify(list);
      await AsyncStorage.setItem("portfolio", jsonValue);
      setPortfolio(list);
    } catch (e) {
      console.log(e);
    }
  }

  const removeAllTransactions = async () => {
    try {
      await AsyncStorage.clear();
      setPortfolio([]);
    } catch (e) {
      console.log(e);
    }    
  }

  useEffect(() => {
    // removeAllTransactions();
    fetchTransactions();
  }, [])
  return ( 
    <PortfolioContext.Provider value={{portfolio, storeTransaction, removeTransaction}}>
      {children}
    </PortfolioContext.Provider>
   );
}
 
export default PortfolioProvider;
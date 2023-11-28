let timer = null;
export const debounce = (func, timeout = 300) => {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export const computePortfolio = (transactions, mdata) => {
  let totalValue = 0;
  let percentageChange = 0;
  return {
    assets: mdata.map((asset) => {
      let quantity = 0;
      let currentValue = 0;
      transactions.forEach(transaction => {
        if(transaction.id === asset.id){
          quantity += transaction.quantity;
          currentValue += transaction.quantity * asset.current_price;
          totalValue += currentValue;
          percentageChange += asset.price_change_percentage_24h;
        }
      });      
      return {
        ...asset,
        value: currentValue,
        quantity: Number(quantity),
      };
    }),
    value: totalValue,
    percentageChange: percentageChange,
  }
}

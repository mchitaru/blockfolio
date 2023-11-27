let timer = null;
export const debounce = (func, timeout = 300) => {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export const computePortfolio = (transactions, mdata) => {
  return {
    value: 0,
    valueChange: 0,
    percentageChange: 0,
    assets: mdata.map((asset) => {
      let quantity = 0;
      let buuyValue = 0;
      let currentValue = 0;
      let priceChange = 0;
      let priceChangePercentage = 0;
      transactions.forEach(transaction => {
        if(transaction.id === asset.id){
          quantity += transaction.quantity;
          currentValue += transaction.quantity * asset.current_price;
        }
      });      
      return {
        ...asset,
        value: currentValue,
        quantity: Number(quantity),
        priceChangePercentage: 1.2
      };
    })
  }
}

import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CoinItem = ({item}) => {
  
  const numberFormat = (value) => {    
    return Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
          }).format(value);
  };

  const priceColor = item.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";

  return ( 
    <View style={styles.coinContainer}>
      <Image 
        source={{uri: item.image}} 
        height={30} 
        width={30}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.badge}>
            <Text style={styles.rank}>{item.market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{item.symbol.toUpperCase()}</Text>
          <AntDesign 
            name={item.price_change_percentage_24h < 0 ? "caretdown": "caretup"}
            size={14} 
            color={priceColor}
            style={styles.caretIcon}
          />
          <Text style={{color: priceColor}}>{item.price_change_percentage_24h.toFixed(2)}%</Text>
        </View>
      </View>
      <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}>
        <Text style={styles.title}>{item.current_price}</Text>
        <Text style={{color: 'white'}}>MCap {numberFormat(item.market_cap)}</Text>
      </View>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00002F',
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3
  },
  text: {
    color: 'white',
    marginRight: 5
  },
  rank: {
    fontWeight: 'bold',
    color: 'white',
  },
  badge: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#585858',
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5
  },
  image: {
    marginRight: 10,
    alignSelf: 'center'
  },
  coinContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#282828',
    padding: 15
  },
  caretIcon: {
    alignSelf: 'center',
    marginRight: 5
  }
});

export default CoinItem;
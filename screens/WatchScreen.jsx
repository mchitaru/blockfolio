import { FlatList } from 'react-native';
import CoinItem from '../components/CoinItem';
import data from '../assets/data/cryptocurrencies.json';

const WatchScreen = () => {
  return ( 
    <FlatList 
      data={data}
      renderItem={({item}) => (<CoinItem item={item}/>)}
    />
   );
}
 
export default WatchScreen;
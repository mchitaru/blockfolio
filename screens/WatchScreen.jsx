import { FlatList } from 'react-native';
import CoinItem from '../components/CoinItem';

const WatchScreen = () => {
  return ( 
    <FlatList 
      data={data}
      renderItem={({item}) => (<CoinItem item={item}/>)}
    />
   );
}
 
export default WatchScreen;
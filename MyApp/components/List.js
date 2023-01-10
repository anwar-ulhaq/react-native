import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';

const url = 'https://media.mw.metropolia.fi/wbma/media/';

const List = () => {

  const {mediaArray} = useMedia();

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item}/>}
    />
  );
};

export default List;

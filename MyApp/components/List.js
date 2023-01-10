import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import {PropTypes} from 'prop-types';

const List = (props) => {

  const {mediaArray} = useMedia();

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={mediaArray}
      renderItem={({item}) => <ListItem
        navigation={props.navigation}
        singleMedia={item}
      />}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;

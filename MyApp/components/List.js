import {useContext} from 'react';
import {FlatList} from 'react-native';
import {PropTypes} from 'prop-types';

import ListItem from './ListItem';
import {useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const List = (props) => {

  const {update} = useContext(MainContext);

  //const {mediaArray} = useMedia(update);
  const {mediaArray} = useTag(update);

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

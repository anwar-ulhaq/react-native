import {useContext} from 'react';
import {FlatList} from 'react-native';
import {PropTypes} from 'prop-types';

import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const List = (props) => {

  const {update} = useContext(MainContext);

  //Loads all media
  const {mediaArray} = useMedia(update);
  //Loads media related to this app
  //const {mediaArray} = useTag(update);

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

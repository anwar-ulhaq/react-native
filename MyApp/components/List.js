import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useEffect, useState} from 'react';

const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {

  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia =  () => {

    try {
      fetch(url)
      .then(response => response.json()
      .then(result => setMediaArray(result),
        error => console.log(error.message),
      ));
    } catch (e) {
      console.log('Error loading media', e);
    }
  }

  useEffect(()=>{
    loadMedia();
  }, []);

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item}/>}
    />
  );
};

export default List;

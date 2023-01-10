import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {useEffect, useState} from 'react';

const url = 'https://media.mw.metropolia.fi/wbma/media/';

const List = () => {

  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = () => {

    try {
      fetch(url).then(response => response.json().then(result => {
          Promise.all(result.map(async (item) => {
            const response = await fetch(url + item.file_id);
            return await response.json();
          })).then(media => {
            console.log(media);
            setMediaArray(media);
          });
        },
        error => console.log(error.message),
      ));
    } catch (e) {
      console.log('Error loading media', e);
    }
  };

  useEffect(() => {
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

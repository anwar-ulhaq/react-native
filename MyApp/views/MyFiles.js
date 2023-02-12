import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {Avatar, Icon, ListItem} from '@rneui/themed';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const MyFiles = ({navigation}) => {

  const {getUserMedia, deleteMedia} = useMedia();
  const [mediaArray, setMediaArray] = useState([]);
  const {update, setUpdate} = useContext(MainContext);

  const loadUserMedia = async () => {

    try {

      const userToken = await AsyncStorage.getItem('userToken');

      await getUserMedia(userToken).then(userMedia => setMediaArray(userMedia));
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  const deleteUserMedia = async (fileId) => {
    try {

      const userToken = await AsyncStorage.getItem('userToken');

      await deleteMedia(fileId, userToken).
        then(userMedia => setMediaArray(userMedia));
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  useEffect(() => {
    loadUserMedia().then(() => console.log('Loading User\'s media'));
  }, [update]);
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={mediaArray}
      renderItem={({item}) => <ListItem>
        <Avatar
          rounded
          size="large"
          source={item?.thumbnails !== undefined ? {
            uri: 'https://media.mw.metropolia.fi/wbma/uploads/' +
              item.thumbnails.w160,
          } : undefined}
          activeOpacity={0.7}
        />
        <ListItem.Content>
          <ListItem.Title>{item?.title}</ListItem.Title>
          <ListItem.Subtitle numberOfLines={3}>
            {item?.description}
          </ListItem.Subtitle>
        </ListItem.Content>

        <Icon
          containerStyle={{margin: 0, padding: 0}}
          size={16}
          solid
          color="rgba(78, 116, 289, 1)"
          //color='#517fa4'
          raised
          reverse={false}
          name="eye"
          type="font-awesome"
          onPress={() => {
            navigation.navigate('Single', item);
          }}
        />
        <Icon
          containerStyle={{margin: 0, padding: 0}}
          size={16}
          solid
          color="rgba(78, 116, 289, 1)"
          //color='#517fa4'
          raised
          reverse={false}
          name="edit"
          type="font-awesome"
          onPress={() => {
            console.log('Single Media: ' + JSON.stringify(item));
            navigation.navigate('Modify', item);
          }}
        />
        <Icon
          containerStyle={{margin: 0, padding: 0}}
          size={16}
          solid
          color="rgba(78, 116, 289, 1)"
          //color='#517fa4'
          raised
          reverse={false}
          name="trash"
          type="font-awesome"
          onPress={() => {
            deleteUserMedia(item?.file_id).then(() => setUpdate(!update));
          }}
        />
      </ListItem>
      }
    />
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;

import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';
import {Card, Icon, ListItem} from '@rneui/themed';

const Profile = ({navigation}) => {

  const {isLoggedIn, setIsLoggedIn, user} = React.useContext(MainContext);
  const [tag, setTag] = useState({});
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getUserAvatar} = useUser();

  const logout = async () => {

    setIsLoggedIn(false);

    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error while logging out: ' + error);
    }
  };

  const loadAvatar = async () => {
    const tag = await getUserAvatar('avatar_' + user.user_id).
      then(tagArray => tagArray[0]);
    setTag(tag);
    setAvatar('https://media.mw.metropolia.fi/wbma/uploads/' + tag.filename);
  };

  useEffect(() => {
    loadAvatar();
  }, [user.user_id]);

  return (
    <Card>
      <View style={{flexDirection: 'row'}}>
        <Icon
          raised
          name="user-circle"
          type="font-awesome"
        />
        <Card.Title h4 h4Style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 24,
          paddingTop: 8,
          marginTop: 8,
          paddingLeft: 8,
        }}>{user.username}</Card.Title>
      </View>
      <Card.Image source={{uri: avatar}}/>
      <ListItem>
        <Icon name="email"/>
        <ListItem.Title>Email: {user.email}</ListItem.Title>
      </ListItem>
      <ListItem>
        <Icon name="badge"/>
        <ListItem.Title>Full name: {user.full_name}</ListItem.Title>
      </ListItem>
      <Button title={'Logout'} onPress={logout}/>
    </Card>
  );
};

export default Profile;

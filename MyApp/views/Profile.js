import React, {useEffect} from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const avatar = 'avatar_';

const Profile = ({navigation}) => {

  const {isLoggedIn, setIsLoggedIn, user} = React.useContext(MainContext);

  const logout = async () => {

    setIsLoggedIn(false);

    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error while logging out: ' + error);
    }
  };

  useEffect(() => {
    //checkToken();
    // Request a list of files by tag
    // https://media.mw.metropolia.fi/wbma/tags/:tag
    console.log('Avatar to load: ' + avatar+user.user_id);
    console.log('username: ' + user.username);
    console.log('email: ' + user.email);
    console.log('fullname: ' + user.fullName);
  }, [user.user_id]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>Username: {user.username}</Text>
      <Image></Image>
      <Text>Email: {user.email}</Text>
      <Text>Full name: {user.fullName ? user.fullName : 'Not available'}</Text>
      <Button title={'Logout'} onPress={logout}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;

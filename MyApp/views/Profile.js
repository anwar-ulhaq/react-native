import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Profile = ({navigation}) => {

  const [isLoggedIn, setIsLoggedIn] = React.useContext(MainContext);

  const logout = async () => {

    setIsLoggedIn(false);

    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error while logging out: ' + error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
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

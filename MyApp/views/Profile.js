import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.outerContainer}>
      <Text style={styles.heading}>Username: {user.username}</Text>
      <Image
        style={styles.profileImage}
        source={{uri: avatar}}
      />
      <Text style={styles.email}>Email: {user.email}</Text>
      <Text style={styles.fullName}>Full name: {user.fullName ? user.fullName : 'Not available'}</Text>
      <Button style={styles.logoutButton} title={'Logout'} onPress={logout}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  outerContainer: {
    flex: 9,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 5,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 15,
  },
  heading: {
    flex:1,
    justifyContent: 'center',
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 5,
  },
  profileImage: {
    flex: 5,
    padding: 30,
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    paddingLeft: 5,
  },
  email: {
    flex:1,
    paddingTop: 10,
    //fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 5,
  },
  fullName: {
    flex:1,
    paddingTop: 10,
    //fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 5,
  },
  logoutButton: {
    flex:1,
    paddingLeft: 5,
  }
});

export default Profile;

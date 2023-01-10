import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

  const [isLoggedIn, setIsLoggedIn] = React.useContext(MainContext);

  const logIn = async () => {

    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem('userToken', 'abc');
    } catch (error) {
      console.log('Login error: ' + error);
    }
  };

  const checkToken = async () => {

    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (userToken === 'abc') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('Error at token check: ' + error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

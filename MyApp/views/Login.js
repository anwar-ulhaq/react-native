import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {

  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);


  const logIn = async () => {

    const data = {username: 'anwar-ulhaq', password: 'anwar-ulhaq-changed'};

    const {postLogin} = useLogin();

    const logData = await postLogin(data).then(loginData => {
      return loginData
    });

    try {
      if (logData.token === null || logData.token === undefined){
        console.log('Login error');
        throw new Error("Login error");
      }
      await AsyncStorage.setItem('userToken', logData.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Login error: ' + error);
    }
  };

  const checkToken = async () => {

    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const {getUserByToken} = useUser();

      const user = await getUserByToken(userToken);

      setUser(user);

      if (userToken === null || userToken === undefined) {
        console.log('Login error');
        throw new Error("Login error");
      }

      setIsLoggedIn(true);

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
      <LoginForm/>
      <RegisterForm/>
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

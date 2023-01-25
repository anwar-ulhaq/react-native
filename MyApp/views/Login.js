import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/base';

const Login = ({navigation}) => {

  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const [toggleForm, setToggleForm] = useState(false);

  const logIn = async () => {

    const data = {username: 'anwar-ulhaq', password: 'anwar-ulhaq-changed'};

    const {postLogin} = useLogin();

    const logData = await postLogin(data).then(loginData => {
      return loginData
    });

    try {
      if (logData.token === null || logData.token === undefined) {
        console.log('Login error');
        throw new Error('Login error');
      }
      await AsyncStorage.setItem('userToken', logData.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('Login error: ' + error);
    }
  };

  const toggleComponent = () => {
    setToggleForm(!toggleForm);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={Keyboard.dismiss}
        style={{flex: 1}}
        activeOpacity={1}>
        <View>
          {toggleForm ? <LoginForm/> : <RegisterForm/>}

          <Button
            title={toggleForm ? 'Go to Register' : 'Go to Login'}
            buttonStyle={{
              marginTop: 8,
              backgroundColor: 'rgba(78, 116, 289, 1)',
              borderRadius: 3,
            }}
            onPress={toggleComponent}/>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 24,
    padding: 8,
    backgroundColor: '#FFFFFF',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

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
import {Button, Card, Text} from '@rneui/themed';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';

const Login = ({navigation}) => {

  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);

  const [toggleForm, setToggleForm] = useState(true);

  const {getUserByToken} = useUser();

  const toggleComponent = () => {
    setToggleForm(!toggleForm);
  };

  const checkToken = async () => {

    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (userToken === null || userToken === undefined) {
        console.log('Login error');
        throw new Error('Login error');
      }
      const user = await getUserByToken(userToken);

      setUser(user);

      setIsLoggedIn(true);

    } catch (error) {
      console.log('Error at token check: ' + error);
    }
  };

  useEffect(() => {
    console.log('Login View -> isLoggedIn: ' + isLoggedIn);
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

          <Card>
            <Text>
              {toggleForm
                ? 'No account yet? Please register.'
                : 'Already have an account? Please login.'}
            </Text>

            <Button
              title={toggleForm ? 'Go to Register' : 'Go to Login'}
              buttonStyle={{
                marginTop: 8,
                backgroundColor: 'rgba(78, 116, 289, 1)',
                borderRadius: 3,
              }}
              onPress={toggleComponent}/>
          </Card>
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

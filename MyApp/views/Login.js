import React, {useState} from 'react';
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

const Login = ({navigation}) => {

  const [toggleForm, setToggleForm] = useState(true);

  const toggleComponent = () => {
    setToggleForm(!toggleForm);
  };

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

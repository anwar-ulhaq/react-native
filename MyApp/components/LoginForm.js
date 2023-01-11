import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useLogin} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const LoginForm = () => {

  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {

    const {postLogin} = useLogin();
    const loginData = await postLogin(data).then(loginData => loginData);

    try {
      if (loginData.token === null || loginData.token === undefined) {
        throw new Error('Login error');
      }
      await AsyncStorage.setItem('userToken', loginData.token);
      setIsLoggedIn(true);

    } catch (error) {
      console.log('Login error: ' + error);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Username</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize={'none'}
            placeholder="Enter username"
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize={'none'}
            secureTextEntry={true}
            autoComplete={'password'}
            placeholder="Enter password"
          />
        )}
        name="password"
      />

      <Button style={styles.button} title="Submit"
              onPress={handleSubmit(onSubmit)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 24,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#0e101c',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

export default LoginForm;

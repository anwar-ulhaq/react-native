import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Card, Input} from '@rneui/themed';
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
    <Card containerStyle={{borderRadius: 8}}>
      <Card.Title h4 h4Style={{
        fontWeight: '200',
        textAlign: 'center',
      }}>Login</Card.Title>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="username"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize={'none'}
            errorStyle={{color: 'red'}}
            errorMessage={errors.username && 'This field is required'}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorStyle={{color: 'red'}}
            autoCapitalize={'none'}
            secureTextEntry={true}
            autoComplete={'password'}
            errorMessage={errors.password && 'This field is required'}
          />
        )}
        name="password"
      />

      <Button
        title="Login"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </Card>
  );
};

export default LoginForm;

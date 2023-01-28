import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Card, Input} from '@rneui/themed';

import {useLogin, useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const LoginForm = () => {

  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {postLogin} = useLogin();
  const {getUserByToken} = useUser();

  const onSubmit = async (data) => {

    await postLogin(data).then(async loginData => {
      await AsyncStorage.setItem('userToken', loginData.token);

      await getUserByToken(loginData.token).then(user => {
        setUser(user);
        setIsLoggedIn(true);
      });
    });
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

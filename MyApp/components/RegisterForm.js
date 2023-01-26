import React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {useUser} from '../hooks/ApiHooks';
import {Button, Card, Input} from '@rneui/base';

const RegisterForm = () => {

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
  });

  const onSubmit = async (data) => {
    const {postUser} = useUser();
    const newUser = await postUser(data).then(newUser => newUser);
    console.log(newUser);
  };

  return (
    <Card>
      <Card.Title h4 h4Style={{
        fontWeight: '200',
        textAlign: 'center',
      }}>Register</Card.Title>
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

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize={'none'}
            errorStyle={{color: 'red'}}
            errorMessage={errors.email && 'This field is required'}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Enter full name"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        name="full_name"
      />

      <Button
        title="Register"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </Card>
  );
};

export default RegisterForm;

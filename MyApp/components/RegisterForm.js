import React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {useUser} from '../hooks/ApiHooks';
import {Button, Card, Input} from '@rneui/base';

const RegisterForm = () => {

  const {control, getValues, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const {checkUsername} = useUser();

  const onSubmit = async (data) => {
    const {postUser} = useUser();
    const newUser = await postUser(data).then(newUser => newUser);
    console.log(newUser);
  };

  const userNameValidation = async (value) => {

    const usernameData = await checkUsername(value).
      then(usernameData => usernameData);
    return usernameData.available || 'Username already exists.';
  };

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm');

  const comparePassword = (value) => {
    return value === getValues('password') || 'Password not match';
  };

  return (
    <Card containerStyle={{borderRadius: 8}}>
      <Card.Title h4 h4Style={{
        fontWeight: '200',
        textAlign: 'center',
      }}>Register</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          minLength: {
            value: 3,
            message: 'Must be at least 3 characters.',
          },
          validate: userNameValidation,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="username"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize={'none'}
            errorStyle={{color: 'red'}}
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          minLength: {
            value: 5,
            message: 'Must be at least 5 characters.',
          },
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'Must be at least 5 characters, needs one number, one uppercase letter',
          },
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
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          validate: comparePassword,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm password"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorStyle={{color: 'red'}}
            autoCapitalize={'none'}
            secureTextEntry={true}
            autoComplete={'password'}
            errorMessage={errors.confirm_password &&
              errors.confirm_password.message}
          />
        )}
        name="confirm_password"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          pattern: {
            value: emailRegex,
            message: 'Must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize={'none'}
            errorStyle={{color: 'red'}}
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: false,
          minLength: {
            value: 3,
            message: 'Must be at least 3 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Enter full name"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorStyle={{color: 'red'}}
            errorMessage={errors.full_name && errors.full_name.message}
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

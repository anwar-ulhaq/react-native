import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

import {useUser} from '../hooks/ApiHooks';

const RegisterForm = () => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: ''
    }
  });

  const onSubmit = async (data) => {
    const {postUser} = useUser();
    const newUser = await postUser(data).then(newUser => newUser);
    console.log(newUser);
  }

  return (
    <View >
      <Text style={styles.label}>Username</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize={'none'}
            placeholder='Enter username'
          />
        )}
        name='username'
      />
      {errors.username && <Text>This is required.</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize={'none'}
            secureTextEntry={true}
            autoComplete={'password'}
            placeholder='Enter password'
          />
        )}
        name='password'
      />

      <Text style={styles.label}>E-mail</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize={'none'}
            placeholder='Enter email address'
          />
        )}
        name='email'
      />
      {errors.email && <Text>This is required.</Text>}

      <Text style={styles.label}>Full name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize={'none'}
            placeholder='Enter full name'
          />
        )}
        name='full_name'
      />
      {errors.full_name && <Text></Text>}

      <Button style={styles.button} title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}


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

export default RegisterForm;

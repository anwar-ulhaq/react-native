import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Card, Icon, Input, ListItem} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';

const Profile = ({navigation}) => {

  const {
    isEditProfile,
    setIsEditProfile,
    setIsLoggedIn,
    user,
  } = React.useContext(MainContext);
  const [tag, setTag] = useState({});
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getUserAvatar} = useUser();
  //const [isEditProfile, setIsEditProfile] = useState(false);

  const logout = async () => {

    setIsLoggedIn(false);

    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error while logging out: ' + error);
    }
  };

  const loadAvatar = async () => {
    const tag = await getUserAvatar('avatar_' + user.user_id).
      then(tagArray => tagArray[0]);
    setTag(tag);
    setAvatar('https://media.mw.metropolia.fi/wbma/uploads/' + tag.filename);
  };

  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const {checkUsername, updateUser} = useUser();

  //TODO 01) Fix issue if username is not changed
  //TODO 02) Fix issue when changing password
  const onSubmit = async (data) => {
    /*if (data['username'] === user.username) {

    }*/

    Object.keys(data).forEach(key => data[key] === '' && delete data[key]);
    console.log(JSON.stringify(data));
    //reset(...default)
    setIsEditProfile(!isEditProfile);
    //await updateUser(data);
  };

  const userNameValidation = async (value) => {
    //console.log('Username same')
    console.log('value: ' + value);
    console.log('user.username: ' + user.username);
    if (value === user.username) {
      const usernameData = await checkUsername(value).
        then(usernameData => usernameData);
      return usernameData.available || 'Username already exists.';

    } else {
      return true;
    }

  };

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm');

  const comparePassword = (value) => {
    return value === getValues('password') || 'Password not match';
  };

  useEffect(() => {
    loadAvatar();
  }, [user.user_id]);

  return (
    isEditProfile ?
      <Card containerStyle={{borderRadius: 8}}>
        <Card.Title h4 h4Style={{
          fontWeight: '200',
          textAlign: 'center',
        }}>Edit Profile</Card.Title>

        <Controller
          control={control}
          rules={{
            required: {
              value: false,
              //message: 'This field is required',
            },
            minLength: {
              value: 3,
              message: 'Must be at least 3 characters.',
            },
            validate: userNameValidation,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              //placeholder="username"
              defaultValue={user.username}
              //value={value}
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
              value: false,
              //message: 'This field is required',
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
              //placeholder="password"
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
              value: false,
              //message: 'This field is required',
            },
            //validate: comparePassword,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              //placeholder="Confirm password"
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
              value: false,
              //message: 'This field is required',
            },
            pattern: {
              value: emailRegex,
              message: 'Must be a valid email',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              //placeholder="email"
              defaultValue={user.email}
              //value={value}
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
              //placeholder="Enter full name"
              defaultValue={user.full_name}
              //value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorStyle={{color: 'red'}}
              errorMessage={errors.full_name && errors.full_name.message}
            />
          )}
          name="full_name"
        />


        <Button
          title="Save"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 3,
          }}
          onPress={handleSubmit(onSubmit)} // request PUT, on success toggle
          /*onPress={() => {
            console.log('USER: '+ JSON.stringify(user));
            setIsEditProfile(!isEditProfile);
          }}*/ // request PUT, on success toggle
        />
      </Card>
      :
      <Card containerStyle={{borderRadius: 8}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Icon
            raised
            name="user-circle"
            type="font-awesome"
          />
          <Card.Title h4 h4Style={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 24,
            paddingTop: 8,
            marginTop: 8,
            paddingLeft: 8,
          }}>{user.username}</Card.Title>
          <Icon
            raised
            name="edit"
            type="font-awesome"
            onPress={() => {
              //console.log('EDIT_USER: '+ JSON.stringify(user));
              setIsEditProfile(!isEditProfile);
            }}
          />
        </View>
        <Card.Image source={{uri: avatar}} containerStyle={{borderRadius: 8}}/>
        <ListItem>
          <Icon name="email"/>
          <ListItem.Title>Email: {user.email}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Icon name="badge"/>
          <ListItem.Title>Full name: {user.full_name ?
            user.full_name :
            'Not available'}</ListItem.Title>
        </ListItem>
        <Button title={'Logout'} onPress={logout}/>
      </Card>
  );
};

export default Profile;
